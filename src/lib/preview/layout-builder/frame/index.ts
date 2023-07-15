import type { LayoutBuilder } from '../types';
import FrameOptionsEditor from './FrameOptionsEditor.svelte';
import type { FrameOptions } from './types';

export const frame: LayoutBuilder<FrameOptions> = {
	name: 'Frame',
	description: 'A simple frame',
	defaultOptions: {
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
		const model = options.model || exif.Model;
		const make = options.make || exif.Make;
		const focalLength = options.focalLength || exif.FocalLength;
		const fNumber = options.fNumber || exif.FNumber;
		const exposureTime = options.exposureTime || exif.ExposureTime;
		const iso = options.iso || exif.ISO;
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
					model && {
						color: '#000',
						value: `${model} `,
						font: { family: 'sans-serif', size: 2.5, weight: 'bold' }
					},
					make && {
						color: '#000',
						value: make,
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
					focalLength && {
						color: '#999',
						value: `${focalLength} `,
						font: { family: 'sans-serif', size: 1.75 }
					},
					fNumber && {
						color: '#999',
						value: `${fNumber} `,
						font: { family: 'sans-serif', size: 1.75 }
					},
					exposureTime && {
						color: '#999',
						value: `${exposureTime} `,
						font: { family: 'sans-serif', size: 1.75 }
					},
					iso && {
						color: '#999',
						value: iso,
						font: { family: 'sans-serif', size: 1.75 }
					}
				].flatMap((x) => x || [])
			}
		];
	}
};
