<script>
	import { clubsData } from '$lib/clubs.js';
</script>

<main>
	<div id="links">
		{#each clubsData as club}
			{@const httpUrl = `/us-soccer-calendars/mls/${club.abbreviation}.ics`}
			{@const webcalUrl = httpUrl.replace('https://', 'webcal://').replace('http://', 'webcal://')}
			<div>
				<h2>{club.fullname}</h2>
				
				<a href={webcalUrl} target="_blank" rel="noreferrer">Apple</a>
				<a
					href={`https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(webcalUrl)}`}
					target="_blank"
					rel="noreferrer"
				>
					Google
				</a>
				<a
					href={`https://outlook.office.com/calendar/addfromweb?url=${encodeURIComponent(httpUrl)}&name=${encodeURIComponent(club.fullname + ' Schedule')}`}
					target="_blank"
					rel="noreferrer"
				>
					Outlook
				</a>
				<a href={httpUrl} download={`${club.abbreviation}.ics`}>Download</a>
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		width: calc(100% - 20px);
		display: block;
		margin: 0 10px;
	}

	#links {
		display: block;
		margin: 0;
		padding: 0;
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
