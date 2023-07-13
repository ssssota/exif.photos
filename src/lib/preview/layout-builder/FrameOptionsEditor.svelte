<script lang="ts">
	import type { ExifData } from '$lib/exif';
	import { createEventDispatcher } from 'svelte';
	import type { FrameOptions } from './frame';

	interface $$Events {
		change: FrameOptions;
	}

	export let exif: ExifData;
	export let defaultOptions: FrameOptions;

	let align: 'left' | 'center' | 'right' = 'center';
	const alignOptions = ['left', 'center', 'right'];
	let model: string;
	let make: string;
	let focalLength: string;
	let fNumber: string;
	let exposureTime: string;
	let iso: string;

	const dispatch = createEventDispatcher<$$Events>();
	$: dispatch('change', { align, model, make, focalLength, fNumber, exposureTime, iso });

	const id = Math.random().toString(36).slice(2);
</script>

<p>
	Align:
	{#each alignOptions as option (option)}
		<label>
			<input value={option} bind:group={align} type="radio" name={id} />
			{option}
		</label>
	{/each}
</p>

<p>
	<label>
		Model:
		<input bind:value={model} type="text" placeholder={exif.Model ?? defaultOptions.model} />
	</label>
</p>
<p>
	<label>
		Make:
		<input bind:value={make} type="text" placeholder={exif.Make ?? defaultOptions.make} />
	</label>
</p>
<p>
	<label>
		Focal length:
		<input
			bind:value={focalLength}
			type="text"
			placeholder={exif.FocalLength ?? defaultOptions.focalLength}
		/>
	</label>
</p>
<p>
	<label>
		F number:
		<input bind:value={fNumber} type="text" placeholder={exif.FNumber ?? defaultOptions.fNumber} />
	</label>
</p>
<p>
	<label>
		Exposure time:
		<input
			bind:value={exposureTime}
			type="text"
			placeholder={exif.ExposureTime ?? defaultOptions.exposureTime}
		/>
	</label>
</p>
<p>
	<label>
		ISO:
		<input bind:value={iso} type="text" placeholder={exif.ISO ?? defaultOptions.iso} />
	</label>
</p>
