import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { ReactNode } from 'react';

import '../css/app.css';

import { Toaster } from './components/ui/toaster';

const RootLayout = ({ children }: { children: ReactNode }) => (
  <>
    {children}
    <Toaster />
  </>
);

createInertiaApp({
  title: title => `Você no próximo nível - ${title}`,
  resolve: name =>
    resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
    ),
  setup: ({ el, App, props }) => {
    if (import.meta.env.SSR) {
      hydrateRoot(el, (
        <RootLayout>
          <App {...props} />
        </RootLayout>
      ));

      return;
    }

    createRoot(el).render(
      <RootLayout>
        <App {...props} />
      </RootLayout>
    );
  },
  progress: {
    color: '#4B5563',
  },
});
