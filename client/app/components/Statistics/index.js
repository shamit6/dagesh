import React, { Component } from 'react';
import { Grid, Menu, Form, Label, Button } from 'semantic-ui-react'
import { Route } from 'react-router'
import Datetime from 'react-datetime'
import moment from 'moment'
import Amounts from './Amounts'
import Periods from './Periods'
import 'react-datetime/css/react-datetime.css'

class Statistics extends Component {

  handleItemClick(path) {
    const {path:currPath} = this.props.match
    this.props.history.push(currPath.concat(path));
  }

  isActive(path){
    const {location, match} = this.props
    return location.pathname===match.path.concat(path)
  }

  render() {
    return (
      <div style={{display:'flex',alignItems:'stretch'}}>
        <Menu secondary vertical compact={true} size='large' style={{flex:'1'}}>
            <Menu.Menu position='right'>
              <Menu.Item
                name='amounts'
                active={this.isActive('/amounts')}
                content='כמותיים'
                onClick={() => this.handleItemClick('/amounts')}
              />
              <Menu.Item
                name='periods'
                active={this.isActive('/periods')}
                content='תקופתיים'
                onClick={() => this.handleItemClick('/periods')}
              />
              <Menu.Item
                name='feeds'
                active={this.isActive('/feeds')}
                content='הזנות'
                onClick={() => this.handleItemClick('/feeds')}
              />
          </Menu.Menu>
        </Menu>
        <Route path="/statistics/amounts" component={Amounts}/>
        <Route path="/statistics/Periods" component={Periods}/>
      </div>
    );
  }
}

export default Statistics
