import type { LayoutBuilder } from '../types';
import BannerOptionsEditor from './BannerOptionsEditor.svelte';
import type { BannerOptions } from './types';

export const banner: LayoutBuilder<BannerOptions> = {
	name: 'Banner',
	description: 'Banner with exif',
	defaultOptions: {
		theme: 'light',
		model: '',
		make: '',
		lens: '',
		focalLength: '',
		fNumber: '',
		exposureTime: '',
		iso: '',
		date: ''
	},
	OptionsEditor: BannerOptionsEditor,
	build: ({ exif, options }) => {
		const { theme } = options;
		const model = options.model || exif.Model;
		const make = options.make || exif.Make;
		const lens = options.lens || exif.LensModel;
		const focalLength = options.focalLength || exif.FocalLength;
		const fNumber = options.fNumber || exif.FNumber;
		const exposureTime = options.exposureTime || exif.ExposureTime;
		const iso = options.iso || exif.ISO;
		const date =
			options.date || (exif.CreateDate ? new Date(exif.CreateDate).toLocaleString() : '');
		const light = theme === 'light';
		return [
			{
				type: 'background',
				color: light ? 'white' : '#111',
				top: 0,
				right: 0,
				bottom: -15,
				left: 0
			},
			{ type: 'image' },
			{
				type: 'text',
				align: 'left',
				baseline: 'alphabetic',
				position: {
					x: { type: 'left', offset: 4 },
					y: { type: 'bottom', offset: 7 }
				},
				text: [
					make && {
						color: light ? '#000' : '#fff',
						value: `${make} `,
						font: { family: 'sans-serif', size: 3.5 }
					},
					model && {
						color: light ? '#000' : '#fff',
						value: model,
						font: { family: 'sans-serif', size: 3.5, weight: 'bold' }
					}
				].flatMap((x) => x || [])
			},
			{
				type: 'text',
				align: 'left',
				baseline: 'alphabetic',
				position: {
					x: { type: 'left', offset: 4 },
					y: { type: 'bottom', offset: 10.5 }
				},
				text: [
					lens && {
						color: light ? '#999' : '#bbb',
						value: lens,
						font: { family: 'sans-serif', size: 2.5 }
					}
				].flatMap((x) => x || [])
			},
			{
				type: 'text',
				align: 'right',
				baseline: 'alphabetic',
				position: {
					x: { type: 'right', offset: -4 },
					y: { type: 'bottom', offset: 7 }
				},
				text: [
					focalLength && {
						color: light ? '#111' : '#eee',
						value: `${focalLength}  `,
						font: { family: 'sans-serif', size: 3.5, weight: 'bold' }
					},
					fNumber && {
						color: light ? '#111' : '#eee',
						value: `${fNumber}  `,
						font: { family: 'sans-serif', size: 3.5, weight: 'bold' }
					},
					exposureTime && {
						color: light ? '#111' : '#eee',
						value: `${exposureTime}  `,
						font: { family: 'sans-serif', size: 3.5, weight: 'bold' }
					},
					iso && {
						color: light ? '#111' : '#eee',
						value: iso,
						font: { family: 'sans-serif', size: 3.5, weight: 'bold' }
					}
				].flatMap((x) => x || [])
			},
			{
				type: 'text',
				align: 'right',
				baseline: 'alphabetic',
				position: {
					x: { type: 'right', offset: -4 },
					y: { type: 'bottom', offset: 10.5 }
				},
				text: [
					date && {
						color: light ? '#999' : '#bbb',
						value: date,
						font: { family: 'sans-serif', size: 2.5 }
					}
				].flatMap((x) => x || [])
			}
		];
	}
};
