import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LinesEllipsis from 'react-lines-ellipsis';
import Media from 'reactstrap/lib/Media';

const MoreInfo = styled.div`
  font-size: .75em;
  line-height: 1.4em;
  padding: 0 10px;
`;

const Overview = styled(LinesEllipsis)`
  font-size: .8em;
`;

/**
 * A component to render movie infos in a small row
 */
class MovieRow extends Component {
  static propTypes = {
    /** TMDB movie id */
    id: PropTypes.number.isRequired,
    /** Title of the movie */
    title: PropTypes.string.isRequired,
    /** Release date of the movie */
    releaseDate: PropTypes.string.isRequired,
    /** Movie vote average */
    voteAverage: PropTypes.number.isRequired,
    /** Url of the movie poster */
    posterPath: PropTypes.string,
    /** A little disclaimer of the movie */
    overview: PropTypes.string.isRequired,
  }

  static defaultProps = {
    posterPath: 'https://via.placeholder.com/100x150',
  }

  render() {
    const {
      id,
      title,
      releaseDate,
      voteAverage,
      posterPath,
      overview,
    } = this.props;

    const visualTitle = `${title}${releaseDate && ` (${new Date(releaseDate).getFullYear()})`}`;

    return (
      <Media key={id}>
        <Media left href="#">
          <Media
            object
            src={posterPath}
            width={50}
            alt={title}
          />
        </Media>
        <Media body style={{ marginLeft: 10 }}>
          <h5>{visualTitle}</h5>
          <MoreInfo>
            <span>
              <b>{'Vote: '}</b>
              {voteAverage}
            </span>
          </MoreInfo>
          <Overview
            id={`id-${id}`}
            text={overview}
            maxLine={3}
            ellipsis="..."
            basedOn="words"
          />
        </Media>
      </Media>
    );
  }
}

export default MovieRow;
