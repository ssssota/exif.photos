<script lang="ts">
	import type { ExifData } from '$lib/exif';

	interface $$Events {
		change: Record<string, never>;
	}

	export let exif: ExifData;
	export let defaultOptions: Record<string, never>;
	defaultOptions;
</script>

<ul>
	{#each Object.entries(exif) as [key, value] (key)}
		<li>{key}: {value}</li>
	{/each}
</ul>
