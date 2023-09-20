import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { RepoSearchInput, RepoSearchInputProps } from './RepoSearchInput';

function getDefaultProps(): RepoSearchInputProps {
  const mockOnChange = jest.fn();
  return {
    label: 'Label 1',
    id: 'input1',
    placeholder: 'Placeholder 1',
    value: 'Value 1',
    tabIndex: 2,
    disabled: false,
    onChange: mockOnChange
  };
}

describe('RepoSearchInput', () => {
  it('renders RepoSearchInput correctly when enabled', async () => {
    const props = getDefaultProps();
    render(<RepoSearchInput {...props} />);
    const inputElement = screen.getByLabelText('Label 1:');
    const placeholderElement = screen.getByPlaceholderText('Placeholder 1');
    expect(inputElement).toBeInTheDocument();
    expect(placeholderElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('Value 1');
    expect(inputElement).toBeEnabled();
    expect(inputElement).toHaveAttribute('tabIndex', '2');
  });

  it('renders RepoSearchInput correctly when disabled', () => {
    const props = getDefaultProps();
    props.disabled = true;
    render(<RepoSearchInput {...props} />);
    const inputElement = screen.getByLabelText('Label 1:');
    const placeholderElement = screen.getByPlaceholderText('Placeholder 1');
    expect(inputElement).toBeInTheDocument();
    expect(placeholderElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('Value 1');
    expect(inputElement).toBeDisabled();
    expect(inputElement).toHaveAttribute('tabIndex', '2');
  });

  it('renders RepoSearchInput calls onChange when the value changes', () => {
    const props = getDefaultProps();
    render(<RepoSearchInput {...props} />);
    const inputElement = screen.getByLabelText('Label 1:');
    fireEvent.change(inputElement, { target: { value: 'new value' } });
    expect(props.onChange).toHaveBeenCalledWith('new value');
  });
});
