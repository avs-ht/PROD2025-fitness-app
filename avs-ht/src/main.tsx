import {
  RouterProvider,
  createHashHistory,
  createRouter
} from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

import '$/app/styles/index.scss';
import { routeTree } from './routeTree.gen';

const hashHistory = createHashHistory();
const router = createRouter({ routeTree, history: hashHistory });
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <>
    <Toaster />
    <RouterProvider router={router} />
  </>
);
