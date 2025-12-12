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

<main>
	<div id="links">
		<h2>World Cup 2026</h2>
		<div>
			<a href={wcWebcalUrl} target="_blank" rel="noreferrer" title="Add to Apple Calendar">Apple</a>
			<a
				href={`https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(wcWebcalUrl)}`}
				target="_blank"
				rel="noreferrer"
				title="Add to Google Calendar"
			>
				Google
			</a>
			<a
				href={`https://outlook.office.com/calendar/addfromweb?url=${encodeURIComponent(wcHttpUrl)}&name=${encodeURIComponent(WC26_EVENT_NAME)}`}
				target="_blank"
				rel="noreferrer"
				title="Add to Outlook"
			>
				Outlook
			</a>
			<a href={wcHttpUrl} download={WC26_FILENAME} title="Download calendar file">Download</a>
		</div>

		<h2>MLS</h2>
		{#each clubsMLS as club}
			{@const httpUrl = `${BASE_PATH}/mls/${club.abbreviation}.ics`}
			{@const webcalUrl = host ? `webcal://${host}${httpUrl}` : httpUrl}
			<div>
				<h3>{club.fullname}</h3>
				
				<a href={webcalUrl} target="_blank" rel="noreferrer" title={`Add ${club.fullname} to Apple Calendar`}>Apple</a>
				<a
					href={`https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(webcalUrl)}`}
					target="_blank"
					rel="noreferrer"
					title={`Add ${club.fullname} to Google Calendar`}
				>
					Google
				</a>
				<a
					href={`https://outlook.office.com/calendar/addfromweb?url=${encodeURIComponent(httpUrl)}&name=${encodeURIComponent(club.fullname + ' Schedule')}`}
					target="_blank"
					rel="noreferrer"
					title={`Add ${club.fullname} to Outlook`}
				>
					Outlook
				</a>
				<a href={httpUrl} download={`${club.abbreviation}.ics`} title="Download calendar file">Download</a>
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		width: 100%;
		padding: 0 10px;
		box-sizing: border-box;
	}

	#links {
		display: block;
	}

	#links > div {
		border-bottom: 1px solid black;
		margin-bottom: 25px;
		padding-bottom: 25px;
	}

	#links h2 {
		margin-bottom: 5px;
	}

	#links a {
		align-items: center;
		background-color: #fafafa;
		border: 1px solid #b9b9b9;
		border-radius: 5px;
		display: inline-flex;
		flex-wrap: wrap;
		justify-content: center;
		color: #000000;
		font-size: 14px;
		font-weight: 600;
		height: 25px;
		text-decoration: none;
		text-transform: capitalize;
		overflow: hidden;
		padding: 5px;
		margin: 0 10px 0 0;
		word-break: break-word;
		cursor: pointer;
	}

	#links a:hover {
		background-color: #efefef;
		text-decoration: underline;
	}
</style>
