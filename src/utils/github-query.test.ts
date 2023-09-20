import { GithubQueryBuilder } from './github-query';

describe('GithubQueryBuilder', () => {
  let queryBuilder: GithubQueryBuilder;

  beforeEach(() => {
    queryBuilder = new GithubQueryBuilder();
  });

  describe('withUsername', () => {
    it('should add "user" qualifier to qualifiers when username is provided', () => {
      queryBuilder.withUsername('test_username');

      expect(queryBuilder.toQuerySring()).toContain(encodeURIComponent('user:test_username'));
    });

    it('should not add "user" qualifier to qualifiers when username is not provided', () => {
      queryBuilder.withUsername('');
      expect(queryBuilder.toQuerySring()).not.toContain('user');
    });
  });

  describe('withOrganization', () => {
    it('should add "org" qualifier to qualifiers when organization is provided', () => {
      queryBuilder.withOrganization('some_org');

      expect(queryBuilder.toQuerySring()).toContain(encodeURIComponent('org:some_org'));
    });

    it('should not add "org" qualifier to qualifiers when organization is not provided', () => {
      queryBuilder.withOrganization('');

      expect(queryBuilder.toQuerySring()).not.toContain('org');
    });
  });

  describe('withSearchTerm', () => {
    it('should add search term to search terms when search term is provided', () => {
      queryBuilder.withSearchTerm('some_search_term');

      expect(queryBuilder.toQuerySring()).toContain(encodeURIComponent('some_search_term'));
    });

    it('should not add search term to search terms when search term is not provided', () => {
      queryBuilder.withSearchTerm('');

      expect(queryBuilder.toQuerySring()).not.toContain('some_search_term');
    });
  });
});
