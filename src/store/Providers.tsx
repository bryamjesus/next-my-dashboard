'use client';
import { Provider } from 'react-redux';
import { store } from './';

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
};
