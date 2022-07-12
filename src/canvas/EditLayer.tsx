import { css } from '@emotion/css';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { EditMode } from 'src/reducer/canvas';
import { Canvas } from './CanvasClass';
import { DrawCoordinate } from './types';

interface EditLayerProps {
  editMode: EditMode;
  canvas: Canvas;
  selected: number;
  isEditing: boolean;
  addRect: (cor: DrawCoordinate) => void;
  point: DrawCoordinate[];
  onClickPoly: (cor: DrawCoordinate) => void;
}

interface Rect {
  start: DrawCoordinate;
  end: DrawCoordinate;
}

const EditLayer = ({
  editMode,
  canvas,
  isEditing,
  addRect,
  selected,
  point,
  onClickPoly,
}: EditLayerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    setContext(canvasRef.current?.getContext('2d') as CanvasRenderingContext2D);
  }, []);

  useEffect(() => {
    if (!isEditing && context) {
      canvas.clear(context);
    }
  }, [isEditing, canvas, context]);

  const drawRect = (ctx: CanvasRenderingContext2D, rect: Rect) => {
    const { x: sx, y: sy } = rect.start;
    const { x: dx, y: dy } = rect.end;

    canvas.clear(ctx);
    ctx.strokeStyle = canvas.areas[selected].areaColor;
    ctx.strokeRect(sx, sy, dx - sx, dy - sy);
  };

  const drawLine = (
    ctx: CanvasRenderingContext2D,
    points: DrawCoordinate[],
  ) => {
    canvas.clear(ctx);
    ctx.strokeStyle = canvas.areas[selected].areaColor;

    ctx.beginPath();
    points.map(p => ctx.lineTo(p.x, p.y));
    ctx.closePath();
    ctx.stroke();
  };

  const onMouseMove: MouseEventHandler<HTMLCanvasElement> = e => {
    if (!isEditing || !context) {
      return;
    }

    const { offsetX: x, offsetY: y } = e.nativeEvent;

    if (editMode === 'rect') {
      const rect = { start: point[0], end: { x, y } };
      drawRect(context, rect);
    } else if (editMode === 'poly') {
      drawLine(context, [...point, { x, y }]);
    }
  };

  const onClick: MouseEventHandler<HTMLCanvasElement> = e => {
    const { offsetX: x, offsetY: y } = e.nativeEvent;

    if (editMode === 'rect') {
      addRect({ x, y });
    } else if (editMode === 'poly') {
      onClickPoly({ x, y });
    }
  };

  const style = makeStyle(editMode, isEditing);
  return (
    <canvas
      className={style.canvas}
      onMouseMove={onMouseMove}
      onClick={onClick}
      ref={canvasRef}
      width={canvas.width}
      height={canvas.height}
    />
  );
};

export default EditLayer;

const makeStyle = (editMode: EditMode, isEditing: boolean) => {
  const canvas = css`
    position: absolute;
    inset: 0;

    ${editMode &&
    css`
      cursor: crosshair;
    `}

    z-index: ${isEditing ? '10' : '-1'};
  `;

  return {
    canvas,
  };
};
