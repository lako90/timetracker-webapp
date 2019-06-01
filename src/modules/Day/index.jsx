import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { calculateTimeDiff } from '../../libraries/utils';

const timeDisplayFormat = 'H:mm';

class Day extends Component {
  getDate = () => {
    const {
      id: day,
      indexMonth: month,
      year,
    } = this.props;

    return `${year}-${month}-${day}`;
  }

  renderCheck = check => (
    <div key={check}>
      {moment(check, timeDisplayFormat).format(timeDisplayFormat)}
    </div>
  )

  render() {
    const {
      id,
      checks: { entrances, exits },
    } = this.props;

    if (entrances && exits) {
      const minutesWorked = calculateTimeDiff(
        entrances,
        exits,
        this.getDate(),
      );

      return (
        <tr>
          <td>{id}</td>
          <td>{entrances.map(this.renderCheck)}</td>
          <td>{exits.map(this.renderCheck)}</td>
          <td>{`${minutesWorked}`}</td>
        </tr>
      );
    }

    return null;
  }
}

Day.propTypes = {
  id: PropTypes.number.isRequired,
  indexMonth: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  checks: PropTypes.shape({
    entrances: PropTypes.arrayOf(PropTypes.string),
    exits: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Day;
