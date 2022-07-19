import { useCallback, useEffect, useMemo, useState } from 'react';

import Client from 'src/utils/connection';
import { ListType } from 'src/model/types';
import { RequestBase } from 'src/utils/connection/types';
import { Error } from 'src/components/ErrorMsg/types';

const handleErrorDefault = (msg: string) => {
  console.error(msg);
};

// immediately fetch
export const useFetchList = <T extends ListType>(
  resource: string,
  handleErrorMsg: (msg: string) => void = handleErrorDefault,
) => {
  const [collection, setCollection] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const request = useCallback(
    () =>
      Client.get({ endPoint: `/api/${resource}` })
        .then(({ json }) => setCollection(json as T[]))
        .catch(err => {
          setError(err);
          handleErrorMsg(err);

          return Promise.reject(err);
        })
        .finally(() => setLoading(false)),
    [handleErrorMsg, resource],
  );

  useEffect(() => {
    request();

    return () => {
      setLoading(false);
      setError(null);
    };
  }, [request]);

  return { loading, collection, reload: request, error };
};

export const useListResource = <T extends ListType>({
  resource,
  initLoading = false,
  defaultCollection = [],
  handleErrorMsg = handleErrorDefault,
}: {
  resource: string;
  initLoading?: boolean;
  defaultCollection?: T[];
  handleErrorMsg?: (msg: string) => void;
}) => {
  const [loading, setLoading] = useState(initLoading);
  const [collection, setCollection] = useState<T[]>(defaultCollection);
  const [error, setError] = useState<Error | null>(null);

  const endPoint = useMemo(() => `/api/${resource}`, [resource]);

  const request = (options?: RequestBase) => {
    setLoading(true);
    return Client.request({ endPoint, ...options })
      .then(({ json }) => setCollection(json as T[]))
      .catch(err => {
        setError(err);
        handleErrorMsg(err);

        return Promise.reject(err);
      })
      .finally(() => setLoading(false));
  };

  const pushItem = (newItem: Partial<T>) => {
    const body = JSON.stringify(newItem);

    return request({ method: 'POST', body });
  };

  return {
    collection,
    loading,
    error,
    fetchData: request,
    reload: request,
    pushItem,
  };
};
