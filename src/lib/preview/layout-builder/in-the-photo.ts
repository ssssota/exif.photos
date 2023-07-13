import InThePhotoOptionsEditor from './InThePhotoOptionsEditor.svelte';
import type { LayoutBuilder } from './types';

export type InThePhotoOptions = {
	align: 'left' | 'right';
	color: 'white' | 'gray' | 'black';
	model: string;
	make: string;
	focalLength: string;
	fNumber: string;
	exposureTime: string;
	iso: string;
};
export const inThePhoto: LayoutBuilder<InThePhotoOptions> = {
	name: 'In the Photo',
	description: 'Exif data in the photo',
	defaultOptions: {
		align: 'left',
		color: 'black',
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
					y: { type: 'bottom', offset: -8 }
				},
				text: [make && { color, value: make, font: { family: 'serif', size: 2.5 } }].flatMap(
					(x) => x || []
				)
			},
			{
				type: 'text',
				align: align,
				baseline: 'alphabetic',
				position: {
					x: { type: align, offset: align === 'left' ? 3 : -3 },
					y: { type: 'bottom', offset: -5 }
				},
				text: [
					model && { color, value: model, font: { family: 'serif', size: 2.5, weight: 'bold' } }
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
						font: { family: 'serif', size: 1.75 }
					},
					fNumber && {
						color,
						value: `${fNumber} `,
						font: { family: 'serif', size: 1.75 }
					},
					exposureTime && {
						color,
						value: `${exposureTime} `,
						font: { family: 'serif', size: 1.75 }
					},
					iso && {
						color,
						value: iso,
						font: { family: 'serif', size: 1.75 }
					}
				].flatMap((x) => x || [])
			}
		];
	}
};
