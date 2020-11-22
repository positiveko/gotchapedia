import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import './wantToSee.scss';


// 모달창 닫는거 은정님한테 질문!!

class WantToSee extends Component {

  render() {

  const { closeWantToSee } = this.props;

    return(
    <div className='WantToSee' onClick={closeWantToSee}>
      <div className='modalContainer' onClick={(e) => e.stopPropagation()}>
        <div className='seeTitle'>
          <img className='seeTitleImage' src='/images/vanilaSkyPoster.jpeg' alt='보고싶어요이미지'></img>
          <div className='seeTitleContent'>
            <div className='contentTitle'>바닐라스카이</div>
            <div className='contentDesc'>영화 · 2001</div>
          </div>
        </div>
        <div className='seeChoice'>
          <div className='leftChoice'>
            <FontAwesomeIcon className='wantToSeeIcon' icon={faBookmark} />
            보고싶어요
          </div>
          <div className='choiceBorder'></div>
          <div className='rightChoice'>
            <FontAwesomeIcon className='imWatching' icon={faEye} />
            보는중
          </div>
        </div>
        <div className='writeComment'>
          코멘트 작성하기
          <FontAwesomeIcon className='commentIcon' icon={faComment} />
        </div>
        <div className='seeNoInterest'>
          관심없어요
          <FontAwesomeIcon className='noInterestIcon' icon={faBan} />
        </div>
        <div className='seeCancel' onClick={closeWantToSee}>
          취소
        </div>
      </div>
    </div>
    )
  }
}

export default WantToSee;