import { useParams } from 'react-router-dom';

const Channel = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};

export default Channel;
