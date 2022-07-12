import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Channel } from 'src/model/channel';
import { useChannel } from './hooks';
import { useListResource } from '../hooks';

import Loading from 'src/components/Loading';
import ErrorMsg from 'src/components/ErrorMsg';
import UpdateContainer from './container/UpdateContainer';

const ChannelUpdate = () => {
  const { id } = useParams();

  // channel list hooks
  const { pushItem: addChannel, error: listError } = useListResource<Channel>({
    resource: 'video-stream',
  });

  // current channel hooks
  const {
    channel,
    error: channelError,
    loading,
    updateChannel,
  } = useChannel({ id });

  const error = useMemo(() => {
    if (channelError) {
      return '[Error] Fetching channel error';
    } else if (listError) {
      return '[Error] Channel list error';
    }

    return null;
  }, [listError, channelError]);

  return error ? (
    <ErrorMsg msg={error} />
  ) : loading ? (
    <Loading />
  ) : (
    <UpdateContainer
      channel={channel}
      isNew={!id}
      onSubmit={!id ? addChannel : updateChannel}
    />
  );
};

export default ChannelUpdate;
