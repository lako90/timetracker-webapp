import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Table from 'reactstrap/lib/Table';

import Day from '../Day';

import getMonthAction from './actions';


class Month extends Component {
  componentDidMount() {
    const { name, getMonth } = this.props;

    getMonth(name);
  }

  renderDay = ({ id, checks, workDurationHour }) => {
    const { name: monthName, year, index } = this.props;

    return (
      <Day
        key={`${monthName}-${id}`}
        id={id}
        checks={checks}
        indexMonth={index}
        year={year}
        workDurationHour={workDurationHour}
      />
    );
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
