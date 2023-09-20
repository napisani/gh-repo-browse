export class GithubQueryBuilder {
  private searchTerms: string[] = [];
  private qualifiers: string[] = [];

  withUsername(username: string): GithubQueryBuilder {
    if ((username ?? '') !== '') {
      this.qualifiers.push(`user:${username}`);
    }
    return this;
  }

  withOrganization(organization: string): GithubQueryBuilder {
    if ((organization ?? '') !== '') {
      this.qualifiers.push(`org:${organization}`);
    }
    return this;
  }

  withSearchTerm(term: string): GithubQueryBuilder {
    if ((term ?? '') !== '') {
      this.searchTerms.push(term);
    }
    return this;
  }

  toQuerySring(): string {
    const q = this.searchTerms.join(' ') + ' ' + this.qualifiers.join(' ');
    return encodeURIComponent(q.trim());
  }
}
