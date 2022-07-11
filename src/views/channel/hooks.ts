import { useCallback, useEffect, useMemo, useState } from 'react';
import Client from 'src/utils/connection';

import { Channel, ChannelObject, isChannel } from 'src/model/channel';
import { RequestConfig } from 'src/utils/connection/types';

const RESOURCE = 'video-stream';

export const useChannel = ({
  id,
  defaultChannel,
}: {
  id?: number;
  defaultChannel?: Channel;
}) => {
  const endPoint = useMemo(() => `/api/${RESOURCE}/${id}`, [id]);

  const [channel, setChannel] = useState<Channel | undefined>(defaultChannel);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const requestChannel = useCallback(
    (options?: Partial<RequestConfig>) => {
      if (!id) {
        const err = 'Cannot PUT request without id';
        setError(err);
        return Promise.reject(err);
      }

      setLoading(true);

      return Client.request({ endPoint, ...options })
        .then(({ json }) => {
          return json;
        })
        .catch(err => {
          setError(err);
        })
        .finally(() => setLoading(false));
    },
    [endPoint, id],
  );

  useEffect(() => {
    requestChannel().then(json => {
      if (isChannel(json)) {
        setChannel(json);
      } else {
        setError('Response type is not valid');
      }
    });
  }, [requestChannel]);

  const putChannel = useCallback(
    (newChannel: ChannelObject) => {
      const body = JSON.stringify({ ...channel, ...newChannel });

      return requestChannel({ method: 'PUT', body }).then(channel => {
        if (isChannel(channel)) {
          setChannel(channel);
        } else {
          setError('Response type is not valid');
        }
      });
    },
    [requestChannel, channel],
  );

  return {
    channel,
    error,
    loading,
    putChannel,
  };
};
