import { useFetchList } from 'src/views/hooks';
import Loading from '../Loading';
import React from 'react';
import ErrorMsg from '../ErrorMsg';
import { ListType } from 'src/model/types';

interface ListViewProps {
  resource: string;
}

const ListView = <T extends ListType>({
  resource,
  renderList,
}: ListViewProps & {
  renderList: (collection: T[] | null) => React.ReactElement;
}) => {
  const { collection, loading, error } = useFetchList<T>(resource);

  return loading ? (
    <Loading position="center" />
  ) : error ? (
    <ErrorMsg msg={error} />
  ) : (
    renderList(collection)
  );
};

export default ListView;
