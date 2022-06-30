import { all_index } from '../type';

import { Tab, Tabs } from '@wizrnd/nx-ui';
import { AreaObject } from 'src/model/channel';

interface AreaTabProps {
  parentId: number;
  areas: AreaObject[];
  selected: number;
  handleChange: (selected: number) => void;
}

const AreaTab = ({ areas, selected, handleChange }: AreaTabProps) => {
  return (
    <Tabs value={selected} handleChange={(e, v) => handleChange(v)}>
      <Tab id={all_index} label="All" />
      {areas.map((item, i) => (
        <Tab key={i} id={i} label={item.name} />
      ))}
    </Tabs>
  );
};

export default AreaTab;
