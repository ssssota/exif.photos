import type { ExifData } from '$lib/exif';
import type { ComponentType, SvelteComponent } from 'svelte';
import type { Layout } from '../layout';

export type LayoutBuilder<Options extends Record<string, unknown> = Record<string, never>> = {
	name: string;
	description: string;
	defaultOptions: Options;
	OptionsEditor:
		| ComponentType<SvelteComponent<Record<string, never>, { change: Options }>>
		| undefined;
	build: (ctx: { exif: ExifData; options: Options }) => Layout;
};
