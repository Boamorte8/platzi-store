import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppContext from '@context/AppContext';
import Home from '@containers/Home';
import Layout from '@components/Layout';
import NotFound from '@containers/NotFound';
import useInitialState from '@hooks/useInitialState.js';

const AsyncCheckoutContainer = React.lazy(() => import('@containers/Checkout'));

const App = () => {
  const initialState = useInitialState();
  const isEmpty = initialState.products.length;

  return (
    <>
      {isEmpty > 0 ? (
        <Suspense fallback={<div>Loading...</div>}>
          <AppContext.Provider value={initialState}>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route
                    exact
                    path="/checkout"
                    element={<AsyncCheckoutContainer />}
                  />
                  <Route element={<NotFound />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </AppContext.Provider>
        </Suspense>
      ) : (
        <h1>Loading ...</h1>
      )}
    </>
  );
};

export default App;
