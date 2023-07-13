import type { ExifData } from '$lib/exif';
import type { ComponentType, SvelteComponent } from 'svelte';
import type { Layout } from '../layout';

type ComponentProps<Options> = {
	exif: ExifData;
	defaultOptions: Options;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LayoutBuilder<Options extends Record<string, unknown> = any> = {
	name: string;
	description: string;
	defaultOptions: Options;
	OptionsEditor:
		| ComponentType<SvelteComponent<ComponentProps<Options>, { change: Options }>>
		| undefined;
	build: (ctx: { exif: ExifData; options: Options }) => Layout;
};
