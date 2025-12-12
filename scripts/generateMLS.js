import ics from 'ics';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const clubsData = JSON.parse(fs.readFileSync(__dirname + '/../src/data/clubs/mls.json', 'utf-8'));

/**
 * @typedef {Object} Club
 * @property {string} abbreviation
 * @property {string} fullname
 */

/**
 * @typedef {Object} Match
 * @property {string} home_team_three_letter_code
 * @property {string} away_team_three_letter_code
 * @property {string} home_team_name
 * @property {string} away_team_name
 * @property {string} stadium_name
 * @property {string} stadium_city
 * @property {string} competition_name
 * @property {string} planned_kickoff_time
 * @property {string} match_day
 */

/**
 * @typedef {Object} MatchData
 * @property {string} calName
 * @property {string} title
 * @property {string} location
 * @property {string} description
 * @property {[number, number, number, number, number]} start
 * @property {'local' | 'utc'} startInputType
 * @property {{hours: number, minutes: number}} duration
 */

function generateMLS() {
  fetch('https://stats-api.mlssoccer.com/matches/seasons/MLS-SEA-0001KA?match_date[gte]=2026-01-01&match_date[lte]=2026-12-31&per_page=600&sort=planned_kickoff_time:asc,home_team_name:asc')
    .then((response) => response.text())
    .then((body) => {
      const matches = JSON.parse(body).schedule;

      clubsData.forEach((club) => {
        /** @type {MatchData[]} */
        const formattedMatches = [];
        /** @type {Match[]} */
        const matchesArray = matches
          .filter((/** @type {Match} */ match) => (match.home_team_three_letter_code === club.abbreviation || match.away_team_three_letter_code === club.abbreviation));
        matchesArray.forEach((match) => {
            /** @type {MatchData} */
            const matchData = {};
            const matchDate = new Date(match.planned_kickoff_time);

            matchData.calName = club.fullname;
            matchData.title = match.home_team_three_letter_code === club.abbreviation
              ? match.home_team_name + ' vs ' + match.away_team_name
              : match.away_team_name + ' @ ' + match.home_team_name;
            matchData.location = match.stadium_name + ', ' + match.stadium_city;
            matchData.description = '🏆 ' + match.competition_name + '\n📺 Watch: Apple TV';
            matchData.start = [matchDate.getFullYear(), matchDate.getMonth() + 1, matchDate.getDate(), matchDate.getHours(), matchDate.getMinutes()];
            matchData.startInputType = 'local';
            matchData.duration = { hours: 2, minutes: 0 };
            formattedMatches.push(matchData);

            if (parseInt(match.match_day) <= 35) {
              const { error, value } = ics.createEvents(formattedMatches);

              if (error) {
                console.log(error)
                return
              }

              fs.writeFile('public/' + club.abbreviation + '.ics', value, (/** @type {Error | null} */ err) => {
                if (err) throw err;
                console.log(club.abbreviation + '.ics calendar file saved');
              });
            }
          }); // matches.forEach
      });
      // clubsData.forEach

    });
    // .then

  // fetch

}
// generateMLS

generateMLS();
export default generateMLS;
