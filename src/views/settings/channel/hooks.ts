import { useEffect, useMemo, useState } from 'react';
import Client from 'src/utils/connection';

import { Channel, isChannel } from 'src/model/channel';
import { Area, Shape } from 'src/canvas/CanvasClass';
import { JsonResponse } from 'src/utils/connection/types';

const resource = 'channels';

export const useChannel = (id: number) => {
  const endPoint = useMemo(() => `${resource}/${id}`, [id]);
  const [loading, setLoading] = useState<boolean>(true);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [areaLoading, setAreaLoading] = useState<boolean>(false);
  const [shapeLoading, setShapeLoading] = useState<boolean>(false);

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
      });
  };

  useEffect(() => {
    handelRequest(Client.get({ endPoint })).finally(() => {
      setLoading(false);
    });

    return () => {
      setError(null);
      setLoading(false);
    };
  }, [endPoint]);

  const pushArea = (newArea?: Area) => {
    setAreaLoading(true);

    if (!channel) {
      const err = 'Can not push Area';

      setError(err);
      return Promise.reject(-1);
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
      .finally(() => setAreaLoading(false));
  };

  const pushShape = (newShape: Shape, areaIndex: number) => {
    if (!channel) {
      setError('Can not push Shape');
      return;
    }

    setShapeLoading(true);

    const newShapes = [...channel.area[areaIndex].shapes, newShape];
    const area = [...channel.area];
    area[areaIndex] = { ...area[areaIndex], shapes: newShapes };
    const newChannel = { ...channel, area: area };
    const body = JSON.stringify(newChannel);

    handelRequest(Client.put({ endPoint, body })).finally(() =>
      setShapeLoading(false),
    );
  };

  return {
    channel,
    error,
    loading,
    pushArea,
    pushShape,
    areaLoading,
    shapeLoading,
  };
};
