<script>
	import clubsMLS from '../data/clubs/mls.json';
	
	let host = '';
	let expandedWC26 = false;
	let expandedClubs = {};
	
	const BASE_PATH = '/us-soccer-calendars';
	const WC26_FILENAME = 'wc26.ics';
	const WC26_EVENT_NAME = 'USA World Cup 2026 Schedule';
	const wcHttpUrl = `${BASE_PATH}/wc26/${WC26_FILENAME}`;
	
	if (typeof window !== 'undefined') {
		host = window.location.host;
	}
	
	$: wcWebcalUrl = host ? `webcal://${host}${wcHttpUrl}` : wcHttpUrl;
	
	function toggleWC26() {
		expandedWC26 = !expandedWC26;
	}
	
	function toggleClub(abbreviation) {
		expandedClubs[abbreviation] = !expandedClubs[abbreviation];
	}
</script>

<main class="w-full px-4 py-8">
	<div class="max-w-7xl mx-auto">
		<h2 class="text-2xl font-bold mb-6">World Cup 2026</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
			<button
				on:click={toggleWC26}
				class="p-4 bg-gray-100 rounded-lg hover:shadow-md transition-shadow text-left self-stretch"
			>
				<div
					class="w-full flex items-center justify-between text-lg font-semibold mb-3 hover:text-blue-600 transition-colors"
				>
					<span>USA World Cup 2026</span>
					<span class="transform transition-transform {expandedWC26 ? 'rotate-180' : ''}">
						▼
					</span>
				</div>
				{#if expandedWC26}
					<div class="flex flex-col gap-2">
						<a href={wcWebcalUrl} target="_blank" rel="noreferrer" title="Add to Apple Calendar" class="inline-flex items-center justify-center h-7 px-2 bg-gray-100 border border-gray-400 rounded text-black text-sm font-semibold capitalize cursor-pointer hover:bg-gray-200 hover:underline">Apple</a>
						<a
							href={`https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(wcWebcalUrl)}`}
							target="_blank"
							rel="noreferrer"
							title="Add to Google Calendar"
							class="inline-flex items-center justify-center h-7 px-2 bg-gray-100 border border-gray-400 rounded text-black text-sm font-semibold capitalize cursor-pointer hover:bg-gray-200 hover:underline"
						>
							Google
						</a>
						<a
							href={`https://outlook.office.com/calendar/addfromweb?url=${encodeURIComponent(wcHttpUrl)}&name=${encodeURIComponent(WC26_EVENT_NAME)}`}
							target="_blank"
							rel="noreferrer"
							title="Add to Outlook"
							class="inline-flex items-center justify-center h-7 px-2 bg-gray-100 border border-gray-400 rounded text-black text-sm font-semibold capitalize cursor-pointer hover:bg-gray-200 hover:underline"
						>
							Outlook
						</a>
						<a href={wcHttpUrl} download={WC26_FILENAME} title="Download calendar file" class="inline-flex items-center justify-center h-7 px-2 bg-gray-100 border border-gray-400 rounded text-black text-sm font-semibold capitalize cursor-pointer hover:bg-gray-200 hover:underline">Download</a>
					</div>
				{/if}
			</button>
		</div>

		<h2 class="text-2xl font-bold mb-6">MLS</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{#each clubsMLS as club}
				{@const httpUrl = `${BASE_PATH}/mls/${club.abbreviation}.ics`}
				{@const webcalUrl = host ? `webcal://${host}${httpUrl}` : httpUrl}
				<button
					on:click={() => toggleClub(club.abbreviation)}
					class="p-4 bg-gray-100 rounded-lg hover:shadow-md transition-shadow text-left self-stretch"
				>
					<div
						class="w-full flex items-center justify-between text-lg font-semibold mb-3 hover:text-blue-600 transition-colors"
					>
						<span>{club.fullname}</span>
						<span class="transform transition-transform {expandedClubs[club.abbreviation] ? 'rotate-180' : ''}">
							▼
						</span>
					</div>
					
					{#if expandedClubs[club.abbreviation]}
						<div class="flex flex-col gap-2">
							<a href={webcalUrl} target="_blank" rel="noreferrer" title={`Add ${club.fullname} to Apple Calendar`} class="inline-flex items-center justify-center h-7 px-2 bg-gray-100 border border-gray-400 rounded text-black text-sm font-semibold capitalize cursor-pointer hover:bg-gray-200 hover:underline">Apple</a>
							<a
								href={`https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(webcalUrl)}`}
								target="_blank"
								rel="noreferrer"
								title={`Add ${club.fullname} to Google Calendar`}
								class="inline-flex items-center justify-center h-7 px-2 bg-gray-100 border border-gray-400 rounded text-black text-sm font-semibold capitalize cursor-pointer hover:bg-gray-200 hover:underline"
							>
								Google
							</a>
							<a
								href={`https://outlook.office.com/calendar/addfromweb?url=${encodeURIComponent(httpUrl)}&name=${encodeURIComponent(club.fullname + ' Schedule')}`}
								target="_blank"
								rel="noreferrer"
								title={`Add ${club.fullname} to Outlook`}
								class="inline-flex items-center justify-center h-7 px-2 bg-gray-100 border border-gray-400 rounded text-black text-sm font-semibold capitalize cursor-pointer hover:bg-gray-200 hover:underline"
							>
								Outlook
							</a>
							<a href={httpUrl} download={`${club.abbreviation}.ics`} title="Download calendar file" class="inline-flex items-center justify-center h-7 px-2 bg-gray-100 border border-gray-400 rounded text-black text-sm font-semibold capitalize cursor-pointer hover:bg-gray-200 hover:underline">Download</a>
						</div>
					{/if}
				</button>
			{/each}
		</div>

		<h2 class="text-2xl font-bold mb-6">NWSL</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			Coming soon!
		</div>
</main>
