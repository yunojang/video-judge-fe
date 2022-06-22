import { useParams } from 'react-router-dom';

import { useChannel } from './hooks';
import Loading from 'src/components/Loading';
import ChannelPage from './ChannelPage';

const Channel = () => {
  const { id } = useParams();
  const { error, loading, channel } = useChannel(Number(id));

  return error ? (
    <span>404 Error Page</span>
  ) : loading || !channel ? (
    <Loading />
  ) : (
    <ChannelPage channel={channel} />
  );
};

export default Channel;
