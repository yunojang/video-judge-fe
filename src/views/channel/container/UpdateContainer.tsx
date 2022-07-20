import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AreaObject, ChannelObject, Position } from 'src/model/channel';
import { modify, save, setPrviewUrl } from 'src/reducer/channel';
import { RootState } from 'src/store';
import { all_index } from '../type';

import UpdateView from '../components/UpdateView';
import { useNavigate } from 'react-router-dom';
import { toast } from '@wizrnd/nx-ui';

interface UpdateProps {
  isNew: boolean;
  useLength: number;
  channel: ChannelObject | null;
  postChannel: (channel: ChannelObject) => Promise<void>;
  putChannel: (channel: ChannelObject) => Promise<void>;
}

const UpdateContainer = ({
  isNew,
  useLength,
  channel: fetchedChannel,
  postChannel,
  putChannel,
}: UpdateProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hasUnSave, previewUrl } = useSelector(
    (state: RootState) => state.channel,
  );

  const [current, setCurrent] = useState<ChannelObject>(new ChannelObject({}));

  useEffect(() => {
    if (!isNew) {
      setCurrent(fetchedChannel as ChannelObject);
      dispatch(setPrviewUrl((fetchedChannel as ChannelObject).cameraSrc));
    }
  }, [isNew, fetchedChannel, dispatch]);

  const { channelArea: area } = current;
  const [selectedArea, setSelectedArea] = useState<number>(all_index);
  const currentArea = useMemo(
    () => (selectedArea !== all_index ? area[selectedArea] : null),
    [area, selectedArea],
  );

  const updateCurrent = (newChannel: Partial<ChannelObject>) => {
    setCurrent(current => ({ ...current, ...newChannel }));
    dispatch(modify());
  };

  const changeName = (name: string) => {
    updateCurrent({ channelName: name });
  };

  const toggleUseChannel = () => {
    updateCurrent({ useChannel: !current.useChannel });
  };

  const changeCameraUrl = (url: string) => {
    updateCurrent({ cameraSrc: url });
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

    if (current.useChannel) {
      if (useLength === 4) {
        toast.warning({
          message: 'Unable to modify',
          description: 'Cannot use more than 4 channels',
          duration: 3000,
        });

        return;
      }
    }

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
        console.log(err);
        toast.error({
          message: `Occurted Error: ${err.code}`,
          description: err.message,
          duration: 3000,
        });
      });
  };

  return (
    <UpdateView
      isNew={isNew}
      channel={{
        current,
        hasUnSave,
        previewUrl: previewUrl ?? '',
        changeName,
        changeCameraUrl,
        toggleUseChannel,
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
