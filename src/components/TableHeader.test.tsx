import { render, screen, fireEvent } from '@testing-library/react';
import { TableHeader } from './TableHeader';
function SurroundWithTable(props: { children: React.ReactNode }) {
  return (
    <table>
      <thead>
        <tr>{props.children}</tr>
      </thead>
    </table>
  );
}
describe('TableHeader', () => {
  it('should call onClick when button is clicked', () => {
    const onClickMock = jest.fn();
    render(
      <SurroundWithTable>
        <TableHeader label="Header" onClick={onClickMock} />
      </SurroundWithTable>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('renders table header correctly with minimal props provided', () => {
    const props = { label: 'Header 1' };
    render(
      <SurroundWithTable>
        <TableHeader {...props} />
      </SurroundWithTable>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(props.label);
    expect(button).not.toBeDisabled();
  });

  test('renders table header correctly with sort props provided', () => {
    const props = { label: 'Header 2', sortIndicator: 'UP' };
    render(
      <SurroundWithTable>
        <TableHeader {...props} />
      </SurroundWithTable>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(props.label);
    expect(screen.getByText(props.sortIndicator)).toBeInTheDocument();
  });

  test('renders with a disabled button', () => {
    const props = { label: 'Header 3', disabled: true };
    render(
      <SurroundWithTable>
        <TableHeader {...props} />
      </SurroundWithTable>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(props.label);
    expect(button).toBeDisabled();
  });
});
