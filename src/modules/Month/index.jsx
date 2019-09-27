import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Day from '../Day';

import getMonthAction from './actions';


class Month extends Component {
  componentDidMount() {
    const { name, getMonth } = this.props;

    getMonth(name);
  }

  renderDay = ({ id, checks }) => {
    const { name: monthName, year, index } = this.props;

    return (
      <Day
        key={`${monthName}-${id}`}
        id={id}
        checks={checks}
        indexMonth={index}
        year={year}
      />
    );
  }

  render() {
    const { days } = this.props;

    return days.map(this.renderDay);
  }
}

Month.propTypes = {
  index: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  days: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    days: PropTypes.arrayOf(PropTypes.string),
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
