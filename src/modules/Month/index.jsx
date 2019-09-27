import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import Table from 'reactstrap/lib/Table';

import Day from '../Day';

import getMonthAction from './actions';

import { calculateTimeDiff } from '../../libraries/utils';


class Month extends Component {
  delta = 0

  componentDidMount() {
    const { name, getMonth } = this.props;

    getMonth(name);
  }

  renderDay = ({ id: day, checks: { entrances, exits }, workDurationHour }) => {
    const { name: monthName, year, index: indexMonth } = this.props;

    if (entrances && exits) {
      const totalDifferance = calculateTimeDiff(
        entrances,
        exits,
        `${year}-${indexMonth}-${day}`,
      );
      const minutesWorked = moment.duration(totalDifferance, 'minutes');
      const durationHours = minutesWorked.get('hours');
      const durationMinutes = minutesWorked.get('minutes');
      const delta = totalDifferance - (workDurationHour * 60);

      this.delta += delta;

      return (
        <Day
          key={`${monthName}-${day}`}
          id={day}
          entrances={entrances}
          exits={exits}
          indexMonth={indexMonth}
          year={year}
          durationHours={durationHours}
          durationMinutes={durationMinutes}
          delta={delta}
          workDurationHour={workDurationHour}
        />
      );
    }

    return null;
  }

  render() {
    const {
      year,
      name,
      days,
    } = this.props;

    return (
      <Fragment>
        <h4>{`${name} ${year}`}</h4>

        <Table>
          <thead>
            <tr>
              <td />
              <td>{'Entrances'}</td>
              <td>{'Exits'}</td>
              <td />
            </tr>
          </thead>
          <tbody>
            {days.map(this.renderDay)}
            <tr>
              <td />
              <td />
              <td />
              <td>{this.delta}</td>
            </tr>
          </tbody>
        </Table>
      </Fragment>
    );
  }
}

Month.propTypes = {
  index: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  days: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    checks: PropTypes.arrayOf(PropTypes.object),
    workDurationHour: PropTypes.number,
  })),
  getMonth: PropTypes.func.isRequired,
};

Month.defaultProps = {
  days: [],
};

const mapStateToProps = ({ months: { data: months } }, { name }) => ({
  days: months[name] && months[name].days,
});

const mapDispatchToProps = dispatch => ({
  getMonth: bindActionCreators(getMonthAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Month);
