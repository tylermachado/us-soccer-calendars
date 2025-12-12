import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function GET({ params }) {
	const { abbreviation } = params;
	const filePath = path.join(__dirname, '../../../public', `${abbreviation}.ics`);

	try {
		const fileContent = fs.readFileSync(filePath, 'utf-8');
		return new Response(fileContent, {
			headers: {
				'Content-Type': 'text/calendar',
				'Content-Disposition': `attachment; filename="${abbreviation}.ics"`
			}
		});
	} catch (error) {
		return new Response('Calendar file not found', { status: 404 });
	}
}
