import ErrorMsg from 'src/components/ErrorMsg';
import ListView from 'src/components/ListView';
import { AlertPublic } from 'src/model/alert';
import { t } from 'i18next';

const AlertList = () => {
  const render = (collection: AlertPublic[] | null) => {
    if (!collection) {
      return <ErrorMsg msg={t('No Data, Check Resource key')} />;
    }

    return <div />;
  };

  return (
    <div>
      <header>AlertList</header>
      <ListView<AlertPublic> resource="alert" renderList={render} />
    </div>
  );
};

export default AlertList;
