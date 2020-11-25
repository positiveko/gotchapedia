import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import './imgInput.scss';

class ImgInput extends Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    const { myUrl } = this.props;
    if (myUrl !== prevProps.myUrl) {
      console.log('ok');
    }
  }

  // onChange = async (event) => {
  //   const { imageUploader } = this.props;
  //   console.log(event.target.files[0]);
  //   const uploadedImg = await imageUploader.upload(event.target.files[0]);
  //   console.log(uploadedImg.url);
  // };

  onButtonClick = (event) => {
    event.preventDefault();
    const clickInput = this.inputRef;
    clickInput.current.click();
  };

  render() {

    return (
      <div className='ImgInput'>
        <div className='userCog' onClick={this.onButtonClick}>
          <FontAwesomeIcon className='headerArrow' icon={faUserCog} />{' '}
        </div>
        <input
          ref={this.inputRef}
          type='file'
          className='imgInput'
          accept='image/*'
          name='file'
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default ImgInput;
