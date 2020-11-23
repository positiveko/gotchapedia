import React, { Component } from 'react';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Search from './Search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './nav.scss';

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      isSignup: false,
      isLogin: false,
    };
    this.input = React.createRef();
  }

  openSignup = () => {
    this.setState({ isSignup: true });
  };

  closeSignup = () => {
    this.setState({ isSignup: false });
  };

  openLogin = () => {
    this.setState({ isLogin: true });
  };

  closeLogin = () => {
    this.setState({ isLogin: false });
  };

  render() {
    const { isSignup, isLogin } = this.state;
    const { myData } = this.props;

    return (
      <>
        <div className='Nav'>
          <div className='navWrapper'>
            <div className='navLeft'>
              <img
                src='/images/gotchapediaText.png'
                alt='gotchapediaLogo'
                className='gotchapediaLogo'
              />
            </div>
            <div className='navRight'>
              <div className='magnifierIcon'>
                <FontAwesomeIcon icon={faSearch} />
              </div>
              <div className='inputBox' ref={this.input}>
                <div className='searchIcon'>
                  <FontAwesomeIcon icon={faSearch} />
                </div>
                <div className='searchInput'>
                  <Search searchData={myData} inputRef={this.input} />
                </div>
              </div>

              <button className='loginBtn' onClick={this.openLogin}>
                로그인
              </button>
              <button className='signupBtn' onClick={this.openSignup}>
                회원가입
              </button>
              <div className='starIcon'>
                <FontAwesomeIcon icon={faStar} />
              </div>
              <div className='rate'>평가하기</div>
              <img
                src='/images/profile.jpg'
                alt='profile'
                className='profile'
              />
            </div>
          </div>
        </div>
        <div className={isSignup ? '' : 'displayNone'}>
          <Signup closeSignup={this.closeSignup} />
        </div>
        <div className={isLogin ? '' : 'displayNone'}>
          <Login isLogin={this.state.isLogin} closeLogin={this.closeLogin} />
        </div>
      </>
    );
  }
}

export default Nav;
