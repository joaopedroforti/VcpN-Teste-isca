import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import { route } from '../../vendor/tightenco/ziggy/src/js';

import '../css/app.css';

import { Toaster } from './components/ui/toaster';

const RootLayout = ({ children }) => (
  <>
    {children}
    <Toaster />
  </>
);

createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: title => `Você no próximo nível - ${title}`,
    resolve: name =>
      resolvePageComponent(
        `./pages/${name}.tsx`,
        import.meta.glob('./pages/**/*.tsx'),
      ),
    setup: ({ App, props }) => {
      global.route = (name, params, absolute) =>
        route(name, params, absolute, {
          ...page.props.ziggy,
          location: new URL(page.props.ziggy.location),
        });

      return (
        <RootLayout>
          <App {...props} />
        </RootLayout>
      );
    },
  }),
);
