import type { LayoutBuilder } from './types';

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
				top: -2,
				right: -2,
				bottom: -2,
				left: -2
			},
			{ type: 'image' }
		];
	}
};
