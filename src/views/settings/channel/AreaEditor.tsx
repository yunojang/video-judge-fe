import { css, Global } from '@emotion/react';
import { useMemo, useState } from 'react';

import { AreaObject } from 'src/model/channel';
import { Box, Canvas } from 'src/views/canvas/types';
import CanvasRenderer from 'src/views/canvas/CanvasRenderer';
import AreaEditBar from './AreaEditBar';

interface AreaEditorProps {
  area: AreaObject[];
}

const AreaEditor = ({ area }: AreaEditorProps) => {
  const [editMode, setEditMode] = useState(false);

  const canvas = useMemo(() => {
    const boxes = area.map(item => new Box(item));

    return new Canvas({ boxes, width: 960 });
  }, [area]);

  const toggleMode = () => setEditMode(b => !b);

  return (
    <div className="editor-container">
      <Style />
      <AreaEditBar editMode={editMode} toggleMode={toggleMode} />
      <CanvasRenderer
        canvas={canvas}
        editMode={editMode}
        toggleMode={toggleMode}
      />
    </div>
  );
};

export default AreaEditor;

const Style = () => (
  <Global
    styles={css`
      .editor-container {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
    `}
  />
);
