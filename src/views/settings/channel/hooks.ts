import { useCallback, useEffect, useMemo, useState } from 'react';
import Client from 'src/utils/connection';

import { Channel, ChannelData, isChannel } from 'src/model/channel';
import { Area, Shape } from 'src/canvas/CanvasClass';
import { RequestConfig } from 'src/utils/connection/types';

const resource = 'channels';

export const useChannel = (id: number) => {
  const endPoint = useMemo(() => `${resource}/${id}`, [id]);
  const [loading, setLoading] = useState<boolean>(true);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [areaLoading, setAreaLoading] = useState<boolean>(false);
  const [shapeLoading, setShapeLoading] = useState<boolean>(false);

  const requestChannel = useCallback(
    (options?: Partial<RequestConfig>) => {
      return Client.request({ endPoint, ...options })
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
        .finally(() => setLoading(false));
    },
    [endPoint],
  );

  const putChannel = useCallback(
    (newChannel?: ChannelData) => {
      const body = JSON.stringify(newChannel);

      return requestChannel({ method: 'PUT', body });
    },
    [requestChannel],
  );

  useEffect(() => {
    requestChannel({ method: 'GET' });

    return () => {
      setError(null);
      setLoading(false);
    };
  }, [requestChannel]);

  // argument is connection model OR data interface convert to model from here
  const pushArea = (newArea?: Area) => {
    setAreaLoading(true);

    if (!channel) {
      const err = 'Cannot put Request without channel data';
      setError(err);
      return Promise.reject(-1);
    }

    if (!newArea) {
      const index = channel.area.length;
      newArea = new Area({ name: `new Area` });
    }

    const newChannel: Channel = {
      ...channel,
      area: [...channel.area, newArea],
    };

    return putChannel(newChannel)
      .then(() => channel.area.length)
      .finally(() => setAreaLoading(false));
  };

  const deleteArea = (index: number) => {
    if (!channel) {
      const err = 'Cannot put Request without channel data';
      setError(err);
      return;
    }

    const newArea = channel.area.filter((a, i) => i !== index);
    const newChannel = { ...channel, area: newArea };

    putChannel(newChannel);
  };

  const pushShape = (newShape: Shape, areaIndex: number) => {
    if (!channel) {
      const err = 'Cannot put Request without channel data';
      setError(err);
      return Promise.reject(-1);
    }

    setShapeLoading(true);

    const newShapes = [...channel.area[areaIndex].shapes, newShape];
    const area = [...channel.area];
    area[areaIndex] = { ...area[areaIndex], shapes: newShapes };
    const newChannel = { ...channel, area: area };

    putChannel(newChannel).finally(() => setShapeLoading(false));
  };

  return {
    channel,
    error,
    loading,
    pushArea,
    deleteArea,
    pushShape,
    areaLoading,
    shapeLoading,
  };
};
