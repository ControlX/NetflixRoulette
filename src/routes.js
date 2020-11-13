import NoMovieFound from './components/NoMovieFound';
import RouletteMain from './components/RouletteMain';

const routes = [
  {
    path: '/',
    exact: true,
    component: NoMovieFound
  },
  {
    path: '/film',
    exact: true,
    component: RouletteMain
  }
];

export default routes;
