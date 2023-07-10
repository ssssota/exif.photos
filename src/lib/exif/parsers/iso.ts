import type { Parser } from './types';

export const iso = {
	key: 'ISO',
	parse: (value) => `ISO${value}`
} as const satisfies Parser;
