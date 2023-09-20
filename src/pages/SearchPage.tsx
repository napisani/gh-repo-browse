import { useEffect, useState } from 'react';
import { Pager } from '../components/Pager';
import { RepoResults } from '../components/RepoResults';
import { SearchForm } from '../components/SearchForm';
import {
  getGithubClient,
  SearchRepoOptions,
  SearchRepoResponse,
  SortKey
} from '../utils/github-client';
import { GithubQueryBuilder } from '../utils/github-query';

const githubClient = getGithubClient();

export function SearchPage() {
  const [searchOpts, setSearchOpts] = useState<SearchRepoOptions>({ page: 1, perPage: 10 });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [reposResponse, setReposResponse] = useState<SearchRepoResponse | null>(null);

  async function handleSearch(org: string, user: string, filter: string) {
    const queryBuilder = new GithubQueryBuilder();
    const query = queryBuilder
      .withOrganization(org)
      .withUsername(user)
      .withSearchTerm(filter)
      .toQuerySring();
    setSearchQuery(query);
    setSearchOpts({
      ...searchOpts,
      page: 1
    });
  }

  function handleSort(sort: SortKey) {
    if (searchOpts.sort === sort) {
      setSearchOpts({
        ...searchOpts,
        sort,
        page: 1,
        order: searchOpts.order === 'asc' ? 'desc' : 'asc'
      });
    } else {
      setSearchOpts({
        ...searchOpts,
        sort,
        page: 1,
        order: 'asc'
      });
    }
  }

  function handlePageChange(page: number) {
    setSearchOpts({
      ...searchOpts,
      page
    });
  }

  function handleRowsPerPageChange(perPage: number) {
    setSearchOpts({
      ...searchOpts,
      page: 1,
      perPage
    });
  }

  useEffect(() => {
    async function fetchRepos() {
      if (searchQuery === '') {
        setReposResponse(null);
        return;
      }
      const repo = await githubClient.searchRepositories(searchQuery, searchOpts);
      setReposResponse(repo);
    }
    fetchRepos().catch(console.error);
  }, [searchQuery, searchOpts]);

  return (
    <div>
      <h1 className="text-4xl font-bold te: Int16Arrayxt-center">Search for Github Repos</h1>
      <SearchForm onSearch={handleSearch} />
      {reposResponse && (
        <RepoResults
          response={reposResponse}
          sortKey={searchOpts.sort}
          direction={searchOpts.order}
          onSort={handleSort}
        />
      )}
      <Pager
        page={searchOpts.page ?? 1}
        perPage={searchOpts.perPage ?? 10}
        totalItems={reposResponse?.total_count ?? 0}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
}
