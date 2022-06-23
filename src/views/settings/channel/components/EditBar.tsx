import { Button } from '@wizrnd/nx-ui';
import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import Seal from 'src/components/Seal';
import { setEditMode } from 'src/reducer/canvas';

interface EditBarProps {
  loading: boolean;
  show?: boolean;
  height?: number;
}

const AreaEditBar = ({ show = false, height = 40, loading }: EditBarProps) => {
  const dispatch = useDispatch();

  const setModeRect = () => dispatch(setEditMode('rect'));
  const setModePoly = () => dispatch(setEditMode('poly'));

  const element: ReactElement = (
    <div>
      <Button iconName="SquareIcon" onClick={setModeRect}>
        Square
      </Button>
      <Button iconName="RubyIcon" onClick={setModePoly}>
        Polygon
      </Button>
    </div>
  );

  return (
    <div style={{ height }}>
      {show && (loading ? <Seal color="#aaa">{element}</Seal> : element)}
    </div>
  );
};

export default AreaEditBar;
