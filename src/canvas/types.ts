export interface Coordinate {
  x: number;
  y: number;
}

export interface Position {
  start: Coordinate;
  end: Coordinate;
}

type FillType = 'inner' | 'outer' | false;

export interface BoxProps {
  position: Position;
  color?: string;
  fillAlpha?: number;
  fillType?: FillType;
}

export class Box {
  position: Position;
  fillAlpha: number;
  fillType: FillType;
  color: string;

  constructor({
    color = '#4c4c4c',
    fillAlpha = 0.25,
    position,
    fillType = 'inner',
  }: BoxProps) {
    this.color = color;
    this.fillAlpha = fillAlpha;
    this.position = position;
    this.fillType = fillType;
  }
}
