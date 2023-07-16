import type { LayoutBuilder } from '../types';

export const justFrame: LayoutBuilder = {
	name: 'Just a Frame',
	description: 'No text, just a frame',
	defaultOptions: {},
	OptionsEditor: undefined,
	build: () => {
		return [
			{
				type: 'background',
				color: 'white',
				top: -3.5,
				right: -3.5,
				bottom: -3.5,
				left: -3.5
			},
			{ type: 'image' }
		];
	}
};
