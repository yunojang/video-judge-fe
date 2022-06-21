import { useEffect, useState } from 'react';
import { Channel } from 'src/model/channel';
import Client from 'src/utils/connection';

export const useChannel = (id: number) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [channel, setChannel] = useState<Channel>();
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

  // const updateBox = () => {};

  return {
    channel,
    error,
    loading,
  };
};
