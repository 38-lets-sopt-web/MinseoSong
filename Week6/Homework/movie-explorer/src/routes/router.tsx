import GlobalLayout from '@app/layout/global-layout'
import { MovieDetail } from '@pages/movie-detail/movie-detail'
import { MovieList } from '@pages/movie-list/movie-list'
import { createBrowserRouter } from 'react-router-dom'
import { routePath } from './path'

export const router = createBrowserRouter([
  {
    path: routePath.HOME,
    element: <GlobalLayout />,
    children: [
      { index: true, element: <MovieList /> },
      { path: routePath.MOVIE_DETAIL, element: <MovieDetail /> },
    ],
  },
])
