import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TabPane from 'reactstrap/lib/TabPane';
import Table from 'reactstrap/lib/Table';

import getMonthAction from './actions';


class Month extends Component {
  componentDidMount() {
    const {
      name,
      getMonth,
    } = this.props;

    getMonth(name);
  }

  renderDay = ({ id, checks }) => (
    <tr key={id}>
      <td>{id}</td>
      <td>{checks[0]}</td>
      <td>{checks[1]}</td>
      <td>{checks[2]}</td>
      <td>{checks[3]}</td>
    </tr>
  );

  render() {
    const { index, name, days } = this.props;

    return (
      <TabPane tabId={index}>
        <h4>{name}</h4>

        <Table>
          <thead>
            <tr>
              <td />
              <td>{'Check-In'}</td>
              <td>{'Check-Out'}</td>
              <td>{'Check-In'}</td>
              <td>{'Check-Out'}</td>
            </tr>
          </thead>
          <tbody>
            {days.map(this.renderDay)}
          </tbody>
        </Table>
      </TabPane>
    );
  }
}

Month.propTypes = {
  index: PropTypes.number.isRequired,
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
