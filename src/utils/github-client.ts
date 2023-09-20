import axios, { AxiosError } from 'axios';

export const githubApiBaseURL = 'https://api.github.com';

export type SortDirection = 'asc' | 'desc';
export interface SearchRepoOptions {
  sort?: 'stars' | 'forks' | 'updated';
  order?: SortDirection;
  perPage?: number;
  page?: number;
}

export type SortKey = 'stars' | 'forks' | 'updated';

export interface SearchRepoResponseItem {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: { login: string };
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  open_issues_count: number;
  master_branch: string;
  default_branch: string;
  score: number;
  stars: number;
  forks: number;
}

export interface SearchRepoResponse {
  total_count: number;
  incomplete_results: boolean;
  items: SearchRepoResponseItem[];
}

export interface GithubClient {
  searchRepositories(query: string, opts?: SearchRepoOptions): Promise<any>;
}

function formatError(messageContext: string, error: unknown): Error {
  if ('message' in (error as AxiosError)) {
    return new Error(`${messageContext}: ${(error as AxiosError).message}`);
  }
  return new Error(`${messageContext}: ${error}`);
}

const githubClient: GithubClient = {
  searchRepositories: async (query: string, opts?: SearchRepoOptions): Promise<any> => {
    try {
      let params: { [key: string]: any } = {};
      if (opts) {
        params = { ...params, ...opts };
      }
      if (params.perPage) {
        params.per_page = params.perPage;
        delete params.perPage;
      }
      const response = await axios.get<SearchRepoResponse>(
        `${githubApiBaseURL}/search/repositories?q=${query}`,
        {
          params,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw formatError('Failed to search repositories', error);
    }
  }
};

export function getGithubClient(): GithubClient {
  return githubClient;
}
