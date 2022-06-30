import { css, Global } from '@emotion/react';
import { Button, Checkbox, Title1 } from '@wizrnd/nx-ui';
import { useMemo, useState } from 'react';
import { Area } from 'src/canvas/CanvasClass';

interface AreaDetailProps {
  handleDelete: () => void;
  handleChangeColor: (color: string) => void;
  area: Area;
}

const AreaDetail = ({
  area,
  handleDelete,
  handleChangeColor,
}: AreaDetailProps) => {
  const defaultColor = useMemo(() => {
    console.log('setcolor');
    return area.color;
  }, [area]);

  const [color, setColor] = useState<string>(defaultColor);

  return (
    <div className="area-detail-container">
      <Style />
      <div className="area-left">
        <Button
          onClick={handleDelete}
          color="#ff5555"
          variant="contained"
          fullWidth
        >
          Area Delete
        </Button>
        <div className="area-detail">
          <div>
            <Title1>Color</Title1>
            <input
              type="color"
              value={defaultColor}
              onChange={e => setColor(e.target.value)}
              onBlur={() => handleChangeColor(color)}
            />
          </div>
          <div>
            <Checkbox checked={area.useArea} onChange={() => {}} />
            <span>USE</span>
          </div>
        </div>
      </div>
      <div className="area-threshold"></div>
    </div>
  );
};

export default AreaDetail;

const Style = () => (
  <Global
    styles={css`
      .area-detail-container {
        display: flex;
        background: #f5f5f5;
        padding: 0.4em;
      }
      .area-left {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .area-detail {
        display: flex;
        flex-direction: column;
        gap: 8px;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 0.4em;
        width: 180px;
      }
    `}
  />
);
