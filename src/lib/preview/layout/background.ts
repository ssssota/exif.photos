export type Background = {
	type: 'background';
	color: string;
	/** Relative top position based on image */
	top: number;
	/** Relative right position based on image */
	right: number;
	/** Relative bottom position based on image */
	bottom: number;
	/** Relative left position based on image */
	left: number;
};
