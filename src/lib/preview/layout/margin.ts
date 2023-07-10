import type { Layout } from './index';

export type Margin = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};
export const calculateMargin = (layout: Layout, unit: number) => {
	const margin = { top: 0, right: 0, bottom: 0, left: 0 };
	for (const layer of layout) {
		switch (layer.type) {
			case 'background':
				margin.top = layer.top;
				margin.right = layer.right;
				margin.bottom = layer.bottom;
				margin.left = layer.left;
				break;
		}
	}
	return {
		top: -margin.top * unit,
		right: -margin.right * unit,
		bottom: -margin.bottom * unit,
		left: -margin.left * unit
	};
};
