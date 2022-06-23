import { useMemo } from 'react';
import { css, Global } from '@emotion/react';

import { Area, Canvas, Shape } from 'src/canvas/CanvasClass';

import CanvasRenderer from 'src/canvas/CanvasRenderer';
import EditBar from './components/EditBar';

interface AreaEditorProps {
  areas: Area[];
  selected: number;
  pushShape: (shape: Shape) => void;
}

const width = 900;
const editBarHeight = 50;

const AreaEditor = ({ areas, selected, pushShape }: AreaEditorProps) => {
  const canvas = useMemo(() => {
    return new Canvas({ areas, width });
  }, [areas]);

  const isCorrectCanvasArea = useMemo(
    () => Boolean(areas[selected]),
    [areas, selected],
  );

  return (
    <div className="editor-container">
      <Style width={canvas.width} height={canvas.height + editBarHeight} />
      <EditBar show={isCorrectCanvasArea} height={editBarHeight} />

      {isCorrectCanvasArea && (
        <CanvasRenderer
          canvas={canvas}
          selected={selected}
          pushShape={pushShape}
        />
      )}
    </div>
  );
};

export default AreaEditor;

const Style = ({ width, height }: { width: number; height: number }) => (
  <Global
    styles={css`
      .editor-container {
        display: flex;
        flex-direction: column;
        gap: 4px;
        width: ${width}px;
        height: ${height}px;
      }
    `}
  />
);
