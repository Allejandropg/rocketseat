/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Loading,
  Owner,
  IssueList,
  FilterList,
  ButtonsNavigate,
} from './styles';
import Container from '../../components/container';

export default class Repository extends Component {
  // eslint-disable-next-line react/sort-comp
  static proTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    page: 0,
    limit: -1,
    filters: [
      { value: 'all', label: 'Todas', status: true },
      { value: 'open', label: 'Abertas', status: false },
      { value: 'closed', label: 'Fechadas', status: false },
    ],
    filter: 0,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { page, filters, filter } = this.state;
    const perPage = 5;
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues, total] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filters[filter].value,
          per_page: perPage,
          page,
        },
      }),
      api.get(`/repos/${repoName}/issues`),
    ]);
    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
      limit: Math.round(total.data.length / perPage),
    });
  }

  async ladingRepository() {
    const { match } = this.props;
    const { page, filters, filter } = this.state;
    const perPage = 5;
    const repoName = decodeURIComponent(match.params.repository);

    const [issues] = await Promise.all([
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filters[filter].value,
          per_page: perPage,
          page,
        },
      }),
    ]);
    this.setState({
      issues: issues.data,
    });
  }

  handlePaginationa(mov) {
    const { page } = this.state;
    this.setState({ page: page + mov });
    this.ladingRepository();
  }

  render() {
    const { repository, issues, loading, page, limit, filters, filter } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueList>
          <FilterList status={filter}>
            {issues.map(btn => (<button key={btn.value}>{btn.label}<button>))}
          </FilterList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {issue.title}
                  </a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <ButtonsNavigate>
          <button
            type="button"
            disabled={page < 2}
            onClick={() => {
              this.handlePaginationa(-1);
            }}
          >
            prev
          </button>
          <span>Paginá Atual {page}</span>
          <button
            type="button"
            disabled={page >= limit}
            onClick={() => {
              this.handlePaginationa(1);
            }}
          >
            next
          </button>
        </ButtonsNavigate>
      </Container>
    );
  }
}
