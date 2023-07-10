import type { Parser } from './types';

export const lensModel = {
	key: 'LensModel',
	parse: (value) => `${value}`
} as const satisfies Parser;
