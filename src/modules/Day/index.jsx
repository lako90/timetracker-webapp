import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Input } from 'reactstrap';

import { timeDisplayFormat } from '../../libraries/utils';

class Day extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  renderCheck = type => (check, index) => {
    const id = `${type}-${index}`;

    return (
      <input
        key={id}
        name={id}
        id={id}
        value={moment(check, timeDisplayFormat).format(timeDisplayFormat)}
        onChange={this.handleInputChange}
      />
    );
  }

  render() {
    const {
      id,
      entrances,
      exits,
      durationHours,
      durationMinutes,
      delta,
      workDurationHour,
    } = this.props;

    return (
      <tr>
        <td>{id}</td>
        <td>{entrances.map(this.renderCheck('entrance'))}</td>
        <td>{exits.map(this.renderCheck('exit'))}</td>
        <td>{`${durationHours}:${durationMinutes} / ${workDurationHour}:00 -> ${delta}`}</td>
      </tr>
    );
  }
}

Day.propTypes = {
  id: PropTypes.number.isRequired,
  entrances: PropTypes.arrayOf(PropTypes.string).isRequired,
  exits: PropTypes.arrayOf(PropTypes.string).isRequired,
  durationHours: PropTypes.number.isRequired,
  durationMinutes: PropTypes.number.isRequired,
  delta: PropTypes.number.isRequired,
  workDurationHour: PropTypes.number,
};

Day.defaultProps = {
  workDurationHour: 8,
};

export default Day;
