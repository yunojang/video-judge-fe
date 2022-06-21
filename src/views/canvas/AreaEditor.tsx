import { css, Global } from '@emotion/react';
import { useMemo, useState } from 'react';

import { useChannel } from '../settings/channel/hooks';
import { Box, Canvas } from './types';
import CanvasRenderer from './CanvasRenderer';
import AreaEditBar from './AreaEditBar';

const AreaEditor = () => {
  const { channel, loading, error } = useChannel(1);
  const [editMode, setEditMode] = useState(false);

  const canvas = useMemo(() => {
    if (!channel) {
      return new Canvas({});
    }

    const boxes = channel.area.map(item => new Box(item));
    return new Canvas({ boxes });
  }, [channel?.area]);

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
