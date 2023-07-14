<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import 'uno.css';
	import 'water.css/out/dark.css';
</script>

<MetaTags
	title="exif.photos"
	description="Display EXIF data from your photos in a beautiful way"
	canonical="https://exif.photos/"
	openGraph={{
		url: 'https://exif.photos/',
		title: 'exif.photos',
		description: 'Display EXIF data from your photos in a beautiful way',
		images: [
			{
				url: 'https://exif.photos/ogp.png',
				width: 800,
				height: 600,
				alt: 'exif.photos'
			}
		],
		site_name: 'exif.photos'
	}}
	twitter={{
		handle: '@ssssotaro',
		site: '@site',
		cardType: 'summary_large_image',
		title: 'exif.photos',
		description: 'Display EXIF data from your photos in a beautiful way',
		image: 'https://exif.photos/ogp.png',
		imageAlt: 'exif.photos'
	}}
/>

<svelte:head>
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
