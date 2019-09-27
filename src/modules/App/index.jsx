import React, { Component } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import Container from 'reactstrap/lib/Container';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import TabContent from 'reactstrap/lib/TabContent';
import TabPane from 'reactstrap/lib/TabPane';
import Table from 'reactstrap/lib/Table';

import Month from '../Month';

import getMonths from '../../constants/months';


const StyledContainer = styled(Container)`
  height: 80vh;
  margin-top: 100px;
  border-radius: 20px;
  background-color: white;
`;

const StyledNavItem = styled(NavItem)`
  cursor: default;
`;

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const months = getMonths(currentYear);

class App extends Component {
  constructor() {
    super();

    this.state = { activeMonth: currentMonth };
  }

  setActiveMonth = (activeMonth) => {
    this.setState({ activeMonth });
  }

  renderMonthNavItem = ({ name }, index) => {
    const { activeMonth } = this.state;

    return (
      <StyledNavItem key={index}>
        <NavLink
          className={classnames({ active: activeMonth === index })}
          onClick={() => this.setActiveMonth(index)}
        >
          {name}
        </NavLink>
      </StyledNavItem>
    );
  }

  renderMonth = ({ name, days }, index) => (
    <TabPane
      key={index}
      tabId={index}
    >
      <h4>{`${name} ${currentYear}`}</h4>

      <Table>
        <thead>
          <tr>
            <td />
            <td>{'Check-In'}</td>
            <td>{'Check-Out'}</td>
            <td>{'Check-In'}</td>
            <td>{'Check-Out'}</td>
            <td />
          </tr>
        </thead>
        <tbody>
          <Month
            year={currentYear}
            index={index}
            name={name}
            days={days}
          />
        </tbody>
      </Table>
    </TabPane>
  )

  render() {
    const { activeMonth } = this.state;

    return (
      <StyledContainer>
        <Nav tabs>
          {months.map(this.renderMonthNavItem)}
        </Nav>
        <TabContent activeTab={activeMonth}>
          {months.map(this.renderMonth)}
        </TabContent>
      </StyledContainer>
    );
  }
}

export default App;
