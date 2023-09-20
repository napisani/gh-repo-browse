import { render, screen, fireEvent } from '@testing-library/react';
import { SearchForm } from './SearchForm';

describe('SearchForm', () => {
  it('renders the SearchForm component', () => {
    render(<SearchForm onSearch={() => {}} />);

    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Organization:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('triggers onSearch with the correct org and user values when Search button is clicked', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);

    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'test user' } });
    fireEvent.change(screen.getByLabelText('Organization:'), { target: { value: 'test org' } });
    fireEvent.change(screen.getByLabelText('Filter:'), { target: { value: 'test filter' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(mockOnSearch).toHaveBeenCalledWith('test org', 'test user', 'test filter');
  });

  it('clears the input values when Clear button is clicked', () => {
    render(<SearchForm onSearch={() => {}} />);

    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'test user' } });
    fireEvent.change(screen.getByLabelText('Organization:'), { target: { value: 'test org' } });
    fireEvent.change(screen.getByLabelText('Filter:'), { target: { value: 'test filter' } });

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));

    expect(screen.getByLabelText('Username:')).toHaveValue('');
    expect(screen.getByLabelText('Organization:')).toHaveValue('');
    expect(screen.getByLabelText('Filter:')).toHaveValue('');
  });
});
