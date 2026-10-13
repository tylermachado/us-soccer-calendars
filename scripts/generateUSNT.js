import ics from 'ics';
import fs from 'fs';

// Same tRPC endpoint that powers https://www.ussoccer.com/all-matches
const API_URL = 'https://www.ussoccer.com/api/trpc/matches.getMatches';

// Opta team IDs, taken from the team filter on the all-matches page
const teams = [
  { abbreviation: 'USWNT', fullname: 'U.S. Women\'s National Team', optaTeamId: 'e70zl10x0ayu7y10ry0wi465a', dirPath: 'public/intl-women' },
  { abbreviation: 'USMNT', fullname: 'U.S. Men\'s National Team', optaTeamId: '9vh2u1p4ppm597tjfahst2m3n', dirPath: 'public/intl-men' },
];

/**
 * @typedef {Object} Contestant
 * @property {string} id
 * @property {string} name
 * @property {'home' | 'away'} position
 */

/**
 * @typedef {Object} Match
 * @property {string} matchId
 * @property {string} date
 * @property {boolean} cancelled
 * @property {{longName: string, location: string, country: string}} venue
 * @property {{name: string}} competition
 * @property {Contestant[]} contestants
 * @property {{imageAltText: string}[]} broadcastLinks
 * @property {string} matchFeedUrl
 */

/**
 * @typedef {Object} MatchData
 * @property {string} uid
 * @property {string} calName
 * @property {string} title
 * @property {string} location
 * @property {string} description
 * @property {string} url
 * @property {[number, number, number, number, number]} start
 * @property {'local' | 'utc'} startInputType
 * @property {'local' | 'utc'} startOutputType
 * @property {{hours: number, minutes: number}} duration
 */

/**
 * @param {string} optaTeamId
 * @param {'upcoming' | 'results'} type
 * @param {string} year
 * @returns {Promise<Match[]>}
 */
async function fetchAllMatches(optaTeamId, type, year) {
  let allMatches = [];
  let cursor = null;

  do {
    const json = { type, contestantIds: [optaTeamId], teamFilter: false, year };
    if (cursor) json.cursor = cursor;
    const url = `${API_URL}?batch=1&input=${encodeURIComponent(JSON.stringify({ 0: { json } }))}`;
    const response = await fetch(url);
    const [body] = await response.json();
    if (body.error) throw new Error(body.error.json.message);
    const data = body.result.data.json;
    allMatches = allMatches.concat(data.matches);
    cursor = data.nextCursor ?? null;
  } while (cursor);

  return allMatches;
}

async function generateUSNT() {
  const year = String(new Date().getFullYear());
  for (const team of teams) {
    // Results for this year plus everything upcoming, deduped by matchId
    const [results, upcoming] = await Promise.all([
      fetchAllMatches(team.optaTeamId, 'results', year),
      fetchAllMatches(team.optaTeamId, 'upcoming', year),
    ]);
    const matches = [...new Map([...results, ...upcoming].map((match) => [match.matchId, match])).values()]
      .filter((match) => !match.cancelled)
      .sort((a, b) => a.date.localeCompare(b.date));

    /** @type {MatchData[]} */
    const formattedMatches = matches.map((match) => {
      const us = match.contestants.find((c) => c.id === team.optaTeamId);
      const opponent = match.contestants.find((c) => c.id !== team.optaTeamId);
      const broadcasters = [...new Set(match.broadcastLinks.map((b) => b.imageAltText).filter(Boolean))];
      const matchDate = new Date(match.date);

      /** @type {MatchData} */
      const matchData = {};
      matchData.uid = match.matchId + '@ussoccer.com';
      matchData.calName = team.fullname;
      matchData.title = team.abbreviation + (us?.position === 'away' ? ' @ ' : ' vs ') + (opponent?.name ?? 'TBD');
      matchData.location = [match.venue?.longName, match.venue?.location].filter(Boolean).join(', ');
      matchData.description = '🏆 ' + match.competition.name + (broadcasters.length ? '\n📺 Watch: ' + broadcasters.join(', ') : '');
      matchData.url = 'https://www.ussoccer.com' + match.matchFeedUrl;
      matchData.start = [matchDate.getUTCFullYear(), matchDate.getUTCMonth() + 1, matchDate.getUTCDate(), matchDate.getUTCHours(), matchDate.getUTCMinutes()];
      matchData.startInputType = 'utc';
      matchData.startOutputType = 'utc';
      matchData.duration = { hours: 2, minutes: 0 };
      return matchData;
    });

    if (formattedMatches.length === 0) {
      console.warn('No matches found for ' + team.abbreviation);
      continue;
    }

    const { error, value } = ics.createEvents(formattedMatches);

    if (error) {
      console.log(error);
      continue;
    }

    fs.mkdirSync(team.dirPath, { recursive: true });
    fs.writeFileSync(`${team.dirPath}/USA.ics`, value);
    console.log(`${team.dirPath}/USA.ics calendar file saved with`, formattedMatches.length, 'matches');
  }
}
// generateUSNT

generateUSNT();
export default generateUSNT;
