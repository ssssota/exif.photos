/**
 * ref. https://developer.mozilla.org/en-US/docs/Web/CSS/font#formal_syntax
 */
export type Font = {
	size: number;
	family: string;
	style?: string;
	weight?: string;
	variant?: 'normal' | 'small-caps';
	stretch?:
		| 'normal'
		| 'ultra-condensed'
		| 'extra-condensed'
		| 'condensed'
		| 'semi-condensed'
		| 'semi-expanded'
		| 'expanded'
		| 'extra-expanded'
		| 'ultra-expanded';
};

export const fontToString = (font: Font, unit = 1) =>
	[font.style, font.variant, font.weight, font.stretch, `${font.size * unit}px`, font.family]
		.flatMap((v) => v ?? [])
		.join(' ');
