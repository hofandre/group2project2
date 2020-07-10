import React from 'react';
import UploadService from '../services/upload.service';
import { connect } from 'react-redux';
import SetField from './setfield.component';

class Upload extends React.Component {
  uploadService = new UploadService();
  constructor(props){
      super(props);
      console.log('Upload component constructor.');
      console.log(props);
      this.upload = this.upload.bind(this);
  }

  componentDidMount() {
      console.log('Mounting Set');
  }

  componentDidUpdate() {
      console.log('Updating Set');
  }

  upload() {
    this.uploadService.upload_set( this.props.file_one, this.props.file_two, this.props.correct_option, this.props.title, this.props.file_name_one, this.props.file_name_two, this.props.alt_text_one, this.props.alt_text_two, this.props.keywords ).then(
      () => {
        alert('Upload Successful!');
      }
    );
  }

  render() {
      console.log('rendering upload');
      return (
          <>
            <SetField></SetField>
            <button className='btn btn-primary' onClick={ this.upload }>Upload Set</button>
          </>
      )
  }
}

function mapStateToProps(state) {
    console.log(state)
    const{ file_one, file_two, correct_option, title, file_name_one, file_name_two, alt_text_one, alt_text_two, keywords } = state;
    return { file_one: file_one, file_two: file_two, correct_option: correct_option, title: title, file_name_one: file_name_one, file_name_two: file_name_two, alt_text_one: alt_text_one, alt_text_two: alt_text_two, keywords: keywords }
}

function mapDispatchToProps(dispatch) {
    return {
        upload_set: (file_one, file_two, correct_option, title, file_name_one, file_name_two, alt_text_one, alt_text_two, keywords) => dispatch({ type: 'upload_set', correct_option: correct_option, title: title, file_name_one: file_name_one, file_name_two: file_name_two, alt_text_one: alt_text_one, alt_text_two: alt_text_two, keywords: keywords })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
