import type { Parser } from './types';

export const focalLength = {
	key: 'FocalLength',
	parse: (value) => `${value}mm`
} as const satisfies Parser;
