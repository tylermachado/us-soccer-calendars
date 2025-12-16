<script>
	import clubsMLS from '../data/clubs/mls.json';
	
	let host = '';
	const BASE_PATH = '/us-soccer-calendars';
	const WC26_FILENAME = 'wc26.ics';
	const WC26_EVENT_NAME = 'USA World Cup 2026 Schedule';
	const wcHttpUrl = `${BASE_PATH}/wc26/${WC26_FILENAME}`;
	
	if (typeof window !== 'undefined') {
		host = window.location.host;
	}
	
	$: wcWebcalUrl = host ? `webcal://${host}${wcHttpUrl}` : wcHttpUrl;
</script>

<main class="w-full px-4">
	<div>
		<h2 class="text-2xl font-bold mb-4">World Cup 2026</h2>
		<div class="border-b border-gray-300 mb-6 pb-6">
			<a href={wcWebcalUrl} target="_blank" rel="noreferrer" title="Add to Apple Calendar" class="inline-flex items-center justify-center h-7 px-2 mr-2 mb-2 bg-gray-100 border border-gray-400 rounded text-black text-sm font-semibold capitalize cursor-pointer hover:bg-gray-200 hover:underline">Apple</a>
			<a
				href={`https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(wcWebcalUrl)}`}
				target="_blank"
				rel="noreferrer"
				title="Add to Google Calendar"
				class="inline-flex items-center justify-center h-7 px-2 mr-2 mb-2 bg-gray-100 border border-gray-400 rounded text-black text-sm font-semibold capitalize cursor-pointer hover:bg-gray-200 hover:underline"
			>
				Google
			</a>
			<a
				href={`https://outlook.office.com/calendar/addfromweb?url=${encodeURIComponent(wcHttpUrl)}&name=${encodeURIComponent(WC26_EVENT_NAME)}`}
				target="_blank"
				rel="noreferrer"
				title="Add to Outlook"
				class="inline-flex items-center justify-center h-7 px-2 mr-2 mb-2 bg-gray-100 border border-gray-400 rounded text-black text-sm font-semibold capitalize cursor-pointer hover:bg-gray-200 hover:underline"
			>
				Outlook
			</a>
			<a href={wcHttpUrl} download={WC26_FILENAME} title="Download calendar file" class="inline-flex items-center justify-center h-7 px-2 mr-2 mb-2 bg-gray-100 border border-gray-400 rounded text-black text-sm font-semibold capitalize cursor-pointer hover:bg-gray-200 hover:underline">Download</a>
		</div>

		<h2 class="text-2xl font-bold mb-4">MLS</h2>
		{#each clubsMLS as club}
			{@const httpUrl = `${BASE_PATH}/mls/${club.abbreviation}.ics`}
			{@const webcalUrl = host ? `webcal://${host}${httpUrl}` : httpUrl}
			<div class="border-b border-gray-300 mb-6 pb-6">
				<h3 class="text-lg font-semibold mb-3">{club.fullname}</h3>
				
				<a href={webcalUrl} target="_blank" rel="noreferrer" title={`Add ${club.fullname} to Apple Calendar`} class="inline-flex items-center justify-center h-7 px-2 mr-2 mb-2 bg-gray-100 border border-gray-400 rounded text-black text-sm font-semibold capitalize cursor-pointer hover:bg-gray-200 hover:underline">Apple</a>
				<a
					href={`https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(webcalUrl)}`}
					target="_blank"
					rel="noreferrer"
					title={`Add ${club.fullname} to Google Calendar`}
					class="inline-flex items-center justify-center h-7 px-2 mr-2 mb-2 bg-gray-100 border border-gray-400 rounded text-black text-sm font-semibold capitalize cursor-pointer hover:bg-gray-200 hover:underline"
				>
					Google
				</a>
				<a
					href={`https://outlook.office.com/calendar/addfromweb?url=${encodeURIComponent(httpUrl)}&name=${encodeURIComponent(club.fullname + ' Schedule')}`}
					target="_blank"
					rel="noreferrer"
					title={`Add ${club.fullname} to Outlook`}
					class="inline-flex items-center justify-center h-7 px-2 mr-2 mb-2 bg-gray-100 border border-gray-400 rounded text-black text-sm font-semibold capitalize cursor-pointer hover:bg-gray-200 hover:underline"
				>
					Outlook
				</a>
				<a href={httpUrl} download={`${club.abbreviation}.ics`} title="Download calendar file" class="inline-flex items-center justify-center h-7 px-2 mr-2 mb-2 bg-gray-100 border border-gray-400 rounded text-black text-sm font-semibold capitalize cursor-pointer hover:bg-gray-200 hover:underline">Download</a>
			</div>
		{/each}
	</div>
</main>
