import { useState } from 'react';
import { RepoSearchInput } from './RepoSearchInput';

interface SearchFormProps {
  onSearch: (org: string, user: string, filter: string) => void | Promise<void>;
}

export function SearchForm({ onSearch = () => {} }: SearchFormProps) {
  const [org, setOrg] = useState('');
  const [user, setUser] = useState('');
  const [filter, setFilter] = useState('');
  function handleClear() {
    setOrg('');
    setUser('');
    setFilter('');
  }
  return (
    <div>
      <RepoSearchInput
        id="repo-user"
        label="Username"
        placeholder="username"
        value={user}
        tabIndex={1}
        onChange={setUser}
        disabled={false}
      />
      <RepoSearchInput
        id="repo-org"
        label="Organization"
        placeholder="organization"
        tabIndex={2}
        value={org}
        onChange={setOrg}
        disabled={false}
      />
      <RepoSearchInput
        id="filter"
        label="Filter"
        placeholder="filter"
        value={filter}
        tabIndex={3}
        onChange={setFilter}
        disabled={false}
      />
      <button
        className="rounded border-black border-2 p-4 m-2 hover:bg-blue-600"
        type="button"
        tabIndex={4}
        onClick={handleClear}>
        Clear
      </button>
      <button
        className="rounded border-black border-2 p-4 bg-blue-400 hover:bg-blue-600"
        type="button"
        tabIndex={5}
        onClick={() => {
          onSearch(org, user, filter);
        }}>
        Search
      </button>
    </div>
  );
}
