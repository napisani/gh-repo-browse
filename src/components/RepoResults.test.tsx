import { render, fireEvent, screen } from '@testing-library/react';
import { getMockResponse } from '../mock/github-repos';
import { RepoResults, RepoResultsProps } from './RepoResults';

describe('RepoResults', () => {
  const onSortMock = jest.fn();

  const defaultProps: RepoResultsProps = {
    response: getMockResponse(),
    onSort: onSortMock,
    sortKey: 'stars',
    direction: 'asc'
  };

  it('renders table headers correctly', () => {
    render(<RepoResults {...defaultProps} />);

    expect(screen.getByText('Repo Name')).toBeInTheDocument();
    expect(screen.getByText('Repo Description')).toBeInTheDocument();
    expect(screen.getByText('Repo URL')).toBeInTheDocument();
    expect(screen.getByText('Repo Owner')).toBeInTheDocument();
    expect(screen.getByText('Stars')).toBeInTheDocument();
    expect(screen.getByText('Forks')).toBeInTheDocument();
  });

  it('renders response repositories in each row correctly', () => {
    render(<RepoResults {...defaultProps} />);
    for (const item of defaultProps.response.items) {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
      expect(screen.getByText(item.html_url)).toBeInTheDocument();
      expect(screen.getByText(item.owner.login)).toBeInTheDocument();
      expect(screen.getByText(item.stargazers_count.toString())).toBeInTheDocument();
      expect(screen.getByText(item.forks.toString())).toBeInTheDocument();
    }
  });

  it('calls onSort function when clicking on table headers', () => {
    render(<RepoResults {...defaultProps} />);

    fireEvent.click(screen.getByText('Stars'));
    expect(onSortMock).toHaveBeenCalledWith('stars');

    fireEvent.click(screen.getByText('Forks'));
    expect(onSortMock).toHaveBeenCalledWith('forks');
  });

  it('displays sort indicators correctly', () => {
    render(<RepoResults {...defaultProps} sortKey="stars" direction="asc" />);
    expect(screen.getByText('⬆️')).toBeInTheDocument();

    render(<RepoResults {...defaultProps} sortKey="stars" direction="desc" />);
    expect(screen.getByText('⬇️')).toBeInTheDocument();
  });
});
