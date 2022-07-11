import { Button } from '@wizrnd/nx-ui';
import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { setEditMode } from 'src/reducer/canvas';

interface EditBarProps {
  show?: boolean;
  height?: number;
  onClearArea: () => void;
}

const AreaEditBar = ({
  show = false,
  height = 40,
  onClearArea,
}: EditBarProps) => {
  const dispatch = useDispatch();

  const setModeRect = () => dispatch(setEditMode('rect'));
  const setModePoly = () => dispatch(setEditMode('poly'));

  const element: ReactElement = (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Button iconName="SquareIcon" onClick={setModeRect}>
          Square
        </Button>
        <Button iconName="RubyIcon" onClick={setModePoly}>
          Polygon
        </Button>
      </div>
      <div>
        <Button variant="contained" onClick={onClearArea}>
          Clear
        </Button>
      </div>
    </div>
  );

  return <div style={{ height }}>{show && element}</div>;
};

export default AreaEditBar;
