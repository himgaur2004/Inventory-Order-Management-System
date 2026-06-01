import { render, screen } from '@testing-library/react';
import StatCard from '../StatCard';
import { Package } from 'lucide-react';

describe('StatCard', () => {
  it('renders label and value', () => {
    render(<StatCard icon={Package} label='Total Products' value={42} color='blue' />);
    expect(screen.getByText('Total Products')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('adds urgent ring when urgent prop is true', () => {
    const { container } = render(
      <StatCard icon={Package} label='Low Stock' value={3} color='orange' urgent />
    );
    expect(container.firstChild).toHaveClass('ring-2');
  });
});
