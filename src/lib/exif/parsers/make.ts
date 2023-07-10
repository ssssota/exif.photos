import type { Parser } from './types';

export const make = {
	key: 'Make',
	parse: (value) => `${value}`
} as const satisfies Parser;
