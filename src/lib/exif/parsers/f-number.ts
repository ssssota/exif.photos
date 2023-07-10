import type { Parser } from './types';

export const fNumber = {
	key: 'FNumber',
	parse: (value) => {
		const num = Number(value);
		if (Number.isNaN(num)) return undefined;
		if (Number.isInteger(num)) return `f/${num}.0`;
		return `f/${num}`;
	}
} as const satisfies Parser;
