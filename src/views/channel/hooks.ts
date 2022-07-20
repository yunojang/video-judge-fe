import { useCallback, useEffect, useMemo, useState } from 'react';
import Client from 'src/utils/connection';

import { ChannelObject, isChannel } from 'src/model/channel';
import { RequestConfig } from 'src/utils/connection/types';
import { Error } from 'src/components/ErrorMsg/types';

const resource = 'channel';

export const useChannel = ({
  id,
  defaultChannel,
}: {
  id?: string;
  defaultChannel?: ChannelObject;
}) => {
  const endPoint = useMemo(() => `/api/${resource}/${id}`, [id]);

  const [channel, setChannel] = useState<ChannelObject | null>(
    defaultChannel ?? null,
  );
  const [loading, setLoading] = useState<boolean>(!!id);
  const [error, setError] = useState<Error | null>(null);

  const requestChannel = useCallback(
    (options?: Partial<RequestConfig>) => {
      if (!id) {
        const err = { code: 400, message: 'Cannot request without id' };

        setError(err);
        return Promise.reject(err);
      }

      setLoading(true);

      return Client.request({ endPoint, ...options })
        .then(({ json }) => json)
        .catch(err => {
          setError(err);
          return Promise.reject(err);
        })
        .finally(() => setLoading(false));
    },
    [endPoint, id],
  );

  useEffect(() => {
    if (id && !defaultChannel) {
      requestChannel().then(json => {
        if (!isChannel(json)) {
          setError({ code: 400, message: `Response data is not a valid type` });
          return;
        }

        setChannel(json);
      });
    }
  }, [requestChannel, id, defaultChannel]);

  const updateChannel = useCallback(
    (newChannel: ChannelObject) => {
      const body = JSON.stringify({ ...channel, ...newChannel });

      return requestChannel({ method: 'PUT', body }).then(() =>
        setChannel(newChannel),
      );
    },
    [requestChannel, channel],
  );

  return {
    channel,
    error,
    loading,
    updateChannel,
  };
};
