import { useParams } from 'react-router-dom';

import { useChannel } from './hooks';
import Loading from 'src/components/Loading';
import ChannelPage from './ChannelPage';
import ErrorMsg from 'src/components/ErrorMsg';

const Channel = () => {
  const { id } = useParams();
  const { error, loading, channel, pushArea, pushShape } = useChannel(
    Number(id),
  );

  return error ? (
    <ErrorMsg msg={error} />
  ) : loading || !channel ? (
    <Loading />
  ) : (
    <ChannelPage channel={channel} pushArea={pushArea} pushShape={pushShape} />
  );
};

export default Channel;
