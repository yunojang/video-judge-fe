import { css } from '@emotion/css';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';

interface Cor {
  x: number;
  y: number;
}

interface CanvasProps {
  width?: number;
  height?: number;
  strokeColor?: string;
}

const Canvas = ({
  width = 480,
  height = 360,
  strokeColor = '#4c4c4c',
}: CanvasProps) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>();

  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [isPainting, setPainting] = useState<boolean>(false);
  const [startPoint, setStartPoint] = useState<Cor | null>(null);

  useEffect(() => {
    context.current = canvas.current?.getContext(
      '2d',
    ) as CanvasRenderingContext2D;

    context.current.strokeStyle = strokeColor;
  }, []);

  const toggleEditMode = () => setEditMode(b => !b);

  const onClick: MouseEventHandler<HTMLCanvasElement> = e => {
    if (!isEditMode) {
      return;
    }

    const { offsetX: x, offsetY: y } = e.nativeEvent;
    const ctx = context.current as CanvasRenderingContext2D;

    if (!isPainting || !startPoint) {
      setPainting(true);
      setStartPoint({ x, y });
    } else {
      setPainting(false);
      setEditMode(false);

      const { x: sx, y: sy } = startPoint;
      ctx.strokeRect(sx, sy, x - sx, y - sy);
      ctx.fillStyle = '#4a4a4a3c';
      ctx.fillRect(sx, sy, x - sx, y - sy);
    }
  };

  const onMouseMove: MouseEventHandler<HTMLCanvasElement> = e => {
    if (!isEditMode || !isPainting || !startPoint) {
      return;
    }

    const { offsetX: x, offsetY: y } = e.nativeEvent;
    const ctx = context.current as CanvasRenderingContext2D;

    const { x: sx, y: sy } = startPoint;
    ctx.clearRect(0, 0, width, height);
    ctx.strokeRect(sx, sy, x - sx, y - sy);
  };

  const style = makeStyle({ isEditMode });
  return (
    <div>
      <button onClick={toggleEditMode} className={style.button}>
        square
      </button>
      <canvas
        onClick={onClick}
        onMouseMove={onMouseMove}
        ref={canvas}
        width={width}
        height={height}
        className={style.canvas}
      ></canvas>
    </div>
  );
};
export default Canvas;

const makeStyle = ({ isEditMode }: { isEditMode: boolean }) => {
  const canvas = css`
    background: #fff;
    border: 1px solid #aaa;
    ${isEditMode &&
    css`
      cursor: crosshair;
    `}
  `;

  const button = css`
    border: 0;
    padding: 1em;
    ${isEditMode &&
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
