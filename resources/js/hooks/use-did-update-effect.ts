import { type DependencyList, type EffectCallback, useEffect } from 'react';

import { useIsFirstRender } from './use-is-first-render';

export const useDidUpdateEffect = (
  effect: EffectCallback,
  deps?: DependencyList,
) => {
  const { isFirstRender } = useIsFirstRender();

  useEffect(() => {
    if (!isFirstRender) {
      return effect();
    }
  }, deps);
};
