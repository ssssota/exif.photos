export const sum = (...values: (number | null | undefined)[]): number =>
	values.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;
