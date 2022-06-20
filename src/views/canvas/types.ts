import { getResolution, WidthProps, HeightProps } from './utils/screen';

interface CanvasProps {
  width?: number;
  height?: number;
}

export class Canvas {
  boxes: Box[];
  width: number;
  height: number;

  constructor({ width, height }: CanvasProps) {
    this.boxes = [];

    if (!(width || height)) {
      width = 640;
    }

    const { width: w, height: h } = getResolution({ width, height } as
      | WidthProps
      | HeightProps);

    this.width = w;
    this.height = h;
  }
}

interface Coordinate {
  x: number;
  y: number;
}

interface Position {
  start: Coordinate;
  end: Coordinate;
}

type FillPosition = 'inner' | 'outer' | false;

interface BoxProps {
  position?: Position;
  fillAlpha?: number;
  fillPosition?: FillPosition;
  color?: string;
}

export class Box {
  position?: Position;
  fillAlpha: number;
  fillPosition: FillPosition;
  color: string;

  constructor({
    color = '#4c4c4c',
    fillAlpha = 0.25,
    position,
    fillPosition = 'inner',
  }: BoxProps) {
    this.color = color;
    this.fillAlpha = fillAlpha;
    this.position = position;
    this.fillPosition = fillPosition;
  }
}
