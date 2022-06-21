import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/css';

import { Canvas } from './CanvasClass';

interface Cor {
  x: number;
  y: number;
}

interface CanvasProps {
  canvas: Canvas;
  selected: number;
  editMode: boolean;
  toggleMode: () => void;
  defaultStrokeColor?: string;
}

const CanvasRenderer = ({
  canvas,
  selected,
  editMode,
  toggleMode,
  defaultStrokeColor = '#4c4c4c',
}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const [isPainting, setPainting] = useState<boolean>(false);
  const [startPoint, setStartPoint] = useState<Cor | null>(null);

  useEffect(() => {
    if (!context) {
      return;
    }

    canvas.clear(context);

    // select All tab...
    if (selected >= canvas.boxes.length) {
      return;
    }

    canvas.drawBox(context, selected);
  }, [canvas, context, selected]);

  useEffect(() => {
    setContext(canvasRef.current?.getContext('2d') as CanvasRenderingContext2D);
  }, []);

  const onClick: MouseEventHandler<HTMLCanvasElement> = e => {
    if (!editMode) {
      return;
    }

    const { offsetX: x, offsetY: y } = e.nativeEvent;
    const ctx = context as CanvasRenderingContext2D;

    if (!isPainting || !startPoint) {
      setPainting(true);
      setStartPoint({ x, y });
    } else {
      setPainting(false);
      toggleMode();

      const { x: sx, y: sy } = startPoint;
      ctx.strokeStyle = defaultStrokeColor;
      ctx.strokeRect(sx, sy, x - sx, y - sy);
      ctx.fillStyle = '#4a4a4a2a';
      ctx.fillRect(sx, sy, x - sx, y - sy);
    }
  };

  const onMouseMove: MouseEventHandler<HTMLCanvasElement> = e => {
    if (!editMode || !isPainting || !startPoint) {
      return;
    }

    const { offsetX: x, offsetY: y } = e.nativeEvent;
    const ctx = context as CanvasRenderingContext2D;

    const { x: sx, y: sy } = startPoint;
    canvas.clear(ctx);
    ctx.strokeRect(sx, sy, x - sx, y - sy);
  };

  const style = makeStyle({ editMode });
  return (
    <div>
      <canvas
        ref={canvasRef}
        onClick={onClick}
        onMouseMove={onMouseMove}
        width={canvas.width}
        height={canvas.height}
        className={style.canvas}
      />
    </div>
  );
};
export default CanvasRenderer;

const makeStyle = ({ editMode }: { editMode: boolean }) => {
  const canvas = css`
    background: #fff;
    border: 1px solid #aaa;
    ${editMode &&
    css`
      cursor: crosshair;
    `}
  `;

  const button = css`
    border: 0;
    padding: 1em;
    ${editMode &&
    css`
      box-shadow: inset 0 1px 10px #555;
      background: #ccc;
    `}
  `;

  return {
    canvas,
    button,
  };
};
