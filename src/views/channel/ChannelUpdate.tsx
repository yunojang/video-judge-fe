import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Channel } from 'src/model/channel';
import { useChannel } from './hooks';
import { useListResource } from 'src/hooks/list';

import Loading from 'src/components/Loading';
import ErrorMsg from 'src/components/ErrorMsg';
import UpdateContainer from './container/UpdateContainer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { fetch } from 'src/reducer/dashboard';

const ChannelUpdate = () => {
  const { id } = useParams();

  // channel list hooks
  const { pushItem: postChannel, error: listError } = useListResource<Channel>({
    resource: 'channel',
  });

  // current channel hooks
  const {
    channel,
    error: channelError,
    loading: channelLoading,
    updateChannel,
  } = useChannel({ id });

  // fetch dashboard
  const {
    current: dashboards,
    error: dashboardError,
    loading: dashLoading,
  } = useSelector((state: RootState) => state.dashboard);
  const useLength = useMemo(() => dashboards.length, [dashboards]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch());
  }, [dispatch]);

  const error = useMemo(() => {
    if (channelError || listError || dashboardError) {
      return channelError ?? listError ?? dashboardError;
    }
    return null;
  }, [listError, channelError, dashboardError]);

  const loading = useMemo(
    () => dashLoading || channelLoading,
    [dashLoading, channelLoading],
  );

  const isNew = useMemo(() => !id || !channel, [id, channel]);

  return error ? (
    <ErrorMsg error={error} />
  ) : loading ? (
    <Loading />
  ) : (
    <UpdateContainer
      channel={channel}
      useLength={useLength}
      isNew={isNew}
      postChannel={postChannel}
      putChannel={updateChannel}
    />
  );
};

export default ChannelUpdate;
