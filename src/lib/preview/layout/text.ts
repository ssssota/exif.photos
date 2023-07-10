import type { Font } from '../font';

export type Text = {
	type: 'text';
	position: {
		/** Relative X position based on image */
		x:
			| { type: 'left'; offset: number }
			| { type: 'right'; offset: number }
			| { type: 'center'; offset: number };
		/** Relative Y position based on image */
		y:
			| { type: 'top'; offset: number }
			| { type: 'bottom'; offset: number }
			| { type: 'center'; offset: number };
	};
	align?: CanvasRenderingContext2D['textAlign'];
	baseline?: CanvasRenderingContext2D['textBaseline'];
	text: TextSpan[];
};
export type TextSpan = {
	value: string;
	font: Font;
	color: string;
};
