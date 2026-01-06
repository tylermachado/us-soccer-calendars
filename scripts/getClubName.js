import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const clubsData = JSON.parse(readFileSync(__dirname + '/../src/data/clubs/mls.json', 'utf-8'));

/** @type {Map<string, {shortname: string}>} */
const clubsByFullname = new Map(clubsData.map(club => [club.fullname, club]));

/**
 * @typedef {Object} Club
 * @property {string} club
 * @property {string} abbreviation
 * @property {string} fullname
 * @property {string} shortname
 */

/**
 * Gets the short name for a club
 * @param {string} fullname - The full name of the club
 * @returns {string} The short name or full name if not found
 */
function getClubName(fullname) {
  const club = clubsByFullname.get(fullname);
  if (!club || !club.shortname) {
    return fullname;
  }
  return club.shortname;
} // getClubName

export default getClubName;
