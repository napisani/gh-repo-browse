import {
  SearchRepoResponse,
  SortDirection,
  SearchRepoResponseItem,
  SortKey
} from '../utils/github-client';
import { TableHeader } from './TableHeader';

export interface RepoResultsProps {
  response: SearchRepoResponse;
  onSort?: (sortKey: SortKey) => void | Promise<void>;
  sortKey?: SortKey;
  direction?: SortDirection;
}

function getIndicator(
  expectedKey: keyof SearchRepoResponseItem,
  sortKey: SortKey | undefined,
  direction: SortDirection
): null | string {
  if (!sortKey || expectedKey !== sortKey) {
    return null;
  }
  return direction === 'asc' ? '⬆️' : '⬇️';
}

export function RepoResults({
  response,
  onSort = () => {},
  direction = 'asc',
  sortKey
}: RepoResultsProps) {
  return (
    <table className="m-4">
      <thead>
        <tr>
          <TableHeader disabled={true} label="Repo Name" />
          <TableHeader disabled={true} label="Repo Description" />
          <TableHeader disabled={true} label="Repo URL" />
          <TableHeader disabled={true} label="Repo Owner" />
          <TableHeader
            onClick={() => {
              onSort('stars');
            }}
            sortIndicator={getIndicator('stars', sortKey, direction)}
            label="Stars"
          />
          <TableHeader
            onClick={() => {
              onSort('forks');
            }}
            sortIndicator={getIndicator('forks', sortKey, direction)}
            label="Forks"
          />
        </tr>
      </thead>
      <tbody>
        {response.items.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <a className="text-blue-600 visited:text-purple-600" href={item.html_url}>
                  {item.html_url}
                </a>
              </td>
              <td>{item.owner.login}</td>
              <td>{item.stargazers_count}</td>
              <td>{item.forks}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
