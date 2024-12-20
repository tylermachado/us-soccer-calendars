const clubsData = [
	{
		"club": "Atlanta",
		"abbreviation": "ATL",
		"fullname": "Atlanta United FC",
		"shortname": "Atlanta United"
	},
	{
		"club": "Austin",
		"abbreviation": "ATX",
		"fullname": "Austin FC",
		"shortname": "Austin FC"
	},
	{
		"club": "Charlotte",
		"abbreviation": "CLT",
		"fullname": "Charlotte FC",
		"shortname": "Charlotte FC"
	},
	{
		"club": "Chicago",
		"abbreviation": "CHI",
		"fullname": "Chicago Fire FC",
		"shortname": "Chicago Fire"
	},
	{
		"club": "Cincinnati",
		"abbreviation": "CIN",
		"fullname": "FC Cincinnati",
		"shortname": "FC Cincinnati"
	},
	{
		"club": "Colorado",
		"abbreviation": "COL",
		"fullname": "Colorado Rapids",
		"shortname": "Rapids"
	},
	{
		"club": "Columbus",
		"abbreviation": "CLB",
		"fullname": "Columbus Crew",
		"shortname": "Columbus Crew"
	},
	{
		"club": "Dallas",
		"abbreviation": "DAL",
		"fullname": "FC Dallas",
		"shortname": "FC Dallas"
	},
	{
		"club": "DC",
		"abbreviation": "DC",
		"fullname": "D.C. United",
		"shortname": "D.C. United"
	},
	{
		"club": "Houston",
		"abbreviation": "HOU",
		"fullname": "Houston Dynamo FC",
		"shortname": "Dynamo"
	},
	{
		"club": "Kansas City",
		"abbreviation": "SKC",
		"fullname": "Sporting Kansas City",
		"shortname": "Sporting KC"
	},
	{
		"club": "LA Galaxy",
		"abbreviation": "LA",
		"fullname": "LA Galaxy",
		"shortname": "LA Galaxy"
	},
	{
		"club": "LAFC",
		"abbreviation": "LAFC",
		"fullname": "Los Angeles Football Club",
		"shortname": "LAFC"
	},
	{
		"club": "Miami",
		"abbreviation": "MIA",
		"fullname": "Inter Miami CF",
		"shortname": "Inter Miami"
	},
	{
		"club": "Minnesota",
		"abbreviation": "MIN",
		"fullname": "Minnesota United FC",
		"shortname": "Minnesota United"
	},
	{
		"club": "Montreal",
		"abbreviation": "MTL",
		"fullname": "CF Montréal",
		"shortname": "CF Montréal"
	},
	{
		"club": "Nashville",
		"abbreviation": "NSH",
		"fullname": "Nashville SC",
		"shortname": "Nashville SC"
	},
	{
		"club": "New England",
		"abbreviation": "NE",
		"fullname": "New England Revolution",
		"shortname": "Revolution"
	},
	{
		"club": "NYCFC",
		"abbreviation": "NYC",
		"fullname": "New York City FC",
		"shortname": "NYCFC"
	},
	{
		"club": "NY Red Bulls",
		"abbreviation": "RBNY",
		"fullname": "New York Red Bulls",
		"shortname": "Red Bulls"
	},
	{
		"club": "Orlando",
		"abbreviation": "ORL",
		"fullname": "Orlando City SC",
		"shortname": "Orlando City"
	},
	{
		"club": "Philadelphia",
		"abbreviation": "PHI",
		"fullname": "Philadelphia Union",
		"shortname": "Phila Union"
	},
	{
		"club": "Portland",
		"abbreviation": "POR",
		"fullname": "Portland Timbers",
		"shortname": "Timbers"
	},
	{
		"club": "Salt Lake",
		"abbreviation": "RSL",
		"fullname": "Real Salt Lake",
		"shortname": "Real Salt Lake"
	},
  {
    "club": "San Diego",
    "abbreviation": "SD",
    "fullname": "San Diego FC",
    "shortname": "San Diego FC"
  },
	{
		"club": "San Jose",
		"abbreviation": "SJ",
		"fullname": "San Jose Earthquakes",
		"shortname": "Earthquakes"
	},
	{
		"club": "Seattle",
		"abbreviation": "SEA",
		"fullname": "Seattle Sounders FC",
		"shortname": "Sounders"
	},
	{
		"club": "St. Louis",
		"abbreviation": "STL",
		"fullname": "St. Louis CITY SC",
		"shortname": "St. Louis City"
	},
	{
		"club": "Toronto",
		"abbreviation": "TOR",
		"fullname": "Toronto FC",
		"shortname": "Toronto FC"
	},
	{
		"club": "Vancouver",
		"abbreviation": "VAN",
		"fullname": "Vancouver Whitecaps FC",
		"shortname": "Whitecaps"
	}
];

// get element with id of 'links'
const linksContainer = document.getElementById('links');

// for each club, add a list item and a link to its .ics file
clubsData.forEach(club => {
  const clubContainer = document.createElement('div');
  const clubHeading = document.createElement('h2');
  clubHeading.innerText = club.fullname;
  clubContainer.appendChild(clubHeading);

  const url = `webcal://${window.location.host}/${club.abbreviation}.ics`;
  let links = new Map();
  links.set('apple', url);
  links.set('google', `https://calendar.google.com/calendar/u/0/r?cid=${url}`);
  links.set('outlook', `https://outlook.office.com/calendar/addfromweb?url=${url}&name=${club.fullname}%20Schedule`);
  links.set('other', url);

  for (let [key, value] of links) {
	  const linkButton = document.createElement('a');
	  linkButton.href = value;
	  linkButton.innerText = key;
	  clubContainer.appendChild(linkButton);
  }

  linksContainer.appendChild(clubContainer);
});
