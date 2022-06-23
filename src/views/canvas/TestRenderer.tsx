import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { css } from '@emotion/css';
import { Area, Canvas, Shape } from './CanvasClass';
import { Button } from '@wizrnd/nx-ui';
import { Coordinate } from './types';
import EditLayer from './EditLayer';
import { EditMode } from 'src/reducer/canvas';

interface Cor {
  x: number;
  y: number;
}

const selected_temp = 0;

const CanvasTest = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  // seperate state - 데이터 불러와서, 렌더러에 넣어주는 영역
  const [editMode, setEditMode] = useState<EditMode>(false);
  // area model type으로  // edit -> setArea area를 렌더링
  const [area, setArea] = useState<Area>({
    color: '#ffaa55',
    fillAlpha: 0.2,
    name: 'Area-1',
    shapes: [],
  });

  // add shape method (실제론 변경 요청으로)
  const pushShape = useCallback(
    (shape: Shape) => {
      setArea({ ...area, shapes: [...area.shapes, shape] });
    },
    [area],
  );

  // renderer state
  const canvas = useMemo(() => new Canvas({ areas: [area] }), [area]);
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
    canvas.drawArea(context, selected_temp);
  }, [canvas, context]);

  const pushPoint = (cor: Coordinate) => {
    setPoint(p => [...p, cor]);
  };

  const drawEnd = useCallback(() => {
    setPoint([]);
    setIsDraw(false);
    setEditMode(false);
  }, []);

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
    // editmode, 기능 -> redux로
    // const endEdit = () => setEditMode(false);

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

  const style = makeStyle({ editMode });
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
        selected={selected_temp}
        canvas={canvas}
        point={point}
        addRect={addRect}
        onClickPoly={pushPoint}
      />

      <Button onClick={() => setEditMode('rect')} iconName="SquareIcon">
        Square
      </Button>
      <Button onClick={() => setEditMode('poly')} iconName="ToolsIcon">
        Poly
      </Button>
    </div>
  );
};
export default CanvasTest;

const makeStyle = ({ editMode }: { editMode: EditMode }) => {
  const container = css`
    position: relative;
  `;

  const canvas = css`
    background: #fff;
    border: 1px solid #aaa;
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
