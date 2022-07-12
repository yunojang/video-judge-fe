import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AreaObject, ChannelObject, Position } from 'src/model/channel';
import { RootState } from 'src/store';
import { all_index } from '../type';

import { resetChannel, updateChannel } from 'src/reducer/channel';
import UpdateView from '../components/UpdateView';

interface UpdateProps {
  isNew: boolean;
  onSubmit: (channel: ChannelObject) => void;
  channel?: ChannelObject;
}

const UpdateContainer = ({
  isNew,
  channel: fetchedChannel,
  onSubmit,
}: UpdateProps) => {
  const dispatch = useDispatch();
  const { current, hasUnSave } = useSelector(
    (state: RootState) => state.channel,
  );

  const dispatchUpdate = useCallback(
    (channel: Partial<ChannelObject>) => {
      dispatch(updateChannel(channel));
    },
    [dispatch],
  );

  useEffect(() => {
    if (isNew || !fetchedChannel) {
      dispatch(resetChannel());
    } else {
      dispatch(updateChannel(fetchedChannel, true));
    }
  }, [dispatch, dispatchUpdate, isNew, fetchedChannel]);

  const { channelArea: area } = current;
  const [selectedArea, setSelectedArea] = useState<number>(all_index);
  const currentArea = useMemo(
    () => (selectedArea !== all_index ? area[selectedArea] : null),
    [area, selectedArea],
  );

  const changeName = (name: string) => {
    dispatchUpdate({ channelName: name });
  };

  const handleChangeArea = (key: number) => {
    setSelectedArea(key);
  };

  const addArea = () => {
    dispatchUpdate({ channelArea: [...area, new AreaObject({})] });
    setSelectedArea(area.length);
  };

  const updateArea = (areaObject: AreaObject) => {
    const channelArea = [...area];
    channelArea[selectedArea] = areaObject;

    dispatchUpdate({ channelArea });
  };

  const deleteArea = () => {
    if (currentArea) {
      const channelArea = [...area];
      channelArea.splice(selectedArea, 1);

      dispatchUpdate({ channelArea });
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
      updateArea({ ...currentArea, color });
    }
  };

  const addPosition = (pos: Position) => {
    if (currentArea) {
      const position = [...currentArea.position, pos];
      updateArea({ ...currentArea, position });
    }
  };

  const handleSubmit = () => {
    if (hasUnSave) {
      onSubmit(current);
    }
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
