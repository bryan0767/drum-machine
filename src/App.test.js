import React from 'react';
import ReactDOM from 'react-dom';
import Drum from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Drum />, div);
  ReactDOM.unmountComponentAtNode(div);
});
