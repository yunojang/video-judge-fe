import { useMemo } from 'react';
import { css, Global } from '@emotion/react';

import { Canvas } from 'src/canvas/CanvasClass';
import {
  AreaObject,
  AreaType,
  isRectCoordinate,
  Position,
} from 'src/model/channel';

import CanvasRenderer from 'src/canvas/CanvasRenderer';
import VideoPlayer from './components/VideoPlayer';
import EditBar from './components/EditBar';

interface AreaEditorProps {
  areas: AreaObject[];
  selected: number;
  shapeLoading: boolean;
  onPushPosition: (position: Position) => void;
  onClearArea: () => void;
}

const width = 900;
const editBarHeight = 40;

const AreaEditor = ({
  areas,
  selected,
  onPushPosition,
  shapeLoading,
  onClearArea,
}: AreaEditorProps) => {
  const canvas = useMemo(() => {
    return new Canvas({ areas, width });
  }, [areas]);

  const isCorrectCanvasArea = useMemo(
    () => Boolean(areas[selected]),
    [areas, selected],
  );

  const pushRect = (coordinate: number[]) => {
    const type = AreaType.Rect;

    if (isRectCoordinate(coordinate)) {
      onPushPosition({ type, coordinate });
    }
  };

  const pushPoly = (coordinate: number[]) => {
    const type = AreaType.Polygon;

    onPushPosition({ type, coordinate });
  };

  return (
    <div className="editor-container">
      <Style width={canvas.width} height={canvas.height + editBarHeight} />
      <EditBar
        show={isCorrectCanvasArea}
        height={editBarHeight}
        loading={shapeLoading}
        onClearArea={onClearArea}
      />

      <div className="viewer">
        <VideoPlayer width={canvas.width} height={canvas.height} />

        {isCorrectCanvasArea && (
          <CanvasRenderer
            canvas={canvas}
            selected={selected}
            pushRect={pushRect}
            pushPoly={pushPoly}
          />
        )}
      </div>
    </div>
  );
};

export default AreaEditor;

const Style = ({ width, height }: { width: number; height: number }) => (
  <Global
    styles={css`
      .editor-container {
        width: ${width}px;
        height: ${height}px;
        display: flex;
        flex-direction: column;
      }

      .viewer {
        position: relative;
      }
    `}
  />
);
