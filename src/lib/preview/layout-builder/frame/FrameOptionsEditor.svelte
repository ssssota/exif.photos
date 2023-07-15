<script lang="ts">
	import type { ExifData } from '$lib/exif';
	import { createEventDispatcher } from 'svelte';
	import type { FrameOptions } from './types';

	interface $$Events {
		change: FrameOptions;
	}

	export let exif: ExifData;
	export let defaultOptions: FrameOptions;

	let theme: 'light' | 'dark' = 'light';
	const themeOptions = ['light', 'dark'];
	let align: 'left' | 'center' | 'right' = 'center';
	const alignOptions = ['left', 'center', 'right'];
	let model: string;
	let make: string;
	let focalLength: string;
	let fNumber: string;
	let exposureTime: string;
	let iso: string;

	const dispatch = createEventDispatcher<$$Events>();
	$: dispatch('change', { theme, align, model, make, focalLength, fNumber, exposureTime, iso });

	const id = Math.random().toString(36).slice(2);
</script>

<p>
	<span>Theme:</span>
	{#each themeOptions as option (option)}
		<label>
			<input value={option} bind:group={theme} type="radio" name="theme-{id}" />
			{option}
		</label>
	{/each}
</p>
<p>
	<span>Align:</span>
	{#each alignOptions as option (option)}
		<label>
			<input value={option} bind:group={align} type="radio" name="align-{id}" />
			{option}
		</label>
	{/each}
</p>
<ul class="list-none px0">
	<li>
		<label>
			Model:
			<input bind:value={model} type="text" placeholder={exif.Model ?? defaultOptions.model} />
		</label>
	</li>
	<li>
		<label>
			Make:
			<input bind:value={make} type="text" placeholder={exif.Make ?? defaultOptions.make} />
		</label>
	</li>
	<li>
		<label>
			Focal length:
			<input
				bind:value={focalLength}
				type="text"
				placeholder={exif.FocalLength ?? defaultOptions.focalLength}
			/>
		</label>
	</li>
	<li>
		<label>
			F number:
			<input
				bind:value={fNumber}
				type="text"
				placeholder={exif.FNumber ?? defaultOptions.fNumber}
			/>
		</label>
	</li>
	<li>
		<label>
			Exposure time:
			<input
				bind:value={exposureTime}
				type="text"
				placeholder={exif.ExposureTime ?? defaultOptions.exposureTime}
			/>
		</label>
	</li>
	<li>
		<label>
			ISO:
			<input bind:value={iso} type="text" placeholder={exif.ISO ?? defaultOptions.iso} />
		</label>
	</li>
</ul>
