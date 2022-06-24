import { useCallback, useEffect, useState } from 'react';
import { ListType } from 'src/types';
import Client from 'src/utils/connection';

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

export const useList = <T extends ListType>(
  resource: string,
  handleErrorMsg: (msg: string) => void = handleErrorDefault,
) => {
  const [loading, setLoading] = useState(false);
  const [collection, setCollection] = useState<T[] | null>(null);
  // const [result, setResult] = useState(true);

  const postList = (body: Partial<T>) => {
    setLoading(true);

    return Client.post({ endPoint: `${resource}`, body: JSON.stringify(body) })
      .then(({ json }) => json)
      .catch(err => {
        handleErrorMsg(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchList = () => {
    setLoading(true);

    return Client.get({ endPoint: `${resource}` })
      .then(({ json }) => {
        setCollection(json as T[]);
      })
      .catch(err => {
        handleErrorMsg(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    collection,
    postList,
    fetchList,
    reload: fetchList,
  };
};
