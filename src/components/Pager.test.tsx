import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Pager, PagerProps } from './Pager';

describe('Pager', () => {
  const handlePageChangeMock = jest.fn();
  const handleRowsPerPageChangeMock = jest.fn();

  const props: PagerProps = {
    page: 2,
    perPage: 10,
    totalItems: 100,
    onPageChange: handlePageChangeMock,
    onRowsPerPageChange: handleRowsPerPageChangeMock
  };

  it('renders the previous button correctly', async () => {
    render(<Pager {...props} />);
    const previousButton = screen.getByText('Previous');
    fireEvent.click(previousButton);
    expect(handlePageChangeMock).toHaveBeenCalledWith(1);
  });

  it('renders the next button correctly', () => {
    render(<Pager {...props} />);
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(handlePageChangeMock).toHaveBeenCalledWith(3);
  });

  it('renders the select input correctly', () => {
    render(<Pager {...props} />);
    const selectInput = screen.getByLabelText('Rows:');
    fireEvent.change(selectInput, { target: { value: '25' } });
    expect(handleRowsPerPageChangeMock).toHaveBeenCalledWith(25);
  });

  it('renders the page number correctly', () => {
    render(<Pager {...props} />);
    const pageNumber = screen.getByText('Page: 2');
    expect(pageNumber).toBeInTheDocument();
  });
});
