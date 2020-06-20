import React, { useEffect } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

import { ProductProvider } from './state/context';
import './styles/index.scss';

const LoadableHome = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */ './domain/home/Home'),
  loading: () => <div>Loading...</div>
});

const LoadableAbout = Loadable({
  loader: () => import(/* webpackChunkName: 'about' */ './domain/about/About'),
  loading: () => <div>Loading...</div>
});

const LoadableProducts = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'product' */ './domain/product/Product'),
  loading: () => <div>Loading...</div>
});

const App = props => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ssrData) {
      delete window.ssrData;
    }
  });
  const { data } = props;
  return (
    <div className="app">
      <nav aria-label="main navigation">
        <NavLink exact to="/" activeClassName="active">
          Home
        </NavLink>
        <NavLink exact to="/about" activeClassName="active">
          About
        </NavLink>
        <NavLink exact to="/product" activeClassName="active">
          Product
        </NavLink>
      </nav>
      <main className="main">
        <Switch>
          <Route exact path="/" component={LoadableHome} />
          <Route path="/about" component={LoadableAbout} />
          <ProductProvider ssrData={data}>
            <Route path="/product" component={LoadableProducts} />
          </ProductProvider>
        </Switch>
      </main>
      <footer />
    </div>
  );
};

App.contextTypes = {
  data: PropTypes.array
};

export default App;
