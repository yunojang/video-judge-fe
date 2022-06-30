import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/css';
import { RootState } from 'src/store';
import { EditMode, setEditMode } from 'src/reducer/canvas';

import { Canvas } from './CanvasClass';
import { DrawCoordinate } from './types';

import EditLayer from './EditLayer';

interface CanvasProps {
  canvas: Canvas;
  selected: number;
  pushRect: (c: number[]) => void;
  pushPoly: (c: number[]) => void;
}

const CanvasRenderer = ({
  canvas,
  selected,
  pushRect,
  pushPoly,
}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const { editMode } = useSelector((state: RootState) => state.canvas);
  const dispatch = useDispatch();

  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [point, setPoint] = useState<DrawCoordinate[]>([]);

  useEffect(() => {
    setContext(canvasRef.current?.getContext('2d') as CanvasRenderingContext2D);
    // setting context(ctx) in redux canvas store
  }, []);

  useEffect(() => {
    if (!context) {
      return;
    }

    canvas.clear(context);
    canvas.drawArea(context, selected);
  }, [canvas, context, selected]);

  const pushPoint = (coor: DrawCoordinate) => {
    setPoint(p => [...p, coor]);
  };

  const drawEnd = useCallback(() => {
    setPoint([]);
    setIsDraw(false);
    dispatch(setEditMode(false));
  }, [dispatch]);

  const addRect = (end: DrawCoordinate) => {
    const start = point[0];

    const coordinate = [
      ...canvas.getCoordinateRatio(start),
      ...canvas.getCoordinateRatio(end),
    ];
    pushRect(coordinate);

    drawEnd();
  };

  const addPoly = useCallback(() => {
    const coordinate: number[] = point.reduce(
      (acc, cur) => [...acc, ...canvas.getCoordinateRatio(cur)],
      [] as number[],
    );

    pushPoly(coordinate);
    drawEnd();
  }, [point, drawEnd, pushPoly, canvas]);

  // hot key 분리
  useEffect(() => {
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
    z-index: 1;

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
