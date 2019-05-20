import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Input from 'reactstrap/lib/Input';
import ListGroup from 'reactstrap/lib/ListGroup';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';

import MovieRow from '../../components/MovieRow';

import searchAction from './actions';

const tmdbImageUrl = process.env.REACT_APP_TMDB_IMAGE_URL;

const Container = styled.div`
  padding: 50px 30px;
  height: 100%;
`;

const ResultContainer = styled.div`
  margin-top: 50px;
  overflow: auto;
  max-height: calc(100% - 100px);
`;

class Search extends Component {
  static propTypes = {
    search: PropTypes.func.isRequired,
    results: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    loading: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    this.inputSearch = React.createRef();
  }

  componentDidMount() {
    this.inputSearch.current.focus();
  }

  handleSearch = () => {
    const { search } = this.props;
    const inputSearchValue = this.inputSearch.current.value;

    search(inputSearchValue);
  }

  renderList = results => (
    <ListGroup>
      {results.map(({
        id,
        title,
        release_date: releaseDate,
        poster_path: posterPath,
        vote_average: voteAverage,
        overview,
      }) => (
        <ListGroupItem
          key={id}
          style={{ padding: 10 }}
        >
          <MovieRow
            id={id}
            title={title}
            releaseDate={releaseDate}
            posterPath={posterPath ? `${tmdbImageUrl}w200${posterPath}` : undefined}
            voteAverage={voteAverage}
            overview={overview}
          />
        </ListGroupItem>
      ))}
    </ListGroup>
  )

  render() {
    const { results, loading } = this.props;

    return (
      <Container>
        <Input
          placeholder="Search a movie"
          innerRef={this.inputSearch}
          onChange={this.handleSearch}
        />
        <ResultContainer>
          {
            results
              ? this.renderList(results)
              : null
          }
          {
            loading
              ? 'searching...'
              : null
          }
        </ResultContainer>
      </Container>
    );
  }
}

const mapStateToProps = ({ searchMovies: { data, loading } }) => ({
  results: data.results || data,
  loading,
});
const mapDispatchToProps = dispatch => ({
  search: bindActionCreators(searchAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
