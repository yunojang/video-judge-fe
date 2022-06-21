import { Button } from '@wizrnd/nx-ui';

interface EditBarProps {
  editMode: boolean;
  toggleMode: () => void;
}

const AreaEditBar = ({ toggleMode }: EditBarProps) => {
  return (
    <div>
      <Button onClick={toggleMode} iconName="SquareIcon">
        Square
      </Button>
    </div>
  );
};

export default AreaEditBar;
