<script lang="ts">
	import Dropzone from '$lib/components/Dropzone.svelte';
	import { loadExif } from '$lib/exif';
	import { Preview } from '$lib/preview';
	let canvas: HTMLCanvasElement | null = null;
	let ctx: CanvasRenderingContext2D | undefined;
	$: ctx = canvas?.getContext('2d') ?? undefined;
	let preview: Preview | undefined;
	$: if (ctx) preview = new Preview(ctx);
	const unresolved: Promise<any> = new Promise(() => {});
	let urlPromise: Promise<string> = unresolved;

	const onFileChange = async (e: CustomEvent<FileList>) => {
		const file = e.detail.item(0);
		if (!file || !preview) return;

		const [exif] = await Promise.all([loadExif(file), preview.load(file)]);
		urlPromise = preview.draw([
			{
				type: 'background',
				color: 'white',
				top: -2,
				right: -2,
				bottom: -11,
				left: -2
			},
			{ type: 'image' },
			{
				type: 'text',
				align: 'right',
				baseline: 'alphabetic',
				position: {
					x: { type: 'right', offset: 0 },
					y: { type: 'bottom', offset: 5 }
				},
				text: [
					{
						color: '#666',
						value: 'Shot on ',
						font: { family: 'sans-serif', size: 2.5 }
					},
					exif.Model && {
						color: '#000',
						value: `${exif.Model} `,
						font: { family: 'sans-serif', size: 2.5, weight: 'bold' }
					},
					exif.Make && {
						color: '#000',
						value: exif.Make,
						font: { family: 'sans-serif', size: 2.5 }
					}
				].flatMap((x) => x || [])
			},
			{
				type: 'text',
				align: 'right',
				baseline: 'alphabetic',
				position: {
					x: { type: 'right', offset: 0 },
					y: { type: 'bottom', offset: 8 }
				},
				text: [
					exif.FocalLength && {
						color: '#999',
						value: `${exif.FocalLength} `,
						font: { family: 'sans-serif', size: 1.75 }
					},
					exif.FNumber && {
						color: '#999',
						value: `${exif.FNumber} `,
						font: { family: 'sans-serif', size: 1.75 }
					},
					exif.ExposureTime && {
						color: '#999',
						value: `${exif.ExposureTime} `,
						font: { family: 'sans-serif', size: 1.75 }
					},
					exif.ISO && {
						color: '#999',
						value: exif.ISO,
						font: { family: 'sans-serif', size: 1.75 }
					}
				].flatMap((x) => x || [])
			}
		]);
	};
</script>

<main
	class="grid h-full landscape:grid-cols-[2fr_minmax(300px,1fr)] portrait:grid-rows-2 bg-gray gap1"
>
	<Dropzone
		on:change={onFileChange}
		class="appearance-none block border-none bg-gray-9 relative flex items-center justify-center box-border"
	>
		<!-- Fast preview -->
		<canvas
			bind:this={canvas}
			class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-full max-w-full"
		/>
		{#await urlPromise then url}
			<!-- Delayed preview with anti-aliasing -->
			<img
				src={url}
				alt="Preview"
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-full max-w-full"
				on:error={() => (urlPromise = unresolved)}
			/>
		{/await}
	</Dropzone>
	<section class="bg-gray-9 text-gray-1">
		<h2 class="text-sm">Inspector</h2>
		<section class="p-4">
			<h3>Save</h3>
			<button
				class="bg-gray-1 text-gray-9 appearance-none border-0"
				on:click={() => {
					urlPromise.then((url) => {
						const a = document.createElement('a');
						a.href = url;
						a.download = 'peneg.jpg';
						a.click();
					});
				}}
			>
				Save
			</button>
		</section>
	</section>
</main>
