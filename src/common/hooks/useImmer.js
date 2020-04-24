import { useState } from 'react';
import produce from 'immer';

export default function useImmer(initialState) {
  const [state, setState] = useState(initialState);
  const updateState = (draftUpdater) => {
    const updatedState = produce(state, draftUpdater);
    setState(updatedState);
  };
  return [state, updateState];
}
