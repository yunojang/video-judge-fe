import { Tab, Tabs } from '@wizrnd/nx-ui';
import { AreaObject } from 'src/model/channel';

interface AreaTabProps {
  area: AreaObject[];
  selected: number;
  handleChange: (selected: number) => void;
}

const AreaSettingTab = ({ area, selected, handleChange }: AreaTabProps) => {
  return (
    <Tabs value={selected} handleChange={(e, v) => handleChange(v)}>
      <Tab id={area.length} label="All" />
      {area.map((item, i) => (
        <Tab key={i} id={i} label={`Area${i + 1}`} />
      ))}
    </Tabs>
  );
};

export default AreaSettingTab;
