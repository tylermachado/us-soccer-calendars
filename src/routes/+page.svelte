<script>
	import clubsMLS from '../data/clubs/mls.json';
	import CalendarCard from '../lib/CalendarCard.svelte';
	
	let host = '';
	
	const BASE_PATH = '/us-soccer-calendars';
	const WC26_FILENAME = 'wc26.ics';
	const WC26_EVENT_NAME = 'World Cup 2026 Schedule';
	const wcHttpUrl = `${BASE_PATH}/wc26/${WC26_FILENAME}`;
	
	if (typeof window !== 'undefined') {
		host = window.location.host;
	}
	
	$: wcWebcalUrl = host ? `webcal://${host}${wcHttpUrl}` : wcHttpUrl;
</script>

<main class="w-full px-4 py-8">
	<div class="max-w-7xl mx-auto">
		<h2 class="text-2xl font-bold mb-6">World Cup 2026</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
			<CalendarCard
				title="World Cup 2026"
				appleUrl={wcWebcalUrl}
				googleUrl={`https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(wcWebcalUrl)}`}
				outlookUrl={`https://outlook.office.com/calendar/addfromweb?url=${encodeURIComponent(wcHttpUrl)}&name=${encodeURIComponent(WC26_EVENT_NAME)}`}
				downloadUrl={wcHttpUrl}
				downloadFilename={WC26_FILENAME}
				appleTitle="Add to Apple Calendar"
				googleTitle="Add to Google Calendar"
				outlookTitle="Add to Outlook"
				downloadTitle="Download calendar file"
				colors={[]}
			/>
		</div>

		<h2 class="text-2xl font-bold mb-6">MLS</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			{#each clubsMLS as club}
				{@const httpUrl = `${BASE_PATH}/mls/${club.abbreviation}.ics`}
				{@const webcalUrl = host ? `webcal://${host}${httpUrl}` : httpUrl}
				<CalendarCard
					title={club.fullname}
					appleUrl={webcalUrl}
					googleUrl={`https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(webcalUrl)}`}
					outlookUrl={`https://outlook.office.com/calendar/addfromweb?url=${encodeURIComponent(httpUrl)}&name=${encodeURIComponent(club.fullname + ' Schedule')}`}
					downloadUrl={httpUrl}
					downloadFilename={`${club.abbreviation}.ics`}
					appleTitle={`Add ${club.fullname} to Apple Calendar`}
					googleTitle={`Add ${club.fullname} to Google Calendar`}
					outlookTitle={`Add ${club.fullname} to Outlook`}
					downloadTitle="Download calendar file"
					colors={[club.primaryColor, club.secondaryColor]}
				/>
			{/each}
		</div>

		<h2 class="text-2xl font-bold mb-6">NWSL</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			Coming soon!
		</div>
</main>
