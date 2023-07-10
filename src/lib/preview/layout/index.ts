import type { Background } from './background';
import type { Text } from './text';

type Image = { type: 'image' };
export type Layer = Background | Text | Image;
export type Layout = Layer[];
export { Background, Text };
