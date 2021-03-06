import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FileUpload from '../components/FileUpload/FileUpload'
import Button from '../components/Button/Button'
import getConfig from 'next/config'

import css from './select.scss'
import Modal from '../components/Modal/Modal'
import ModalContext from '../components/ModalContext/ModalContext'
import SampleCollections from '../components/SampleCollections/SampleCollections'

Select.propTypes = {
  dispatch: PropTypes.func,
}
const {
  publicRuntimeConfig:{
    isROMode
  }
} = getConfig();
function Select({ dispatch }) {
  if(isROMode === 'true'){
    const [modal, setModal] = React.useState(false)
    return (
      <ModalContext.Provider value={{modal:modal, setModal:setModal}}>
        <Modal onClose={() => setModal(false)} show={modal} modalTitle={"Cannot Upload Your Own Documents - Read Only Mode"}>
        This DUS instance is running in Read-Only Mode which does not support uploading your own documents. 
        To use all the features of DUS, please deploy your own instance following the instructions
         <a href="https://github.com/awslabs/document-understanding-solution"> here.</a>
          </Modal>
          <div className={css.select}>
          <p>
            <Button inverted link={{ href: '/documents' }}>
              View Existing Documents
            </Button>
          </p>
          <h2>Add some example documents</h2>
          <SampleCollections />
          <h2>Or Upload your own documents</h2>
          <FileUpload />
        </div>
      </ModalContext.Provider>   
    )
  }
else {
  return (
    <div className={css.select}>
      <p>
        <Button inverted link={{ href: '/documents' }}>
          View Existing Documents
        </Button>
      </p>

      <h2>Upload your own documents</h2>
      <FileUpload />
      <h2>Or add some example documents</h2>
      <SampleCollections />
    </div>
  )
  }
}

Select.getInitialProps = function() {
  return {
    pageTitle: 'Upload documents',
  }
}

export default connect(function mapStateToProps(state) {
  return {}
})(Select)
