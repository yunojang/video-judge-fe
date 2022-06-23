import { Coordinate } from './types';

import { getResolution, WidthProps, HeightProps } from './utils/screen';
import { getAlphaColor } from './utils/color';

export interface Rect {
  start: Coordinate;
  end: Coordinate;
}

export type Shape = Rect | Coordinate[];

export interface Area {
  name: string;
  color: string;
  fillAlpha: number;
  shapes: Shape[];
}

interface CanvasProps {
  width?: number;
  height?: number;
  // model Area type으로 바꿀수있음
  areas?: Area[];
}

export class Canvas {
  width: number;
  height: number;
  areas: Area[];

  constructor({ width, height, areas = [] }: CanvasProps) {
    this.areas = areas;

    if (!width && !height) {
      width = 640;
    }

    const { width: w, height: h } = getResolution({ width, height } as
      | WidthProps
      | HeightProps);

    this.width = w;
    this.height = h;
  }

  static getRectSize = (start: Coordinate, end: Coordinate) => {
    const { x: sx, y: sy } = start;
    const { x: ex, y: ey } = end;

    return {
      width: ex - sx,
      height: ey - sy,
    };
  };

  clear(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.width, this.height);
  }

  drawArea(ctx: CanvasRenderingContext2D, areaIdx: number) {
    const { color, fillAlpha, shapes } = this.areas[areaIdx];

    ctx.strokeStyle = color;
    ctx.fillStyle = getAlphaColor(color, fillAlpha);

    shapes.map(shape => {
      if (isRect(shape)) {
        const { x, y } = shape.start;
        const { width, height } = Canvas.getRectSize(shape.start, shape.end);

        ctx.strokeRect(x, y, width, height);
        ctx.fillRect(x, y, width, height);
      } else {
        // draw poly
        ctx.beginPath();
        shape.forEach(({ x, y }) => ctx.lineTo(x, y));
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
      }
    });
  }
}

const isRect = (shape: Shape): shape is Rect => {
  return 'start' in shape && 'end' in shape;
};
