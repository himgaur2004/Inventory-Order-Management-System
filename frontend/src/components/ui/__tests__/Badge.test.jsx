import { render, screen } from '@testing-library/react';
import Badge from '../Badge';

describe('Badge', () => {
  it('renders label text', () => {
    render(<Badge label='In Stock' color='green' />);
    expect(screen.getByText('In Stock')).toBeInTheDocument();
  });

  it('shows dot when dot prop is true', () => {
    const { container } = render(<Badge label='Test' color='green' dot />);
    const dot = container.querySelector('.h-1\\.5');
    expect(dot).toBeInTheDocument();
  });

  it('applies correct color class', () => {
    const { container } = render(<Badge label='Test' color='red' />);
    expect(container.firstChild).toHaveClass('bg-red-50');
  });
});
