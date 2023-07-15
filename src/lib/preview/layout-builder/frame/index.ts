import type { LayoutBuilder } from '../types';
import FrameOptionsEditor from './FrameOptionsEditor.svelte';
import type { FrameOptions } from './types';

export const frame: LayoutBuilder<FrameOptions> = {
	name: 'Frame',
	description: 'A simple frame',
	defaultOptions: {
		theme: 'light',
		align: 'center',
		model: '',
		make: '',
		focalLength: '',
		fNumber: '',
		exposureTime: '',
		iso: ''
	},
	OptionsEditor: FrameOptionsEditor,
	build: ({ exif, options }) => {
		const { theme, align } = options;
		const model = options.model || exif.Model;
		const make = options.make || exif.Make;
		const focalLength = options.focalLength || exif.FocalLength;
		const fNumber = options.fNumber || exif.FNumber;
		const exposureTime = options.exposureTime || exif.ExposureTime;
		const iso = options.iso || exif.ISO;
		const light = theme === 'light';
		return [
			{
				type: 'background',
				color: light ? 'white' : '#111',
				top: -2,
				right: -2,
				bottom: -11,
				left: -2
			},
			{ type: 'image' },
			{
				type: 'text',
				align: align,
				baseline: 'alphabetic',
				position: {
					x: { type: align, offset: 0 },
					y: { type: 'bottom', offset: 5 }
				},
				text: [
					{
						color: light ? '#666' : '#eee',
						value: 'Shot on ',
						font: { family: 'sans-serif', size: 2.5 }
					},
					model && {
						color: light ? '#000' : '#fff',
						value: `${model} `,
						font: { family: 'sans-serif', size: 2.5, weight: 'bold' }
					},
					make && {
						color: light ? '#000' : '#fff',
						value: make,
						font: { family: 'sans-serif', size: 2.5 }
					}
				].flatMap((x) => x || [])
			},
			{
				type: 'text',
				align: align,
				baseline: 'alphabetic',
				position: {
					x: { type: align, offset: 0 },
					y: { type: 'bottom', offset: 8 }
				},
				text: [
					focalLength && {
						color: light ? '#999' : '#bbb',
						value: `${focalLength} `,
						font: { family: 'sans-serif', size: 1.75 }
					},
					fNumber && {
						color: light ? '#999' : '#bbb',
						value: `${fNumber} `,
						font: { family: 'sans-serif', size: 1.75 }
					},
					exposureTime && {
						color: light ? '#999' : '#bbb',
						value: `${exposureTime} `,
						font: { family: 'sans-serif', size: 1.75 }
					},
					iso && {
						color: light ? '#999' : '#bbb',
						value: iso,
						font: { family: 'sans-serif', size: 1.75 }
					}
				].flatMap((x) => x || [])
			}
		];
	}
};
