import { SearchRepoResponse } from '../utils/github-client';
export function getMockResponse(): SearchRepoResponse {
  return {
    total_count: 2,
    incomplete_results: false,
    items: [
      {
        id: 1,
        node_id: 'node1',
        name: 'repo1',
        full_name: 'owner1/repo1',
        private: false,
        owner: { login: 'owner1' },
        html_url: 'https://github.com/owner1/repo1',
        description: 'Example repository 1',
        fork: false,
        url: 'https://api.github.com/repos/owner1/repo1',
        created_at: '2021-01-01T00:00:00Z',
        updated_at: '2021-01-02T00:00:00Z',
        pushed_at: '2021-01-03T00:00:00Z',
        homepage: 'https://owner1.github.io/repo1',
        size: 100,
        stargazers_count: 10,
        watchers_count: 5,
        language: 'TypeScript',
        forks_count: 2,
        open_issues_count: 3,
        master_branch: 'main',
        default_branch: 'main',
        score: 0.8,
        stars: 10,
        forks: 2
      },
      {
        id: 2,
        node_id: 'node2',
        name: 'repo2',
        full_name: 'owner2/repo2',
        private: true,
        owner: { login: 'owner2' },
        html_url: 'https://github.com/owner2/repo2',
        description: 'Example repository 2',
        fork: false,
        url: 'https://api.github.com/repos/owner2/repo2',
        created_at: '2021-02-01T00:00:00Z',
        updated_at: '2021-02-02T00:00:00Z',
        pushed_at: '2021-02-03T00:00:00Z',
        homepage: '',
        size: 200,
        stargazers_count: 5,
        watchers_count: 2,
        language: 'JavaScript',
        forks_count: 1,
        open_issues_count: 1,
        master_branch: 'main',
        default_branch: 'main',
        score: 0.6,
        stars: 5,
        forks: 1
      }
    ]
  };
}
