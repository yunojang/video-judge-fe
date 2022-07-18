import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AreaObject, ChannelObject, Position } from 'src/model/channel';
import { modify, save } from 'src/reducer/channel';
import { RootState } from 'src/store';
import { all_index } from '../type';

import UpdateView from '../components/UpdateView';
import { useNavigate } from 'react-router-dom';
import { toast } from '@wizrnd/nx-ui';

interface UpdateProps {
  isNew: boolean;
  channel?: ChannelObject;
  postChannel: (channel: ChannelObject) => Promise<void>;
  putChannel: (channel: ChannelObject) => Promise<void>;
}

const UpdateContainer = ({
  isNew,
  channel: fetchedChannel,
  postChannel,
  putChannel,
}: UpdateProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hasUnSave } = useSelector((state: RootState) => state.channel);

  const [current, setCurrent] = useState<ChannelObject>(
    fetchedChannel ?? new ChannelObject({}),
  );

  useEffect(() => {
    if (!isNew && fetchedChannel) {
      setCurrent(fetchedChannel);
    }
  }, [isNew, fetchedChannel]);

  const updateCurrent = (newChannel: Partial<ChannelObject>) => {
    setCurrent(current => ({ ...current, ...newChannel }));
    dispatch(modify());
  };

  const { channelArea: area } = current;
  const [selectedArea, setSelectedArea] = useState<number>(all_index);
  const currentArea = useMemo(
    () => (selectedArea !== all_index ? area[selectedArea] : null),
    [area, selectedArea],
  );

  const changeName = (name: string) => {
    updateCurrent({ channelName: name });
  };

  const handleChangeArea = (key: number) => {
    setSelectedArea(key);
  };

  const addArea = () => {
    updateCurrent({ channelArea: [...area, new AreaObject({})] });
    setSelectedArea(area.length);
  };

  const updateArea = (areaObject: AreaObject) => {
    const channelArea = [...area];
    channelArea[selectedArea] = areaObject;

    updateCurrent({ channelArea });
  };

  const deleteArea = () => {
    if (currentArea) {
      const channelArea = [...area];
      channelArea.splice(selectedArea, 1);

      updateCurrent({ channelArea });
      setSelectedArea(selectedArea ? selectedArea - 1 : all_index);
    }
  };

  const clearAreaPosition = () => {
    if (currentArea) {
      updateArea({ ...currentArea, position: [] });
    }
  };

  const changeColor = (color: string) => {
    if (currentArea) {
      updateArea({ ...currentArea, areaColor: color });
    }
  };

  const addPosition = (pos: Position) => {
    if (currentArea) {
      const position = [...currentArea.position, pos];
      updateArea({ ...currentArea, position });
    }
  };

  const handleSubmit = () => {
    if (!hasUnSave) {
      return;
    }

    let submitPromise;
    toast.open({ message: 'Running...', duration: 1000 });

    if (isNew) {
      submitPromise = postChannel(current);
    } else {
      submitPromise = putChannel(current);
    }

    submitPromise
      .then(() => {
        toast.success({
          message: 'Success',
          description: 'Done work',
          duration: 3000,
        });
        dispatch(save());

        if (isNew) {
          setTimeout(() => navigate(-1), 300);
        }
      })
      .catch(err => {
        toast.error({
          message: 'Occurted Error',
          description: err,
          duration: 3000,
        });
      });
  };

  return (
    <UpdateView
      isNew={isNew}
      channel={{
        current,
        changeName,
        hasUnSave,
      }}
      area={{
        selected: selectedArea,
        current: currentArea,
        addPosition,
        changeColor,
        clearPosition: clearAreaPosition,
        delete: deleteArea,
      }}
      addArea={addArea}
      handleChangeArea={handleChangeArea}
      handleSubmit={handleSubmit}
    />
  );
};

export default UpdateContainer;
