import Nav from '@components/Nav';
import '@styles/globals.css';
import { AppProps } from 'next/app';
import { PropsWithChildren } from 'react';

export const metaData = {
  title: 'Promptopia',
  description: 'Promptopia is a tool to create and share prompts',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <head></head>
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
