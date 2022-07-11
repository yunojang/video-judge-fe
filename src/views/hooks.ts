import { useCallback, useEffect, useMemo, useState } from 'react';

import Client from 'src/utils/connection';
import { ListType } from 'src/model/types';
import { RequestBase } from 'src/utils/connection/types';

const handleErrorDefault = (msg: string) => {
  throw new Error(msg);
};

// immediately fetch
export const useFetchList = <T extends ListType>(
  resource: string,
  handleErrorMsg: (msg: string) => void = handleErrorDefault,
) => {
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState<T[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    () =>
      Client.get({ endPoint: `${resource}` })
        .then(({ json }) => {
          setCollection(json as T[]);
        })
        .catch(err => {
          setError('Failed to Fetch List');
          handleErrorMsg(err);
        })
        .finally(() => {
          setLoading(false);
        }),
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
  const [error, setError] = useState<string | null>(null);

  const endPoint = useMemo(() => `/${resource}`, [resource]);

  const request = (options?: RequestBase) => {
    setLoading(true);
    return Client.request({ endPoint, ...options })
      .then(({ json }) => {
        setCollection(json as T[]);
      })
      .catch(err => {
        setError(err);
        handleErrorMsg(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const pushItem = (newItem: Partial<T>) => {
    const body = JSON.stringify(newItem);

    request({ method: 'POST', body });
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
