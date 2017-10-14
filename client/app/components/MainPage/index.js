import React, { Component } from 'react'
import { Route } from 'react-router'
import Navbar from '../Navbar'
import InquiryForm from '../InquiryForm'
import InquiriesPanel from '../InquiriesPanel'
import Statistics from '../Statistics'

const inquiries = () => <div>inquiries</div>
class MainPage extends Component {
  render() {
    return (
      <div>
        <Navbar {...this.props}/>
        <div style={{paddingTop:'41px'}}>
          <Route path="/inquiries" component={InquiriesPanel}/>
          <Route path="/inquiry/:id?" component={InquiryForm}/>
          <Route path="/statistics" component={Statistics}/>
        </div>
      </div>
    )
  }
}

export default MainPage
