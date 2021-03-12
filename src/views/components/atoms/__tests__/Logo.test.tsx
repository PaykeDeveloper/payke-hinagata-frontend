import React from 'react';
import { render } from '@testing-library/react';
import Logo from '../Logo';

test('renders Logo', () => {
  const className = 'test-class';
  const { container } = render(<Logo className={className} />);
  expect(container.firstChild).toHaveClass(className);
});
