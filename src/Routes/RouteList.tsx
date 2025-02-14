import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import FileExplorer from '../pages/FileExplorer';
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
    <Route path="/" element={<Home />} />
    <Route path="/file-explorer" element={<FileExplorer />} />
    {/* <Route path="/" element={<Home />} /> */}
  </>
);

export default RouteList;
