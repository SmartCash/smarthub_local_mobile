import './shim'
import * as React from 'react';

import useCachedResources from './hooks/useCachedResources';

import Navigator from './navigation/Navigator';

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Navigator/>
    );
  }
}

