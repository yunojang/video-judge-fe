import { getCapital } from 'src/utils/format/string';

const makeMenuCreater =
  (logo: string, act: string) => (label: string, path: string) => ({
    path: `${path}/${act}`,
    text: getCapital(act),
    logo: logo,
    tooltip: `${getCapital(act)} ${label}`,
  });

export const makeNewMenu = makeMenuCreater('PlusIcon', 'new');
