import { getResolution, WidthProps, HeightProps } from './utils/screen';
import { Box, Position } from './types';
import { getAlphaColor } from './utils/color';

interface CanvasProps {
  width?: number;
  height?: number;
  boxes?: Box[];
}

export class Canvas {
  boxes: Box[];
  width: number;
  height: number;

  constructor({ width, height, boxes = [] }: CanvasProps) {
    this.boxes = boxes;

    if (!(width || height)) {
      width = 640;
    }

    const { width: w, height: h } = getResolution({ width, height } as
      | WidthProps
      | HeightProps);

    this.width = w;
    this.height = h;
  }

  static getBoxSize({ start, end }: Position) {
    return { width: end.x - start.x, height: end.y - start.y };
  }

  clear(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.width, this.height);
  }

  drawBox(ctx: CanvasRenderingContext2D, boxIndex: number) {
    const { color, fillAlpha, position } = this.boxes[boxIndex];
    const { width, height } = Canvas.getBoxSize(position);

    ctx.strokeStyle = color;
    ctx.fillStyle = getAlphaColor(color, fillAlpha);

    const { start } = position;
    ctx.strokeRect(start.x, start.y, width, height);
    ctx.fillRect(start.x, start.y, width, height);
  }
}
