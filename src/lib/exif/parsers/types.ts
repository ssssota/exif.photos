export type Parser = {
	key: string;
	parse: (value: unknown) => string | undefined;
};
