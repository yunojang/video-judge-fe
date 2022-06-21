import { useParams } from 'react-router-dom';

import { useChannel } from './hooks';
import Loading from 'src/components/Loading';
import ChannelPage from './ChannelPage';

const Channel = () => {
  const { id } = useParams();
  const { channel, error, loading } = useChannel(Number(id));

  return error ? (
    <span>404 Error Page</span>
  ) : loading ? (
    <Loading />
  ) : (
    <ChannelPage channel={channel} />
  );
};

export default Channel;
