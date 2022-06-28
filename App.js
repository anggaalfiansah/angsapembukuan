import React from 'react';
import {RecoilRoot} from 'recoil';
import AppNavigation from './src/navigation/AppNavigation';

const App = () => {
  return (
    <RecoilRoot>
      <AppNavigation />
    </RecoilRoot>
  );
};

export default App;
