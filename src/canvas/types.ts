export interface DrawCoordinate {
  x: number;
  y: number;
}

export type Coordinate = [number, number];

export const isCoordinate = (arr: number[]): arr is Coordinate => {
  return arr.length === 2 && !arr.some(elem => typeof elem !== 'number');
};
