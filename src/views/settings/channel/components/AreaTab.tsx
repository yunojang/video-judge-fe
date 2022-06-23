import { all_index } from '../type';
import { Area } from 'src/canvas/CanvasClass';

import { Tab, Tabs } from '@wizrnd/nx-ui';

interface AreaTabProps {
  parentId: number;
  area: Area[];
  selected: number;
  handleChange: (selected: number) => void;
}

const AreaTab = ({ area, selected, handleChange }: AreaTabProps) => {
  // const currentArea = area[selected];

  return (
    <Tabs value={selected} handleChange={(e, v) => handleChange(v)}>
      <Tab id={all_index} label="All" />
      {area.map((item, i) => (
        <Tab key={i} id={i} label={item.name} />
      ))}
    </Tabs>
  );
};

export default AreaTab;
