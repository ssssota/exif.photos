<script lang="ts">
	import type { ExifData } from '$lib/exif';
	import { createEventDispatcher } from 'svelte';
	import type { InThePhotoOptions } from './types';

	interface $$Events {
		change: InThePhotoOptions;
	}

	export let exif: ExifData;
	export let defaultOptions: InThePhotoOptions;

	let align: InThePhotoOptions['align'] = defaultOptions.align;
	const alignOptions = ['left', 'right'] satisfies InThePhotoOptions['align'][];
	let color: InThePhotoOptions['color'] = defaultOptions.color;
	const colorOptions = ['black', 'gray', 'white'] satisfies InThePhotoOptions['color'][];
	let model: string;
	let make: string;
	let focalLength: string;
	let fNumber: string;
	let exposureTime: string;
	let iso: string;

	const dispatch = createEventDispatcher<$$Events>();
	$: dispatch('change', { align, color, model, make, focalLength, fNumber, exposureTime, iso });

	const id = Math.random().toString(36).slice(2);
</script>

<p>
	Align:
	{#each alignOptions as option (option)}
		<label>
			<input value={option} bind:group={align} type="radio" name="align-{id}" />
			{option}
		</label>
	{/each}
</p>
<p>
	Color:
	{#each colorOptions as option (option)}
		<label>
			<input value={option} bind:group={color} type="radio" name="color-{id}" />
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
