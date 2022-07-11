import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Channel } from 'src/model/channel';
import { useChannel } from './hooks';
import { useListResource } from '../hooks';

import Loading from 'src/components/Loading';
import ErrorMsg from 'src/components/ErrorMsg';
import UpdatePage from './components/UpdatePage';

// handling new Channel & update Channel
const ChannelUpdate = () => {
  const { id } = useParams();

  const { pushItem: addChannel, error: listError } = useListResource<Channel>({
    resource: 'channels',
  });
  const {
    channel,
    error: channelError,
    loading,
    putChannel,
  } = useChannel({ id: Number(id) });

  const error = useMemo(() => {
    if (id && channelError) {
      return '[Error] Incorect channel id';
    } else if (listError) {
      return '[Error] Channel list error';
    }

    return null;
  }, [id, listError, channelError]);

  const isNew = useMemo(() => !id || !channel, [id, channel]);

  return error ? (
    <ErrorMsg msg={error} />
  ) : loading ? (
    <Loading />
  ) : (
    <UpdatePage
      isNew={isNew}
      channel={channel}
      onSubmit={isNew ? addChannel : putChannel}
    />
  );
};

export default ChannelUpdate;
