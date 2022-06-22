import { useMemo, useState } from 'react';
import { css, Global } from '@emotion/react';

import { Area, AreaData } from 'src/model/channel';
import { Canvas } from 'src/views/canvas/CanvasClass';
import { Box } from 'src/views/canvas/types';

import CanvasRenderer from 'src/views/canvas/CanvasRenderer';
import EditBar from './components/EditBar';

interface AreaEditorProps {
  parentId: number;
  area: Area[];
  selected: number;
  handleDrawArea: (area: AreaData) => void;
}

const AreaEditor = ({
  // parentId,
  area,
  selected,
  handleDrawArea,
}: AreaEditorProps) => {
  const [editMode, setEditMode] = useState(false);

  const canvas = useMemo(() => {
    const boxes = area.map(item => new Box(item));

    return new Canvas({ boxes, width: 960 });
  }, [area]);

  const toggleMode = () => setEditMode(b => !b);

  return (
    <div className="editor-container">
      <Style />
      <EditBar editMode={editMode} toggleMode={toggleMode} />
      <CanvasRenderer
        canvas={canvas}
        editMode={editMode}
        selected={selected}
        toggleMode={toggleMode}
        handleDrawArea={handleDrawArea}
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
