import { useMemo } from 'react';
import { css, Global } from '@emotion/react';

import { Canvas } from 'src/canvas/CanvasClass';
import { AreaObject, AreaType, isRectCoordinate } from 'src/model/channel';

import CanvasRenderer from 'src/canvas/CanvasRenderer';
import VideoPlayer from 'src/components/VideoPlayer';
import EditBar from './EditBar';
import { AreaState } from '../type';

interface AreaEditorProps {
  list: AreaObject[];
  area: AreaState;
  videoUrl: string;
}

const width = 900;
const editBarHeight = 40;

const AreaEditor = ({
  list,
  area: { selected, addPosition, clearPosition },
  videoUrl,
}: AreaEditorProps) => {
  const canvas = useMemo(() => {
    return new Canvas({ areas: list, width });
  }, [list]);

  const isCorrectCanvasArea = useMemo(
    () => Boolean(list[selected]),
    [list, selected],
  );

  const pushRect = (coordinate: number[]) => {
    const type = AreaType.Rect;

    if (isRectCoordinate(coordinate)) {
      addPosition({ type, coordinate });
    }
  };

  const pushPoly = (coordinate: number[]) => {
    const type = AreaType.Polygon;

    addPosition({ type, coordinate });
  };

  return (
    <div className="editor-container">
      <Style width={canvas.width} height={canvas.height + editBarHeight} />
      <EditBar
        show={isCorrectCanvasArea}
        height={editBarHeight}
        onClearArea={clearPosition}
      />

      <div className="viewer">
        <VideoPlayer
          width={canvas.width}
          height={canvas.height}
          url={videoUrl}
          multipart
          position="absolute"
        />

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
