import React, { Component } from 'react';
import './signup.scss';
import AuthService from '../../../service/auth_service';
import { GoogleLogin } from 'react-google-login';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  fetchSignUp = () => {
    const { name, email, password } = this.state;
    fetch('http://10.58.5.89:8000/user/log-in', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          console.log(result);
        } else {
          alert('아이디 확인하기');
        }
      })
      .catch((error) => console.log(error));
  };

  setData = (data) => {
    this.setState({
      name: data.additionalUserInfo.profile.name,
      email: data.additionalUserInfo.profile.email,
      password: data.user.uid,
    });
    this.fetchSignUp(data);
  };

  googleLogin = (event) => {
    const { authService } = this.props;
    authService
      .login(event.currentTarget.id)
      .then((data) => this.setData(data));
  };

  handleInput = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  checkValidation = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const checkName = name.length > 0;
    const checkEmail = email.includes('@');
    const checkPassword = password.length > 6;
    if (checkName && checkEmail && checkPassword) {
      console.log('okay');
      this.makeRequest(name, email, password);
    } else if (!checkName) alert('이름을 입력해주세요');
  };

  render() {
    const { name, email, password } = this.state;
    const { closeSignup } = this.props;
    return (
      <div className='Signup' onClick={closeSignup}>
        <div className='modalContainer' onClick={(e) => e.stopPropagation()}>
          <div className='wrapper'>
            <img
              src='/images/watchapediaTextCol.png'
              alt='gotchapediaLogoCol'
              className='gotchapediaLogoCol'
            />
            <div className='signupText'>회원가입</div>
            <form className='signupForm' onSubmit={this.checkValidation}>
              <input
                type='text'
                className='name'
                placeholder='이름'
                onChange={this.handleInput}
                name='name'
              />
              <input
                type='text'
                className='email'
                placeholder='이메일'
                onChange={this.handleInput}
                name='email'
              />
              <input
                type='password'
                className='password'
                placeholder='비밀번호'
                onChange={this.handleInput}
                name='password'
              />
              <button className='signupBtn' onClick={() => this.fetchSignUp()}>
                회원가입
              </button>
            </form>
            <div className='loginText'>
              이미 가입하셨나요? <span>로그인</span>
            </div>
            <div className='or'></div>
            <button className='kakaoBtn'>카카오 로그인</button>
            <button
              className='googleBtn'
              id='Google'
              onClick={this.googleLogin}>
              구글 로그인
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
