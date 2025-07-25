import { Route } from 'react-router-dom';
import { routes } from './constants';

// define routes here

export const RouteList = (
  <>
    {routes.map((route) => (
      <Route
        key={`${route.path}`}
        path={route.path}
        element={<route.component />}
      />
    ))}
  </>
);

export default RouteList;
