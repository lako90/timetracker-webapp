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

  render() {
    const { id, checks } = this.props;

    const checkInAm = moment(this.prepareToMoment(checks[0]), dateParseFormat);
    const checkOutAm = moment(this.prepareToMoment(checks[1]), dateParseFormat);
    const checkInPm = moment(this.prepareToMoment(checks[2]), dateParseFormat);
    const checkOutPm = moment(this.prepareToMoment(checks[3]), dateParseFormat);

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
