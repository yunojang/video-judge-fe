import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/css';

import { Canvas, Shape } from './CanvasClass';
import { Coordinate } from './types';
import { RootState } from 'src/store';

import EditLayer from './EditLayer';
import { EditMode, setEditMode } from 'src/reducer/canvas';

interface Cor {
  x: number;
  y: number;
}

interface CanvasProps {
  canvas: Canvas;
  selected: number;
  pushShape: (shape: Shape) => void;
}

const CanvasRenderer = ({ canvas, selected, pushShape }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const { editMode } = useSelector((state: RootState) => state.canvas);
  const dispatch = useDispatch();

  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [point, setPoint] = useState<Cor[]>([]);

  useEffect(() => {
    setContext(canvasRef.current?.getContext('2d') as CanvasRenderingContext2D);
  }, []);

  useEffect(() => {
    if (!context) {
      return;
    }

    canvas.clear(context);
    canvas.drawArea(context, selected);
  }, [canvas, context, selected]);

  const pushPoint = (cor: Coordinate) => {
    setPoint(p => [...p, cor]);
  };

  const drawEnd = useCallback(() => {
    setPoint([]);
    setIsDraw(false);
    dispatch(setEditMode(false));
  }, [dispatch]);

  const addRect = ({ x, y }: Coordinate) => {
    const start = point[0];

    pushShape({ start, end: { x, y } });
    drawEnd();
  };

  const addPoly = useCallback(() => {
    pushShape(point);
    drawEnd();
  }, [point, pushShape, drawEnd]);

  // hot key 분리
  useEffect(() => {
    // editmode, 기능 -> redux
    const handleKeydown = ({ key }: KeyboardEvent) => {
      if (key === 'Escape') {
        drawEnd();
      } else if (key === 'n') {
        addPoly();
      }
    };

    // key 버튼 값과, 실행 함수 매핑만 받아서 처리
    window.addEventListener('keydown', handleKeydown);

    return () => removeEventListener('keydown', handleKeydown);
  }, [addPoly, drawEnd]);

  const onClick: MouseEventHandler<HTMLCanvasElement> = e => {
    if (!editMode) {
      return;
    }

    setIsDraw(true);
    const { offsetX: x, offsetY: y } = e.nativeEvent;

    // start pointer
    setPoint([{ x, y }]);
  };

  const { width, height } = canvas;
  console.log(width, height);
  const style = makeStyle({ editMode, width, height });
  return (
    <div className={style.container}>
      <canvas
        ref={canvasRef}
        onClick={onClick}
        width={canvas.width}
        height={canvas.height}
        className={style.canvas}
      />

      <EditLayer
        editMode={editMode}
        isEditing={isDraw}
        selected={selected}
        canvas={canvas}
        point={point}
        addRect={addRect}
        onClickPoly={pushPoint}
      />
    </div>
  );
};
export default CanvasRenderer;

const makeStyle = ({
  editMode,
  width,
  height,
}: {
  editMode: EditMode;
  width: number;
  height: number;
}) => {
  const container = css`
    position: relative;
    width: ${width}px;
    height: ${height}px;
  `;

  const canvas = css`
    /* background: #fff; */
    /* border: 1px solid #aaa; */
    position: absolute;
    inset: 0;

    ${editMode &&
    css`
      cursor: crosshair;
    `}
  `;

  return {
    container,
    canvas,
  };
};
