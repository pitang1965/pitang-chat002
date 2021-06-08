import React, { useState, useEffect, useRef } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useSubscription,
  useMutation,
  gql,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import ReactTooltip from 'react-tooltip';
import Spinner from './Spinner';

const startTime = Date.now();
const showTime = (string) =>
  console.log(`${string}: ${Date.now() - startTime} [msec]`);

console.log(`window.location.href: ${window.location.href}`);
const webSocketUrl = window.location.href.includes('localhost')
  ? `ws://localhost:4000`
  : `wss://pitang1965-chat-server.herokuapp.com/`;
const graphQlUrl = window.location.href.includes('localhost')
  ? `http://localhost:4000`
  : `https://pitang1965-chat-server.herokuapp.com/`;
console.log(`Server location: ${graphQlUrl}`);

showTime('before new WebSocketLink');

const link = new WebSocketLink({
  uri: webSocketUrl,
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link,
  uri: graphQlUrl,
  cache: new InMemoryCache(),
});

const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      user
      content
    }
  }
`;

const POST_MESSAGE = gql`
  mutation ($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

const Messages = ({ user, onChage }) => {
  const { data } = useSubscription(GET_MESSAGES);

  if (!data) {
    return <Spinner />;
  } else {
    onChage();
  }

  showTime('after useSubscription()');

  return (
    <div className='flex flex-col p-10 overflow-y-scroll flex-nowrap bg-primary'>
      {data.messages.map(({ id, user: messageUser, content }) => (
        <div
          key={id}
          className={`flex pb-3 ${
            user === messageUser ? 'justify-end' : 'justify-start'
          }`}
        >
          {
            <div
              className='w-16 h-16 mr-4 text-2xl text-center border-2 border-gray-300 border-solid rounded-full leading-16'
              data-tip='そんほんす'
              data-for='user-name'
            >
              {messageUser.slice(0, 2).toUpperCase()}
            </div>
          }
          <div
            className={`${
              user === messageUser ? 'bg-green-300' : 'bg-white'
            } text-gray-800 p-2 rounded-2xl`}
            style={{ maxWidth: '40%' }}
          >
            {content}
          </div>
          <ReactTooltip id='user-name' />
        </div>
      ))}
    </div>
  );
};

const Chat = () => {
  // チャットメッセージの送信
  const [state, setState] = useState({
    user: '',
    content: '',
  });
  const [postMessage] = useMutation(POST_MESSAGE);

  const onSubmit = (e) => {
    e.preventDefault();

    if (state.content.length > 0) {
      postMessage({ variables: state });
    }
    setState({ ...state, content: '' });

    messageInput.current.focus();
  };

  // オートスクロール
  const messageInput = useRef(null);

  const autoScroll = () => {
    messageInput.current.scrollIntoView();
  };

  // テキストボックスのスタイル
  const textBoxStyle = 'm-2 py-2 px-4 border-solid border-2 rounded';

  return (
    <div
      className='grid overflow-y-hidden'
      style={{ gridTemplateRows: '1fr auto' }}
    >
      <Messages
        user={state.user}
        onChage={autoScroll}
        className='flex-shrink'
      />
      <form
        onSubmit={onSubmit}
        className='flex flex-row flex-grow-0 gap-x-2 flex-nowrap bg-primary opacity-80'
      >
        <input
          type='text'
          placeholder='ユーザー名'
          value={state.user}
          onChange={(evt) => setState({ ...state, user: evt.target.value })}
          className={textBoxStyle + ' flex-none w-32'}
        />
        <input
          id='message-input'
          type='text'
          ref={messageInput}
          placeholder='メッセージ入力'
          value={state.content}
          onChange={(evt) => setState({ ...state, content: evt.target.value })}
          className={textBoxStyle + ' flex-grow'}
        />
        <button className='flex-none px-4 py-2 m-2 font-bold text-white bg-green-500 rounded hover:bg-green-400'>
          送信
        </button>
      </form>
    </div>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);
