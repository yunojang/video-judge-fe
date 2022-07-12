import { Coordinate, isCoordinate } from './types';

import { getResolution, WidthProps, HeightProps } from './utils/screen';
import { getAlphaColor } from './utils/color';
import { AreaObject, isRect } from 'src/model/channel';
import { getRoundDigit } from 'src/utils/number';

interface CanvasProps {
  width?: number;
  height?: number;
  areas?: AreaObject[];
}

export class Canvas {
  width: number;
  height: number;
  areas: AreaObject[];

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

  static getRectSize = ([sx, sy]: Coordinate, [dx, dy]: Coordinate) => {
    return {
      width: dx - sx,
      height: dy - sy,
    };
  };

  getCoordinateRatio({ x, y }: { x: number; y: number }) {
    return [
      getRoundDigit(x / this.width, 3),
      getRoundDigit(y / this.height, 3),
    ];
  }

  getRealCoordinate([rx, ry]: Coordinate): Coordinate {
    return [this.width * rx, this.height * ry];
  }

  clear(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.width, this.height);
  }

  drawArea(ctx: CanvasRenderingContext2D, areaIdx: number) {
    const { areaColor: color, alpha = 0.2, position } = this.areas[areaIdx];

    ctx.strokeStyle = color;
    ctx.fillStyle = getAlphaColor(color, alpha);

    position.map(p => {
      // position type is rect OR poly
      if (isRect(p)) {
        // p.coordinate is [number, number, number, number]
        const [r1, r2, r3, r4] = p.coordinate;

        const source = this.getRealCoordinate([r1, r2]);
        const dest = this.getRealCoordinate([r3, r4]);

        const { width, height } = Canvas.getRectSize(source, dest);
        const [x, y] = source;

        ctx.strokeRect(x, y, width, height);
        ctx.fillRect(x, y, width, height);
      } else {
        ctx.beginPath();

        let coor: number[] = [];
        p.coordinate.forEach(c => {
          coor.push(c);

          if (isCoordinate(coor)) {
            // coor is [number, number]
            ctx.lineTo(...this.getRealCoordinate(coor));
            coor = [];
          }
        });

        ctx.closePath();
        ctx.stroke();
        ctx.fill();
      }
    });
  }
}
