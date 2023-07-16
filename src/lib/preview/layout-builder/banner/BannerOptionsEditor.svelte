<script lang="ts">
	import type { ExifData } from '$lib/exif';
	import { createEventDispatcher } from 'svelte';
	import type { BannerOptions } from './types';

	interface $$Events {
		change: BannerOptions;
	}

	export let exif: ExifData;
	export let defaultOptions: BannerOptions;

	let theme: 'light' | 'dark' = 'light';
	const themeOptions = ['light', 'dark'];
	let model: string;
	let lens: string;
	let make: string;
	let focalLength: string;
	let fNumber: string;
	let exposureTime: string;
	let iso: string;
	let date: string;

	const dispatch = createEventDispatcher<$$Events>();
	$: dispatch('change', {
		theme,
		model,
		make,
		lens,
		focalLength,
		fNumber,
		exposureTime,
		iso,
		date
	});

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
			Lens:
			<input bind:value={lens} type="text" placeholder={exif.LensModel ?? defaultOptions.lens} />
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
	<li>
		<label>
			Date:
			<input
				bind:value={date}
				type="text"
				placeholder={exif.CreateDate
					? new Date(exif.CreateDate).toLocaleString()
					: defaultOptions.date}
			/>
		</label>
	</li>
</ul>
