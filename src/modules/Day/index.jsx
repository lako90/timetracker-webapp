import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { calculateTimeDiff, timeDisplayFormat } from '../../libraries/utils';

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
      workDurationHour,
    } = this.props;

    if (entrances && exits) {
      const totalDifferance = calculateTimeDiff(
        entrances,
        exits,
        this.getDate(),
      );
      const minutesWorked = moment.duration(totalDifferance, 'minutes');
      const durationHours = minutesWorked.get('hours');
      const durationMinutes = minutesWorked.get('minutes');

      return (
        <tr>
          <td>{id}</td>
          <td>{entrances.map(this.renderCheck)}</td>
          <td>{exits.map(this.renderCheck)}</td>
          <td>{`${durationHours}:${durationMinutes} / ${workDurationHour}:00 -> ${totalDifferance - (workDurationHour * 60)}`}</td>
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
  workDurationHour: PropTypes.number,
};

Day.defaultProps = {
  workDurationHour: 8,
};

export default Day;
