import React, { Component, PropTypes } from 'react'
import { Modal, Button, Message, Icon } from 'semantic-ui-react'


const NotificationModel = ({open, close, message, success, mountNode}) => {


  return (
    <Modal
      dimmer={false}
      mountNode={mountNode}
      open={open}
      size="mini"
      onClose={close}
      closeOnDocumentClick={true}
    >
      <Modal.Header>
          {message}
          {success?
            <Icon name='checkmark' color='green' size='large'/>
          :
            <Icon name='remove' color='red' size='large'/>}
      </Modal.Header>
      <Modal.Actions>
      <Button onClick={close} primary>
        אישור
      </Button>
    </Modal.Actions>
    </Modal>
  )
}

export default NotificationModel
