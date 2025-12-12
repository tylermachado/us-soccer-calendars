export const prerender = true;

const validAbbreviations = [
	'ATL', 'ATX', 'CHI', 'CIN', 'CLB', 'CLT', 'COL', 'DAL', 'DC',
	'HOU', 'LA', 'LAFC', 'MIA', 'MIN', 'MTL', 'NE', 'NSH', 'NYC',
	'ORL', 'PHI', 'POR', 'RBNY', 'RSL', 'SD', 'SEA', 'SJ', 'SKC',
	'STL', 'TOR', 'VAN'
];

export async function entries() {
	return validAbbreviations.map(abbreviation => ({
		abbreviation
	}));
}
