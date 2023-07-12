import FrameOptionsEditor from './FrameOptionsEditor.svelte';
import type { LayoutBuilder } from './types';

type FrameOptions = {
	align: 'left' | 'center' | 'right';
};
export const frame: LayoutBuilder<FrameOptions> = {
	name: 'Frame',
	description: 'A simple frame',
	defaultOptions: { align: 'center' },
	OptionsEditor: FrameOptionsEditor,
	build: ({ exif, options }) => {
		return [
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
				align: options.align,
				baseline: 'alphabetic',
				position: {
					x: { type: options.align, offset: 0 },
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
				align: options.align,
				baseline: 'alphabetic',
				position: {
					x: { type: options.align, offset: 0 },
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
		];
	}
};
