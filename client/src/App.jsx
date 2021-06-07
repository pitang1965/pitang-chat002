import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './components/Chat';
import { Layout } from './components/Layout';

const App = () => {
  return (
    <Layout>
      <Chat />
    </Layout>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
