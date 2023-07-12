import type { LayoutBuilder } from './types';

export const none: LayoutBuilder = {
	name: 'None',
	description: 'Just image',
	defaultOptions: {},
	OptionsEditor: undefined,
	build: () => {
		return [{ type: 'image' }];
	}
};
