import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';
import type { Metadata } from 'next';
import { AppProps } from 'next/app';
import { PropsWithChildren } from 'react';

export function generateMetadata(): Metadata {
  return {
    title: 'Promptopia',
    description: 'Promptopia is a tool to create and share prompts',
  };
}

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <head></head>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
