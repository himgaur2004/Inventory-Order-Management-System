import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies primary variant by default', () => {
    const { container } = render(<Button>Test</Button>);
    expect(container.firstChild).toHaveClass('bg-brand-600');
  });

  it('applies danger variant when specified', () => {
    const { container } = render(<Button variant='danger'>Delete</Button>);
    expect(container.firstChild).toHaveClass('bg-red-600');
  });
});
