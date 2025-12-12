const clubsData = require('../data/clubs/mls.json');

function getClubName(fullname) {
  const club = clubsData.find(club => club.fullname === fullname);
  if (!club || !club.shortname) {
    return fullname;
  }
  return club.shortname;
} // getClubName

module.exports = getClubName;
