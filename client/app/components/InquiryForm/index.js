import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button, Label, Form, Input, Dropdown, Grid, TextArea, Header } from 'semantic-ui-react'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import moment from 'moment'
import axios from 'axios'
import NotificationModel from '../NotificationModel'
import { Route, Redirect } from 'react-router'
//const HebrewLabel = ({text}) => <label style={{textAlign:'end'}}>{text}</label>

class InquiryForm extends Component {
  constructor(props) {
    super(props)

    const {id} = this.props.match.params
    const loading = !(id==null)
    this.state = {inquiry:{id}, decoders:{}, loading, isNotifeModalOpen:false};

  }

  componentDidMount(){

    this.node = ReactDOM.findDOMNode(this)

    axios.get('/api/decoders')
    .then(({data}) => {
      console.log(data);
      const addValueField = listTypes => listTypes.map(type => ({...type, value:type.key}))

      const sectionTypes = addValueField(data.sectionTypes)
      const scopeTypes = addValueField(data.scopeTypes)

      this.setState({decoders:{sectionTypes, scopeTypes}})
    })
    .catch(err => console.log(err))

    const {id} = this.state.inquiry

    if (id){
      axios.get(`/api/inquiries/${id}`)
      .then(({data}) => {

        console.log(data);
        const inquiry = data
        inquiry.date = moment(inquiry.date, "YYYY-MM-DD")
        this.setState({inquiry:data, loading:false})
      })
      .catch(err => console.log(err))
    }
  }

  handleChangeField(e, { name, value }){
    this.setState({inquiry:{ ...this.state.inquiry, [name]: value }})
  }

  onSave(){
    const {inquiry} = this.state

    const inquiryDate = inquiry.date && inquiry.date.format('YYYY-MM-DD')

    if (!inquiry.id){
      axios.post('/api/inquiries', {...inquiry, date:inquiryDate})
      .then(({data}) => {
        const {inquiryId} = data
        this.setState({inquiry:{...inquiry, id:inquiryId}, isNotifeModalOpen:open})
        this.props.history.replace(`/inquiry/${inquiryId}`)
      })
      // TODO error modal window message
      .catch(err => console.log(err))
    }else{
      console.log("todo update");
    }
  }

  redirctToRelated(){
    const {scopeKey, sectionKey} = this.state.inquiry
    this.props.history.replace(`/inquiries?scopeKey=${scopeKey}&sectionKey=${sectionKey}`)
  }

  render() {
    const {
      decoders:{sectionTypes, scopeTypes},
      inquiry,
      loading,
      isNotifeModalOpen
    } = this.state

    const header = inquiry.id?
      <Header
        content='פרטי תחקיר'
        size='huge'
        subheader='באפשרותך לעדכן את השדות הבאים'
      />
    :
      <Header
        content='הוספת תחקיר'
        size='huge'
        subheader='אנא מלא את השדות הבאים'
      />

    return (<Grid stretched={true} style={{width:'70%', margin:'auto',paddingRight:'10px'}}>
        <Grid.Row>
          <Grid.Column width={16}>
          {header}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row >
          <Grid.Column width={16}>
            <Form loading={loading}>
              <Form.Group widths='equal'>
                <Form.Input
                  label='שם'
                  name='name'
                  value={inquiry.name}
                  onChange={::this.handleChangeField}
                />
                <Form.Input
                  label='אי מייל'
                  type='email'
                  name='email'
                  value={inquiry.email}
                  onChange={::this.handleChangeField}
                />
                <Form.Field>
                  <label>תאריך</label>
                  <Datetime
                    dateFormat='D/M/YYYY'
                    timeFormat=''
                    locale='he'
                    value={inquiry.date}
                    onChange={::this.handleChangeField}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Dropdown
                  label='פרק'
                  name='sectionKey'
                  fluid search selection
                  options={sectionTypes}
                  value={inquiry.sectionKey}
                  onChange={::this.handleChangeField}
                />
                <Form.Dropdown
                  label='תחום'
                  name='scopeKey'
                  fluid search selection
                  options={scopeTypes}
                  value={inquiry.scopeKey}
                  onChange={::this.handleChangeField}
                />
              </Form.Group>
              <Form.TextArea
                label='מה קרה?'
                name='event'
                value={inquiry.event}
                onChange={::this.handleChangeField}
              />
              <Form.TextArea
                label='למה?'
                name='reason'
                value={inquiry.reason}
                onChange={::this.handleChangeField}
              />
              <Form.TextArea
                label='איך ניתן לשפר?'
                name='howToImprove'
                value={inquiry.howToImprove}
                onChange={::this.handleChangeField}
              />
              <Form.Group style={{flexDirection: 'row-reverse'}}>
                <Form.Button primary onClick={::this.onSave}>
                  שמור
                </Form.Button>
                <Form.Button disabled={!inquiry.id} onClick={::this.redirctToRelated}>
                  תחקירים דומים
                </Form.Button>
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>

        <NotificationModel
          mountNode={this.node}
          message='התחקיר נשמר בהצלחה'
          open={isNotifeModalOpen}
          close={() => this.setState({isNotifeModalOpen:false})}
          success={true}
        />
      </Grid>
    )
  }
}

export default InquiryForm
