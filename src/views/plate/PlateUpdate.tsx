import { TextInput } from '@wizrnd/nx-ui';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useChannel } from '../channel/hooks';
import ErrorMsg from 'src/components/ErrorMsg';
import Loading from 'src/components/Loading';
import { ChannelObject } from 'src/model/channel';

const PlateUpdate = () => {
  const { id } = useParams();
  const { channel, error, loading } = useChannel({ id });

  const isNew = useMemo(() => !id || !channel, [id, channel]);
  const [current, setCurrent] = useState(new ChannelObject({}));

  useEffect(() => {
    if (!isNew) {
      setCurrent(channel as ChannelObject);
    }
  }, [isNew, channel]);

  const updateCurrent = (update: Partial<ChannelObject>) => {
    setCurrent({ ...current, ...update });
  };
  const handleChangeName = (v: string) => {
    updateCurrent({ channelName: v });
  };
  const handleChangeUrl = (v: string) => {
    updateCurrent({ cameraSrc: v });
  };

  return error ? (
    <ErrorMsg error={error} />
  ) : loading ? (
    <Loading />
  ) : (
    <div>
      <div>
        Name:
        <TextInput
          value={current.channelName}
          onChange={e => handleChangeName(e.target.value)}
        />
      </div>
      <div>
        url:
        <TextInput
          value={current.cameraSrc}
          onChange={e => handleChangeUrl(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PlateUpdate;
