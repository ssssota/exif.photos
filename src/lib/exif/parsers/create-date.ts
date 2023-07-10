import type { Parser } from './types';

export const createDate = {
	key: 'CreateDate',
	parse: (value) => {
		try {
			const date = new Date(value as Date);
			return date.toISOString();
		} catch (error) {
			return undefined;
		}
	}
} as const satisfies Parser;
