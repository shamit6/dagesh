import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'

class Navbar extends Component {

  handleItemClick(path) {
    this.props.history.push(path);
  }

  isActive(path){
    const {location} = this.props
    return location.pathname.startsWith(path)
  }

  render() {
    return (
      <Menu fixed="top">
        <Menu.Menu position='right'>
          <Menu.Item
            name='inquiries'
            active={this.isActive('/inquiries')}
            content='תחקירים'
            onClick={() => this.handleItemClick('/inquiries')}
          />
          <Menu.Item
            name='inquiry'
            active={this.isActive('/inquiry')}
            content='הוסף תחקיר'
            onClick={() => this.handleItemClick('/inquiry')}
          />
          <Menu.Item
            name='statistics'
            active={this.isActive('/statistics')}
            content='נתונים סיכומיים'
            onClick={() => this.handleItemClick('/statistics/amounts')}
          />
      </Menu.Menu>
      </Menu>
    );
  }
}

export default Navbar
