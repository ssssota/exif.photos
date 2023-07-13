<script lang="ts">
	// eslint-ignore @typescript-eslint/no-explicit-any
	import Dropzone from '$lib/components/Dropzone.svelte';
	import { loadExif, type ExifData } from '$lib/exif';
	import { Preview } from '$lib/preview';
	import { frame, justFrame, none } from '$lib/preview/layout-builder';
	let canvas: HTMLCanvasElement | null = null;
	let ctx: CanvasRenderingContext2D | undefined;
	$: ctx = canvas?.getContext('2d') ?? undefined;

	let preview: Preview | undefined;
	$: if (ctx) preview = new Preview(ctx);

	const unresolved: Promise<any> = new Promise(() => undefined);
	let urlPromise: Promise<string> = unresolved;
	let filename: string | undefined;
	let exif: ExifData = {};

	const qualities = ['original', 'high', 'medium', 'low'] as const;
	let saveQuality: 'original' | 'high' | 'medium' | 'low' = 'high';

	const layoutBuilders = [none, justFrame, frame];
	type LayoutBuilder = (typeof layoutBuilders)[number];
	let layoutBuilderName: LayoutBuilder['name'] = layoutBuilders[0].name;
	let layoutBuilder: (typeof layoutBuilders)[number];
	$: layoutBuilder = layoutBuilders.find((b) => b.name === layoutBuilderName) ?? layoutBuilders[0];

	const redraw = <Builder extends LayoutBuilder>(
		builder: Builder,
		options?: Builder['defaultOptions']
	) => {
		if (!preview) return;
		try {
			preview.draw(builder.build({ exif, options: (options ?? builder.defaultOptions) as any }));
			urlPromise = preview.toUrl().catch(() => unresolved);
		} catch (e) {
			console.warn(e);
		}
	};

	const onFileChange = async (e: CustomEvent<FileList>) => {
		const file = e.detail.item(0);
		if (!file || !preview) return;

		filename = file.name;

		[exif] = await Promise.all([loadExif(file), preview.load(file)]);
		redraw(layoutBuilder);
	};
	const onOptionsChange = (e: LayoutBuilder['defaultOptions']) => {
		const _e = e as unknown as CustomEvent<LayoutBuilder['defaultOptions']>;
		redraw(layoutBuilder, _e.detail);
	};

	$: redraw(layoutBuilder);
</script>

<main class="grid h-full gap1 landscape:grid-cols-[2fr_minmax(300px,1fr)] portrait:grid-rows-2">
	<Dropzone
		on:change={onFileChange}
		class="relative box-border block flex appearance-none items-center justify-center border-none"
		accept="image/jpeg,image/png"
	>
		<p class="absolute left-1/2 top-1/2 -translate-1/2 pointer-events-none">
			Tap to select a photo
		</p>
		<!-- Fast preview -->
		<canvas
			bind:this={canvas}
			class="pointer-events-none absolute left-1/2 top-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2"
		/>
		{#await urlPromise then url}
			<!-- Delayed preview with anti-aliasing -->
			<img
				src={url}
				alt="Preview"
				class="absolute left-1/2 top-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2"
				on:error={() => (urlPromise = unresolved)}
			/>
		{/await}
	</Dropzone>
	<section class="overflow-auto">
		<h2>Inspector</h2>
		{#key filename}
			<section class="p-4">
				<h3>Layout</h3>
				<select bind:value={layoutBuilderName}>
					{#each layoutBuilders as builder (builder.name)}
						<option value={builder.name}>{builder.name}</option>
					{/each}
				</select>
				{#if layoutBuilder.OptionsEditor !== undefined}
					<section>
						<h4>Options</h4>
						<svelte:component
							this={layoutBuilder.OptionsEditor}
							{exif}
							defaultOptions={layoutBuilder.defaultOptions}
							on:change={onOptionsChange}
						/>
					</section>
				{/if}
			</section>
			<section class="p-4">
				<h3>Save</h3>
				<label class="inline-flex gap1 items-center">
					Quality:
					<select bind:value={saveQuality}>
						{#each qualities as quality (quality)}
							<option value={quality}>{quality}</option>
						{/each}
					</select>
				</label>
				<p>
					<button
						on:click={() => {
							if (!preview) return;
							const quality = { original: 1, high: 0.8, medium: 0.6, low: 0.4 }[saveQuality];
							preview.toUrl(quality).then((url) => {
								const a = document.createElement('a');
								a.href = url;
								a.download = filename ?? 'exif.photos.jpg';
								a.click();
							});
						}}
					>
						Save
					</button>
				</p>
			</section>
		{/key}
		<section class="p-4">
			<h3>About</h3>
			<p>
				Inspired by
				<a href="https://apps.apple.com/app/id1547215938" target="_blank" rel="noreferrer">
					Liit - Vintage Photo Editor
				</a>.
			</p>
			<p>
				Created by
				<a href="https://github.com/ssssota" target="_blank" rel="noreferrer">ssssota</a>.
			</p>
			<p>
				Source code available on
				<a href="https://github.com/ssssota/exif.photos" target="_blank" rel="noreferrer">
					GitHub
				</a>.
			</p>
		</section>
	</section>
</main>
