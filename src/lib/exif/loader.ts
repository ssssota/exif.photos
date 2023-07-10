import exifr from 'exifr';
import { parsers } from './parsers';

type ExifKey = (typeof parsers)[number]['key'];
export type ExifData = { [key in ExifKey]?: string };

export const loadExif = async (file: File): Promise<ExifData> => {
	try {
		const parsed = await exifr.parse(file);
		return parsers
			.flatMap<[ExifKey, string | undefined]>(({ key, parse }) => {
				const value = parsed[key];
				if (value == null) return [];
				return [[key, parse(value)]];
			})
			.reduce<ExifData>((acc, [key, value]) => ({ ...acc, [key]: value }), {});
	} catch {
		return {};
	}
};
