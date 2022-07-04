import { useCallback, useEffect, useMemo, useState } from 'react';
import Client from 'src/utils/connection';

import {
  Channel,
  AreaObject,
  ChannelObject,
  isChannel,
  Position,
} from 'src/model/channel';
import { RequestConfig } from 'src/utils/connection/types';

const resource = 'channels';

export const useChannel = (id: number) => {
  const endPoint = useMemo(() => `${resource}/${id}`, [id]);

  const [channel, setChannel] = useState<Channel | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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

  useEffect(() => {
    requestChannel({ method: 'GET' });

    return () => {
      setError(null);
      setLoading(false);
    };
  }, [requestChannel]);

  const putChannel = useCallback(
    (newChannel: ChannelObject) => {
      if (!channel) {
        return Promise.reject('Cannot PUT Request without channel data');
      }

      const body = JSON.stringify({ ...channel, ...newChannel });

      return requestChannel({ method: 'PUT', body });
    },
    [requestChannel, channel],
  );

  // argument is connection model OR data interface convert to model from here
  const pushArea = (area?: AreaObject) => {
    if (!channel) {
      setError('Cannot put Request without channel data');
      return Promise.reject(-1);
    }

    setAreaLoading(true);

    if (!area) {
      area = new AreaObject({});
    }

    const newChannel = {
      ...channel,
      area: [...channel.area, area],
    };

    return putChannel(newChannel)
      .then(() => channel.area.length)
      .finally(() => setAreaLoading(false));
  };

  const deleteArea = (index: number) => {
    if (!channel) {
      setError('Cannot put Request without channel data');
      return false;
    }

    const newArea = [
      ...channel.area.slice(0, index),
      ...channel.area.slice(index + 1),
    ];
    const newChannel = { ...channel, area: newArea };

    putChannel(newChannel);
  };

  const setArea = (area: AreaObject, index: number) => {
    setAreaLoading(true);

    if (!channel) {
      const err = 'Cannot put Request without channel data';
      setError(err);
      return Promise.reject(false);
    }

    if (!channel.area[index]) {
      const err = 'Cannot set Area in invalid area index';
      setError(err);
      return Promise.reject(false);
    }

    const newAreas = [...channel.area];
    newAreas[index] = area;
    const newChannel = { ...channel, area: newAreas };

    return putChannel(newChannel).finally(() => setAreaLoading(false));
  };

  // shape -> position
  const pushPosition = (newPosition: Position, areaIndex: number) => {
    if (!channel) {
      setError('Cannot put Request without channel data');
      return Promise.reject(-1);
    }

    setShapeLoading(true);

    const area = channel.area[areaIndex];
    const position = [...area.position, newPosition]; // add new Shape
    const newArea: AreaObject = { ...area, position };

    setArea(newArea, areaIndex).finally(() => setShapeLoading(false));
  };

  return {
    channel,
    error,
    loading,
    areaLoading,
    shapeLoading,
    pushArea,
    setArea,
    deleteArea,
    pushPosition,
  };
};
