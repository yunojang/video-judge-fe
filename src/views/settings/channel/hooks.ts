import { useEffect, useMemo, useState } from 'react';
import Client from 'src/utils/connection';

import { Channel, isChannel } from 'src/model/channel';
import { Area, Shape } from 'src/views/canvas/CanvasClass';
import { JsonResponse } from 'src/utils/connection/types';

const resource = 'channels';

export const useChannel = (id: number) => {
  const endPoint = useMemo(() => `${resource}/${id}`, [id]);
  const [loading, setLoading] = useState<boolean>(true);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [error, setError] = useState<string | null>(null);
  // const [LoadingArae, setLoadingArae] = useState<boolean>(false);

  const handelRequest = (promise: Promise<JsonResponse>) => {
    return promise
      .then(({ json }) => {
        if (!isChannel(json)) {
          return Promise.reject({
            error: 'Response type is not valid',
            statusText: 'Type Exception',
          });
        }

        setChannel(json);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handelRequest(Client.get({ endPoint }));

    return () => {
      setError(null);
      setLoading(false);
    };
  }, [endPoint]);

  const pushArea = (newArea?: Area) => {
    // setLoading(true);
    if (!channel) {
      setError('Can not push Area');
      return;
    }

    if (!newArea) {
      const index = channel.area.length;
      newArea = new Area({ name: `Area${index}` });
    }

    const newChannel: Channel = {
      ...channel,
      area: [...channel.area, newArea],
    };
    const body = JSON.stringify(newChannel);

    return handelRequest(Client.put({ endPoint, body }))
      .then(() => channel.area.length)
      .catch(() => null);
  };

  const pushShape = (newShape: Shape, areaIndex: number) => {
    if (!channel) {
      setError('Can not push Shape');
      return;
    }

    const newShapes = [...channel.area[areaIndex].shapes, newShape];
    const area = [...channel.area];
    area[areaIndex] = { ...area[areaIndex], shapes: newShapes };
    const newChannel = { ...channel, area: area };
    const body = JSON.stringify(newChannel);

    handelRequest(Client.put({ endPoint, body }));
  };

  return {
    channel,
    error,
    loading,
    pushArea,
    pushShape,
  };
};
