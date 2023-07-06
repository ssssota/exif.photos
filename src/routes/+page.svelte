<script lang="ts">
	import exifr from 'exifr';
	import Dropzone from '../lib/components/Dropzone.svelte';
	let canvas: HTMLCanvasElement | null = null;
	let stats = '';
	const targetPropParseMap: Record<string, (value: unknown) => string> = {
		Make: (value) => `${value}`,
		Model: (value) => `${value}`,
		ISO: (value) => `${value}`,
		FNumber: (value) => `${value}`,
		FocalLength: (value) => `${value}mm`,
		FocalLengthIn35mmFormat: (value) => `${value}mm`,
		ExposureTime: (value) => {
			const num = Number(value);
			if (num < 1) return `1/${Math.round(1 / num)}s`;
			else return `${num}s`;
		},
		LensModel: (value) => `${value}`
	};
	const onFileChange = (e: CustomEvent<FileList>) => {
		const files = e.detail;
		const file = files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			const img = new Image();
			img.onload = () => {
				if (!canvas) throw new Error('Canvas is null');
				canvas.width = img.width;
				canvas.height = img.height;
				const ctx = canvas.getContext('2d');
				if (!ctx) throw new Error('Canvas context is null');
				ctx.drawImage(img, 0, 0);
			};
			if (typeof e.target?.result === 'string') img.src = e.target.result;
			else throw new Error('e.target?.result is not a string');
		};
		reader.readAsDataURL(file);
		exifr.parse(file).then((exif) => {
			console.log(exif);
			stats = '';
			Object.entries(targetPropParseMap).forEach(([prop, parse]) => {
				if (exif[prop] === undefined) return;
				stats += `${prop}: ${parse(exif[prop])}\n`;
			});
		});
	};
</script>

<Dropzone on:change={onFileChange} class="appearance-none block w-full border-none h-full">
	<canvas bind:this={canvas} class="max-w-full max-h-full pointer-events-none" />
	<pre class="text-white">{stats}</pre>
</Dropzone>
