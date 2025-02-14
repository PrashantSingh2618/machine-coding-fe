import FileExplorer from '../pages/FileExplorer';
import Home from '../pages/Home';
import MatrixColoring from '../pages/MatrixColoring';

// eslint-disable-next-line import/prefer-default-export
export const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/file-explorer',
    component: FileExplorer,
  },
  {
    path: '/matrix-coloring',
    component: MatrixColoring,
  },
];
