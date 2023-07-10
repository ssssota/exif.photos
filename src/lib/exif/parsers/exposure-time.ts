import type { Parser } from './types';

export const exposureTime = {
	key: 'ExposureTime',
	parse: (value) => {
		const num = Number(value);
		if (num < 1) return `1/${Math.round(1 / num)}s`;
		return `${num}s`;
	}
} as const satisfies Parser;
