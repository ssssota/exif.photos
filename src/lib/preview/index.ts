import { fontToString } from './font';
import type { Layout, Text } from './layout';
import { calculateMargin, type Margin } from './layout/margin';

export class Preview {
	private image: HTMLImageElement | undefined;
	constructor(private readonly ctx: CanvasRenderingContext2D) {}

	public get width(): number {
		return this.ctx.canvas.width;
	}
	private set width(value: number) {
		this.ctx.canvas.width = value;
	}
	public get height(): number {
		return this.ctx.canvas.height;
	}
	private set height(value: number) {
		this.ctx.canvas.height = value;
	}

	public async load(file: File): Promise<void> {
		this.image = await new Promise((resolve, reject) => {
			const image = new Image();
			image.onload = () => resolve(image);
			image.onerror = reject;
			image.src = URL.createObjectURL(file);
		});
	}

	public draw(layout: Layout = [{ type: 'image' }]) {
		if (!this.image) throw new Error('Image not loaded');
		const unit = Math.min(this.image.width, this.image.height) / 100;
		const margin = calculateMargin(layout, unit);
		this.width = this.image.width + margin.left + margin.right;
		this.height = this.image.height + margin.top + margin.bottom;

		for (const layer of layout) {
			switch (layer.type) {
				case 'image':
					this.ctx.drawImage(this.image, margin.left, margin.top);
					break;
				case 'background':
					this.ctx.fillStyle = layer.color;
					this.ctx.fillRect(0, 0, this.width, this.height);
					break;
				case 'text':
					this.drawText(layer, unit, margin);
					break;
			}
		}
	}

	public async toUrl(quality?: number): Promise<string> {
		return await new Promise((resolve, reject) => {
			this.ctx.canvas.toBlob(
				(blob) => {
					if (blob) resolve(URL.createObjectURL(blob));
					else reject(new Error('Failed to create blob'));
				},
				'image/jpeg',
				quality
			);
		});
	}

	private drawText(layer: Text, unit: number, margin: Margin) {
		this.ctx.save();
		try {
			const align = layer.align ?? 'left';
			const baseline = layer.baseline ?? 'alphabetic';
			const width = layer.text.reduce((acc, span) => {
				this.ctx.font = fontToString(span.font, unit);
				return acc + this.ctx.measureText(span.value).width;
			}, 0);
			let left = 0;
			switch (layer.position.x.type) {
				case 'left':
					left = margin.left + layer.position.x.offset * unit;
					break;
				case 'right':
					left = this.width - margin.right + layer.position.x.offset * unit;
					break;
				case 'center':
					left = this.width / 2 + layer.position.x.offset * unit;
					break;
			}
			switch (align) {
				case 'right':
					left -= width;
					break;
				case 'center':
					left -= width / 2;
					break;
			}
			let top = 0;
			switch (layer.position.y.type) {
				case 'top':
					top = margin.top + layer.position.y.offset * unit;
					break;
				case 'bottom':
					top = this.height - margin.bottom + layer.position.y.offset * unit;
					break;
				case 'center':
					top = this.height / 2 + layer.position.y.offset * unit;
					break;
			}
			this.ctx.textBaseline = baseline;
			for (const span of layer.text) {
				this.ctx.font = fontToString(span.font, unit);
				this.ctx.fillStyle = span.color;
				this.ctx.fillText(span.value, left, top);
				left += this.ctx.measureText(span.value).width;
			}
		} finally {
			this.ctx.restore();
		}
	}
}
