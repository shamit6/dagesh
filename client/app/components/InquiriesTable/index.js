import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

const decodeKey = (listTypes, key) => {
  const type = listTypes && listTypes.find(type => type.key == key)
  return type && type.text
}

const InquiriesTable = ({inquiries, sectionTypes, scopeTypes , history}) => {
  const renderBodyRow = (inquiry, i) => ({
    key: i,
    onClick:() => {history.replace(`/inquiry/${inquiry.id}`)},
    style: {cursor:'pointer'},
    cells: [
      {key:1, content: inquiry.name},
      {key:2, content: decodeKey(scopeTypes, inquiry.scopeKey)},
      {key:3, content: decodeKey(sectionTypes, inquiry.sectionKey)},
      {key:4, content: inquiry.date},
      {key:5, content: inquiry.event},
      {key:6, content: inquiry.reason},
      {key:7, content: inquiry.howToImprove},
    ],
  })

  const headerRow = [
    'שם',
    'תחום',
    'פרק',
    'תאריך',
    'מה קרה?',
    'למה?',
    'איך ניתן לשפר?'
  ]

  return <div style={{minHeight:'368px',
    maxHeight:'360px',
    overflowY:'scroll',
    borderBottom: '1px solid rgba(34,36,38,.1)',
    borderRight: '1px solid rgba(34,36,38,.1)'
  }}>
  <Table fixed
      celled
      headerRow={headerRow}
      style={{margin:'0',position: 'absolute', left: '24px',width:'calc(100% - 24px - 1rem)'}}
      textAlign='right'
  >
  </Table>
  <Table
        fixed
        singleLine
        selectable
        style={{paddingTop:'30px'}}
        celled
        tableData={inquiries}
        renderBodyRow={renderBodyRow}
        textAlign='right'
    >
    </Table>
  </div>
}

export default InquiriesTable
