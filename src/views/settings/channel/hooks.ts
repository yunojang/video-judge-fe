import { useCallback, useEffect, useState } from 'react';
import { Area, AreaData, AreaObject, Channel } from 'src/model/channel';
import Client from 'src/utils/connection';

export const useChannel = (id: number) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Client.get({ endPoint: `channels/${id}` })
      .then(({ json }) => {
        setChannel(json as Channel);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      setError(null);
      setLoading(false);
    };
  }, [id]);

  return {
    channel,
    error,
    loading,
  };
};

export const useArea = (parentId: number) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [area, setArea] = useState<Area[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Client.get({ endPoint: 'areas' })
      .then(({ json }) => {
        setArea(json.filter((item: Area) => item.parentId === parentId));
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [parentId]);

  const pushArea = useCallback(
    (newArea: AreaData) => {
      setLoading(true);

      const areaObject: AreaObject = { ...newArea, parentId };
      const body = JSON.stringify(areaObject);

      return Client.post({ endPoint: 'areas', body })
        .then(({ json }) => {
          const newAreas = [...area, json as Area];
          setArea(newAreas);

          return newAreas.length - 1;
        })
        .catch(err => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [area, parentId],
  );

  // const moveArea = (area: AreaObject) => {};

  // const deleteArea = (id: number) => {};

  return {
    area,
    loading,
    error,
    pushArea,
  };
};
