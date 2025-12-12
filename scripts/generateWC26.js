import ics from 'ics';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

function generateWC26() {
  fetch('https://api.fifa.com/api/v3/calendar/matches?language=en&count=500&idSeason=285023')
    .then((response) => response.text())
    .then((body) => {
      const matches = JSON.parse(body).Results;

      if (!matches || !Array.isArray(matches)) {
        console.error('Invalid matches data received');
        return;
      }

      /** @type {MatchData[]} */
      const formattedMatches = [];

      matches.forEach((match) => {
        // Validate required fields
        if (!match.Date || !match.Stadium || !match.StageName) {
          console.warn('Skipping match with missing data:', match.MatchNumber);
          return;
        }

        /** @type {MatchData} */
        const matchData = {};
        const matchDate = new Date(match.Date);

        matchData.calName = 'World Cup 2026';
        matchData.title = (match.Home ? match.Home.ShortClubName : match.PlaceHolderA) + ' v ' + (match.Away ? match.Away.ShortClubName : match.PlaceHolderB);
        matchData.location = (match.Stadium.Name?.[0]?.Description ? match.Stadium.Name[0].Description + ', ' : '') + (match.Stadium.CityName?.[0]?.Description || 'TBD') + (match.Stadium.IDCountry ? ', ' + match.Stadium.IDCountry : '');
        matchData.description = '🏆 ' + match.StageName[0].Description + (match.GroupName && match.GroupName.length > 0 ? ' - ' + match.GroupName[0].Description : '');
        matchData.start = [matchDate.getFullYear(), matchDate.getMonth() + 1, matchDate.getDate(), matchDate.getHours(), matchDate.getMinutes()];
        matchData.startInputType = 'local';
        matchData.duration = { hours: 2, minutes: 0 };
        formattedMatches.push(matchData);
      });

      if (formattedMatches.length === 0) {
        console.warn('No valid matches found');
        return;
      }

      const { error, value } = ics.createEvents(formattedMatches);

      if (error) {
        console.error('Error creating calendar events:', error);
        return;
      }

      // Ensure directory exists
      const dirPath = 'public/wc26';
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      fs.writeFile(`${dirPath}/wc26.ics`, value, (/** @type {Error | null} */ err) => {
        if (err) {
          console.error('Error writing calendar file:', err);
          return;
        }
        console.log('wc26.ics calendar file saved with', formattedMatches.length, 'matches');
      });
    })
    .catch((error) => {
      console.error('Error fetching World Cup 2026 matches:', error);
    });
}

generateWC26();
