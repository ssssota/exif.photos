import type { Parser } from './types';

export const model = {
	key: 'Model',
	parse: (value) => `${value}`
} as const satisfies Parser;
