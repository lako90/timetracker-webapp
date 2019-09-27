import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const timeDisplayFormat = 'H:mm';
const dateParseFormat = `YYYY-MM-DD ${timeDisplayFormat}`;

class Day extends Component {
  prepareToMoment = (time) => {
    const {
      id: day,
      indexMonth: month,
      year,
    } = this.props;

    return `${year}-${month}-${day} ${time}`;
  }

  getMoment = time => moment(this.prepareToMoment(time), dateParseFormat);

  render() {
    const { id, checks } = this.props;

    const checkInAm = this.getMoment(checks[0]);
    const checkOutAm = this.getMoment(checks[1]);
    const checkInPm = this.getMoment(checks[2]);
    const checkOutPm = this.getMoment(checks[3]);

    const minutesWorked = checkOutAm.diff(checkInAm, 'minutes') + checkOutPm.diff(checkInPm, 'minutes');

    return (
      <tr>
        <td>{id}</td>
        <td>{checkInAm.format(timeDisplayFormat)}</td>
        <td>{checkOutAm.format(timeDisplayFormat)}</td>
        <td>{checkInPm.format(timeDisplayFormat)}</td>
        <td>{checkOutPm.format(timeDisplayFormat)}</td>
        <td>{`${minutesWorked}`}</td>
      </tr>
    );
  }
}

Day.propTypes = {
  id: PropTypes.number.isRequired,
  indexMonth: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  checks: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Day;
