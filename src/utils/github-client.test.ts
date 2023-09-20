import axios, { AxiosError } from 'axios';
import { getMockResponse } from '../mock/github-repos';
import { GithubClient, getGithubClient, githubApiBaseURL } from './github-client';

describe('GithubClient', () => {
  let githubClient: GithubClient;

  beforeEach(() => {
    githubClient = getGithubClient();
  });

  describe('searchRepositories', () => {
    it('should return the response data when the request is successful', async () => {
      const query = 'test';
      const opts = { perPage: 10 };

      const axiosGetMock = jest.spyOn(axios, 'get');
      const responseData = getMockResponse();
      axiosGetMock.mockResolvedValueOnce({ data: responseData });

      const result = await githubClient.searchRepositories(query, opts);
      expect(axiosGetMock).toHaveBeenCalledWith(
        `${githubApiBaseURL}/search/repositories?q=${query}`,
        {
          params: { per_page: opts.perPage },
          headers: { 'X-GitHub-Api-Version': '2022-11-28' }
        }
      );
      expect(result).toBe(responseData);
    });

    it('should throw an error when the request fails', async () => {
      const query = 'test';
      const opts = { perPage: 10 };

      const axiosGetMock = jest.spyOn(axios, 'get');
      const error = new Error('Request failed');
      axiosGetMock.mockRejectedValueOnce(error);

      await expect(githubClient.searchRepositories(query, opts)).rejects.toThrowError(
        new Error('Failed to search repositories: Request failed')
      );

      expect(axiosGetMock).toHaveBeenCalledWith(
        `${githubApiBaseURL}/search/repositories?q=${query}`,
        {
          params: { per_page: opts.perPage },
          headers: { 'X-GitHub-Api-Version': '2022-11-28' }
        }
      );
    });

    it('should handle Axios errors with message property', async () => {
      const query = 'test';
      const opts = { perPage: 10 };

      const axiosGetMock = jest.spyOn(axios, 'get');
      const error = { message: 'Request failed' } as AxiosError;
      axiosGetMock.mockRejectedValueOnce(error);

      await expect(githubClient.searchRepositories(query, opts)).rejects.toThrowError(
        new Error('Failed to search repositories: Request failed')
      );

      expect(axiosGetMock).toHaveBeenCalledWith(
        `${githubApiBaseURL}/search/repositories?q=${query}`,
        {
          params: { per_page: opts.perPage },
          headers: { 'X-GitHub-Api-Version': '2022-11-28' }
        }
      );
    });
  });
});
