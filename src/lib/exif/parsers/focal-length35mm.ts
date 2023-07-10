import type { Parser } from './types';

export const focalLength35mm = {
	key: 'FocalLengthIn35mmFormat',
	parse: (value) => `${value}mm`
} as const satisfies Parser;
