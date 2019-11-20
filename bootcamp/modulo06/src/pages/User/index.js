import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Loading,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

// import { Container } from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: true,
    loadMore: false,
    page: 1,
    limit: 0,
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const response = await api.get(`/users/${user.login}/starred`);
    this.setState({ limit: Math.round(response.data.length / 10) });
    this.loadStars();
  }

  loadStars = async (page = 1) => {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const { stars } = this.state;

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page,
        limit: 10,
      },
    });
    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      page,
      loading: false,
      loadMore: false,
    });
  };

  refreshList = () => {
    this.setState({ loadMore: true, stars: [] }, this.load);
  };

  async loadMore() {
    const { page, loadMore } = this.state;
    if (loadMore) return;
    const next = page + 1;
    this.setState({ loadMore: true });
    this.loadStars(next);
  }

  render() {
    const { navigation } = this.props;
    const { stars, loading, loadMore, page, limit } = this.state;
    const user = navigation.getParam('user');
    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <Loading>
            <ActivityIndicator color="#7159C1" size={100} />
          </Loading>
        ) : (
          <Stars
            onRefresh={page <= limit && this.refreshList}
            refreshing={loadMore}
            onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
            onEndReached={() => page <= limit && this.loadMore()} // Função que carrega mais itens
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
        {/* loadMore ? <ActivityIndicator color="#7159C1" size="small" /> : null */}
      </Container>
    );
  }
}
