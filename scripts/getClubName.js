const clubsData = require('../data/clubs/mls.json');

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
  /** @type {Club | undefined} */
  let club;
  for (let i = 0; i < clubsData.length; i++) {
    if (clubsData[i].fullname === fullname) {
      club = clubsData[i];
      break;
    }
  }
  if (!club || !club.shortname) {
    return fullname;
  }
  return club.shortname;
} // getClubName

module.exports = getClubName;
