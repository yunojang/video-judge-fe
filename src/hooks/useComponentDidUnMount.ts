import { useEffect, useState } from 'react';

const useComponentDidUnMount = (effect: () => void) => {
  const [isMount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);

    return () => {
      if (isMount) {
        effect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMount]);
};

export default useComponentDidUnMount;
