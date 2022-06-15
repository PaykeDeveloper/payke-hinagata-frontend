import { render, screen } from '@testing-library/react';
import Logo from '..';

test('renders Logo', () => {
  const className = 'test-class';
  render(<Logo className={className} />);
  const child = screen.getByAltText('Logo');
  expect(child).toHaveClass(className);
});
