import React from 'react';
import Router from './utils/routes';
import "./index.css";
import { ConfigProvider } from 'antd';
// export default router;
function App() {

  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#EA1D26',
        colorPrimaryActive: '#EA1D26',
        colorPrimaryHover: '#606060'
      },
    }}
  >
    <Router />

  </ConfigProvider>
  );
}

export default App;
