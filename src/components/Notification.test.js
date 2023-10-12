import React from 'react';
import { createRoot } from 'react-dom/client';
import {  unmountComponentAtNode } from 'react-dom';

import { act } from '@testing-library/react';
import Notification from './Notification';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

it('renders without crashing', () => {
  act(() => {
    const root = createRoot(container);
    root.render(
      <Notification
        event="goal"
        metadata={{
          player: 'Player Name',
          distanceOfShot: 10,
          newScore: { home: 1, away: 0 },
        }}
        eventTime={0}
        currentTime={0}
        onClose={() => {}}
      />,

    );
    root.unmount();

  });
});

