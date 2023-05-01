// Button.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import '@testing-library/jest-dom'

test('Button component', () => {
  const { getByText, queryByText } = render(<Button />);

  expect(queryByText('You clicked the button!')).toBeNull();

  fireEvent.click(getByText('Click me'));

  expect(getByText('You clicked the button!')).toBeInTheDocument();
});
