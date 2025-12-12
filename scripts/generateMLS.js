const fs = require('fs');
const ics = require('ics');
const fetch = require('node-fetch');
const clubsData = require('../data/clubs/mls.json');

function generateMLS() {
  fetch('https://stats-api.mlssoccer.com/matches/seasons/MLS-SEA-0001KA?match_date[gte]=2026-01-01&match_date[lte]=2026-12-31&per_page=600&sort=planned_kickoff_time:asc,home_team_name:asc')
    .then((response) => response.text())
    .then((body) => {
      const matches = JSON.parse(body).schedule;

      clubsData.forEach(club => {
        const formattedMatches = [];
        matches
          .filter(match => (match.home_team_three_letter_code === club.abbreviation || match.away_team_three_letter_code === club.abbreviation))
          .forEach(match => {
            const matchData = new Object;
            const matchDate = new Date(match.planned_kickoff_time);

            matchData.calName = club.fullname;
            matchData.title = match.home_team_short_name + ' vs ' + match.away_team_short_name;
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

              fs.writeFile('public/' + club.abbreviation + '.ics', value, (err) => {
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

module.exports = generateMLS;
