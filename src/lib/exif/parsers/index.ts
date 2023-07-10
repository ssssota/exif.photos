import { createDate } from './create-date';
import { exposureTime } from './exposure-time';
import { fNumber } from './f-number';
import { focalLength } from './focal-length';
import { focalLength35mm } from './focal-length35mm';
import { iso } from './iso';
import { lensModel } from './lens-model';
import { make } from './make';
import { model } from './model';
import type { Parser } from './types';

export const parsers = [
	make,
	model,
	iso,
	fNumber,
	focalLength,
	focalLength35mm,
	exposureTime,
	lensModel,
	createDate
] as const satisfies readonly Parser[];
