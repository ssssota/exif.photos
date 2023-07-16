import type { LayoutBuilder } from '../types';
import InThePhotoOptionsEditor from './InThePhotoOptionsEditor.svelte';
import type { InThePhotoOptions } from './types';

export const inThePhoto: LayoutBuilder<InThePhotoOptions> = {
	name: 'In the Photo',
	description: 'Exif data in the photo',
	defaultOptions: {
		align: 'left',
		color: 'white',
		model: '',
		make: '',
		focalLength: '',
		fNumber: '',
		exposureTime: '',
		iso: ''
	},
	OptionsEditor: InThePhotoOptionsEditor,
	build: ({ exif, options }) => {
		const { align, color } = options;
		const model = options.model || exif.Model;
		const make = options.make || exif.Make;
		const focalLength = options.focalLength || exif.FocalLength;
		const fNumber = options.fNumber || exif.FNumber;
		const exposureTime = options.exposureTime || exif.ExposureTime;
		const iso = options.iso || exif.ISO;
		return [
			{ type: 'image' },
			{
				type: 'text',
				align: align,
				baseline: 'alphabetic',
				position: {
					x: { type: align, offset: align === 'left' ? 3 : -3 },
					y: { type: 'bottom', offset: -10 }
				},
				text: [make && { color, value: make, font: { family: 'serif', size: 4 } }].flatMap(
					(x) => x || []
				)
			},
			{
				type: 'text',
				align: align,
				baseline: 'alphabetic',
				position: {
					x: { type: align, offset: align === 'left' ? 3 : -3 },
					y: { type: 'bottom', offset: -6 }
				},
				text: [
					model && { color, value: model, font: { family: 'serif', size: 4, weight: 'bold' } }
				].flatMap((x) => x || [])
			},
			{
				type: 'text',
				align: align,
				baseline: 'alphabetic',
				position: {
					x: { type: align, offset: align === 'left' ? 3 : -3 },
					y: { type: 'bottom', offset: -3 }
				},
				text: [
					focalLength && {
						color,
						value: `${focalLength} `,
						font: { family: 'serif', size: 3 }
					},
					fNumber && {
						color,
						value: `${fNumber} `,
						font: { family: 'serif', size: 3 }
					},
					exposureTime && {
						color,
						value: `${exposureTime} `,
						font: { family: 'serif', size: 3 }
					},
					iso && {
						color,
						value: iso,
						font: { family: 'serif', size: 3 }
					}
				].flatMap((x) => x || [])
			}
		];
	}
};
