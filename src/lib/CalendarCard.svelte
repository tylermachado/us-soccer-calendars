<script lang="ts">
	import chroma from 'chroma-js';

	export let title = '';
	export let appleUrl = '';
	export let googleUrl = '';
	export let outlookUrl = '';
	export let downloadUrl = '';
	export let downloadFilename = '';
	export let appleTitle = 'Add to Apple Calendar';
	export let googleTitle = 'Add to Google Calendar';
	export let outlookTitle = 'Add to Outlook';
	export let downloadTitle = 'Download calendar file';
	export let colors: string[] = [];

	// Determine which color is lighter and set background/text colors
	let backgroundColor = '#f3f4f6';
	let textColor = '#065f46';
	let borderColor = '#065f46';

	$: if (colors.length === 2) {
		const color1: any = chroma(colors[0]);
		const color2: any = chroma(colors[1]);
		
		const lightness1 = color1.lch()[0];
		const lightness2 = color2.lch()[0];
		
		const lighterColor = lightness1 > lightness2 ? color1 : color2;
		const darkerColor = lightness1 > lightness2 ? color2 : color1;
		
		// Lighten the lighter color by 70%
		const lightenedBg = lighterColor.luminance(0.7).hex();
		const darkText = darkerColor.hex();
		
		// Set inline styles since Tailwind can't handle dynamic colors well
		backgroundColor = lightenedBg;
		textColor = darkText;
		borderColor = darkText;
	}
</script>

<div class="p-4 rounded-lg" style="background-color: {backgroundColor};">
	<div class="text-lg font-semibold mb-3" style="color: {textColor};">{title}</div>
	<div class="flex flex-row gap-2">
		<a
			href={appleUrl}
			target="_blank"
			rel="noreferrer"
			title={appleTitle}
			class="inline-flex items-center justify-center h-7 px-2 rounded text-sm font-semibold capitalize cursor-pointer hover:underline flex-1"
			style="background-color: {backgroundColor}; color: {textColor}; border: 1px solid {borderColor};"
		>
			Apple
		</a>
		<a
			href={googleUrl}
			target="_blank"
			rel="noreferrer"
			title={googleTitle}
			class="inline-flex items-center justify-center h-7 px-2 rounded text-sm font-semibold capitalize cursor-pointer hover:underline flex-1"
			style="background-color: {backgroundColor}; color: {textColor}; border: 1px solid {borderColor};"
		>
			Google
		</a>
		<a
			href={outlookUrl}
			target="_blank"
			rel="noreferrer"
			title={outlookTitle}
			class="inline-flex items-center justify-center h-7 px-2 rounded text-sm font-semibold capitalize cursor-pointer hover:underline flex-1"
			style="background-color: {backgroundColor}; color: {textColor}; border: 1px solid {borderColor};"
		>
			Outlook
		</a>
		<a
			href={downloadUrl}
			download={downloadFilename}
			title={downloadTitle}
			class="inline-flex items-center justify-center h-7 px-2 rounded text-sm font-semibold capitalize cursor-pointer hover:underline flex-1"
			style="background-color: {backgroundColor}; color: {textColor}; border: 1px solid {borderColor};"
		>
			Download
		</a>
	</div>
</div>
