import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Header } from '../components';
import { routes } from './routes';
export default class AppRouter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Header />
        <Routes>
          {routes.map(({ path, element }) => (
            <Route path={path} element={element} key={path} />
          ))}
          <Route paht="*" element={<Navigate to={'/all'} replace />} />
        </Routes>
      </Router>
    );
  }
}
