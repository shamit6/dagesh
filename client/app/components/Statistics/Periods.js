import React, { Component } from 'react'
import { Menu, Form, Label, Button, Dropdown, Input, Segment } from 'semantic-ui-react'
import Datetime from 'react-datetime'
import moment from 'moment'
import 'react-datetime/css/react-datetime.css'
import {Bar as BarChart} from 'react-chartjs-2'
import axios from 'axios'


// red: 'rgb(255, 99, 132)',
// orange: 'rgb(255, 159, 64)',
// yellow: 'rgb(255, 205, 86)',
// green: 'rgb(75, 192, 192)',
// blue: 'rgb(54, 162, 235)',
// purple: 'rgb(153, 102, 255)',
// grey: 'rgb(201, 203, 207)'


const MONTHS = [
	'ינואר',
	'פברואר',
	'מרץ',
	'אפריל',
	'מאי',
	'יוני',
	'יולי',
	'אוגוסט',
	'ספטמבר',
	'אוקטובר',
	'נובמבר',
	'דצמבר',
]

const CHART_COLORS = [
	'rgb(255, 99, 132)',
	'rgb(255, 159, 64)',
	'rgb(255, 205, 86)',
	'rgb(75, 192, 192)',
	'rgb(54, 162, 235)',
	'rgb(153, 102, 255)',
	'rgb(201, 203, 207)']

const decodeKey = (listTypes, key) => {
	  const type = listTypes && listTypes.find(type => type.key == key)

		if (!type){
			return 'לא מוגדר'
		}

	  return type.text
	}

const createDataset = (startMount, periodsData, decoderTypeName) => {

	// TODO enable the end time field.
	const currentMonth = moment().month()

	const groupbyField = periodsData.reduce((datasets, curr) => {
		if (!datasets[curr.field]){
			datasets[curr.field] = []
		}

		datasets[curr.field].push({month:curr.month-1, amount:curr.amount})
		return datasets
	}, {})

	// Add zero to the missing months
	Object.values(groupbyField).forEach(fieldDataset => {
		for(let i = startMount; i <= currentMonth; i++){

			// if the month i is not exited
			if (!fieldDataset.find(e => e.month == i)){
				fieldDataset.push({month:i, amount:0})
			}
		}

		fieldDataset.sort((e1, e2) => e1.month-e2.month)
	})

	const datasets = Object.entries(groupbyField).map(([key, data], currentIndex) => ({
			label: decodeKey(decoderTypeName, key),
			data: data.map(d => d.amount),
			backgroundColor: CHART_COLORS[currentIndex % CHART_COLORS.length]
	}))

	const labels = []

	for(let i = startMount; i <= currentMonth; i++){
		labels.push(MONTHS [i % 12])
	}

	return {datasets, labels}
}

class Periods extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search:{
        field:'sectionKey',
        startDate:moment().startOf('year'),
        minRows:1
      },
      chartData:{
        datasets:[{data:[]}],
        labels:[]
      }
    }
  }

  componentDidMount(){
    ::this.fetchResult()
  }

  fetchResult(){
    const {search} = this.state

    axios.all([
			axios.get('/api/statistics/periods', {params:{...search, startDate:search.startDate.format('YYYY-MM-DD')}}),
			axios.get('/api/decoders')
		])
    .then(axios.spread(({data:periodsData}, {data:decoders})  => {

			const decoderTypeName = search.field=='sectionKey'?'sectionTypes':'scopeTypes'

      const chartData = createDataset(search.startDate.month(), periodsData, decoders[decoderTypeName])

			this.setState({chartData})
		}))
    .catch(err => console.log(err))
  }

  handleChangeField(e, { name, value }){
    this.setState({search:{ ...this.state.search, [name]: value }})
  }

  handleChangeDateField(fieldName, value){
    this.setState({search:{ ...this.state.search, [fieldName]: value }})
  }

  render() {
    const {search, chartData} = this.state
		const barOptions = {legend:{  position:'left' },scales: {yAxes: [{  ticks: {beginAtZero: true,stepSize: 1}}]}}

    return (
      <div style={{flex:'7',padding:'10px'}}>
        <Form>
          <Form.Group inline>
            <Form.Field inline>
              <Label>נתון</Label>
              <Dropdown
                selection
                name='field'
                value={search.field}
                options={[{key:'sectionKey', value:'sectionKey',text:'פרק'},
                {key:'scopeKry', value:'scopeKey',text:'תחום'}]}
                onChange={::this.handleChangeField}
              />
            </Form.Field>
            <Form.Field inline>
              <Label>מתאריך</Label>
              <Datetime
                style={{display:'inlineBlock'}}
                name='startDate'
                value={search.startDate}
                dateFormat='D/M/YYYY'
                timeFormat=''
                locale='he'
                onChange={(value) => ::this.handleChangeDateField('startDate', value)}
              />
            </Form.Field>
            <Form.Field inline>
              <Label>עד תאריך</Label>
              <Datetime
                style={{display:'inlineBlock'}}
                locale='he'
                onChange={::this.handleChangeField}
              />
            </Form.Field>
            <Form.Field inline>
              <Label>מספר מינמלי</Label>
              <Input
                style={{display:'inlineBlock'}}
                name='minRows'
                value={search.minRows}
                type='number'
								min='1'
                onChange={::this.handleChangeField}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group style={{flexDirection: 'row-reverse'}}>
            <Button primary onClick={::this.fetchResult} style={{marginLeft:'10%'}}>חפש</Button>
          </Form.Group>
        </Form>
        <div style={{width:'80%'}}>
          <BarChart data={chartData} options={barOptions} width="600" height="250"/>
        </div>
      </div>


    );
  }
}

export default Periods
