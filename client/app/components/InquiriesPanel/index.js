import React, { Component } from 'react'
import { Button, Label, Input, Dropdown, Grid, Form, Header, Table } from 'semantic-ui-react'
import InquiriesTable from '../InquiriesTable'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import moment from 'moment'
import axios from 'axios'
import classnames from 'classnames'
import queryString from 'query-string'

class InquiriesPanel extends Component {
  constructor(props) {
    super(props)
    const {scopeKey, sectionKey} = queryString.parse(props.location.search)
    this.state = {
      search:{
        scopeKey:scopeKey && parseInt(scopeKey),
        sectionKey:sectionKey && parseInt(sectionKey)
      }
    }
  }

  componentDidMount(){
    axios.get('/api/decoders')
    .then(({data}) => {

      const addValueField = listTypes => {
        const options = listTypes.map(type => ({...type, value:type.key}))
        options.unshift({key:-1, value:null, text:' '})
        return options
      }

      const sectionTypes = addValueField(data.sectionTypes)
      const scopeTypes = addValueField(data.scopeTypes)

      this.setState({sectionTypes, scopeTypes})
    })
    .catch(err => console.log(err))

    this.fetchResult()
  }

  fetchResult(){
    const params = {...this.state.search}

    // TODO do tojson func  support moment js
    params.startDate = params.startDate && params.startDate.format('YYYY-MM-DD')
    params.endDate = params.endDate && params.endDate.format('YYYY-MM-DD')

    axios.get('/api/inquiries', {params})
    .then(({data}) => {
      this.setState({inquiries:data})
    })
    .catch(err => console.log(err))
  }

  handleChangeField(e, { name, value }){
    this.setState({search:{ ...this.state.search, [name]: value }})
  }

  handleChangeDateField(fieldName, value){
    this.setState({search:{ ...this.state.search, [fieldName]: value }})
  }

  render(){
    const {search, sectionTypes, scopeTypes, inquiries} = this.state
    const {history} = this.props

    return (
      <Grid stretched={false} textAlign='right' style={{padding:'1rem'}}>
        <Grid.Row>
          <Grid.Column>
            <Header size="huge">
              חיפוש תחקירים
              <Header.Subheader>
              </Header.Subheader>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row verticalAlign='middle'>
          <Grid.Column width={13}>
            <Form>
              <Form.Group inline>
                <Form.Field inline>
                  <Label>עד תאריך</Label>
                  <Datetime
                    style={{display:'inlineBlock'}}
                    value={search.endDate}
                    dateFormat='D/M/YYYY'
                    timeFormat=''
                    locale='he'
                    onChange={(value) => ::this.handleChangeDateField('endDate', value)}
                  />
                </Form.Field>
                <Form.Field inline>
                  <Label>מתאריך</Label>
                  <Datetime
                    style={{display:'inlineBlock'}}
                    value={search.startDate}
                    dateFormat='D/M/YYYY'
                    timeFormat=''
                    locale='he'
                    onChange={(value) => ::this.handleChangeDateField('startDate', value)}
                  />
                </Form.Field>
                <Form.Field inline>
                  <Label>תחום</Label>
                  <Dropdown
                    name='scopeKey'
                    value={search.scopeKey}
                    defaltValue={search.scopeKey}
                    search
                    selection
                    options={scopeTypes}
                    onChange={::this.handleChangeField}
                  />
                </Form.Field>
                <Form.Field inline>
                  <Label>פרק</Label>
                  <Dropdown
                    name='sectionKey'
                    value={search.sectionKey}
                    search
                    selection
                    options={sectionTypes}
                    onChange={::this.handleChangeField}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group style={{flexDirection: 'row-reverse'}}>
                <Button primary onClick={::this.fetchResult}>חפש</Button>
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            למעבר לדף התחקיר לחץ על השורה הרצויה
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <InquiriesTable
              sectionTypes={sectionTypes}
              scopeTypes={scopeTypes}
              inquiries={inquiries}
              history={history}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default InquiriesPanel
