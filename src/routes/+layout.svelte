<script lang="ts">
	import 'uno.css';
	import 'water.css/out/dark.css';
</script>

<svelte:head>
	<title>exif.photos</title>
	<meta name="description" content="Display EXIF data from your photos in a beautiful way" />
	<link rel="icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" sizes={'180x180'} />
	<meta name="theme-color" content="#ffffff" />
	<link rel="manifest" href="/app.webmanifest" />
</svelte:head>
<div class="h-full bg-gray-8">
	<slot />
</div>

<style>
	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
		height: 100%;
		max-width: revert;
	}
</style>
