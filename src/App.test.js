import React from 'react';
import { createRoot } from 'react-dom/client';
import {  unmountComponentAtNode } from 'react-dom';
import '@testing-library/jest-dom/extend-expect'; 

import { act } from '@testing-library/react';
import App from './App';

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
  createRoot(container).render(<App />);

});

it('renders a video player',async () => {
  const root = createRoot(container);
  root.render(<App />);
  const videoPlayer = container.querySelector('video');
  expect(videoPlayer).toBeInTheDocument();

});

