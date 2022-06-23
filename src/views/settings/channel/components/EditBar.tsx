import { Button } from '@wizrnd/nx-ui';
import { useDispatch } from 'react-redux';
import { setEditMode } from 'src/reducer/canvas';

interface EditBarProps {
  show?: boolean;
  height?: number;
}

const AreaEditBar = ({ show = false, height = 50 }: EditBarProps) => {
  const dispatch = useDispatch();

  const setModeRect = () => dispatch(setEditMode('rect'));
  const setModePoly = () => dispatch(setEditMode('poly'));

  return (
    <div style={{ height }}>
      {show && (
        <div>
          <Button iconName="SquareIcon" onClick={setModeRect}>
            Square
          </Button>
          <Button iconName="RubyIcon" onClick={setModePoly}>
            Polygon
          </Button>
        </div>
      )}
    </div>
  );
};

export default AreaEditBar;
