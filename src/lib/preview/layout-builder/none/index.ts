import type { LayoutBuilder } from '../types';
import ExifViewer from './ExifViewer.svelte';

export const none: LayoutBuilder = {
	name: 'None',
	description: 'Just image',
	defaultOptions: {},
	OptionsEditor: ExifViewer,
	build: () => [{ type: 'image' }]
};
