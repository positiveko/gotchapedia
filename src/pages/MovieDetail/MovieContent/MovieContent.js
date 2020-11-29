import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Slider from 'react-slick';
import '../../../../node_modules/slick-carousel/slick/slick.css';
import '../../../../node_modules/slick-carousel/slick/slick-theme.css';
import CastingList from './CastingList/CastingList';
import CommentBox from './CommentBox/CommentBox';
import CommentWrite from './CommentWrite/CommentWrite';
import ShowComment from '../MovieContent/ShowComment/ShowComment';
import './movieContent.scss';
import { SERVER, PREFERRED_TOKEN } from '../../../config';

class MovieContent extends Component {
  constructor() {
    super();
    this.state = {
      contentData: [],
      isComment: false,
      commentString: '',
      commentArray: [],
      isColor: false,
      castingImage: '',
      hoverRating: '',
      thumbsUp: '',
      countComment: '',
      commentList: [],
      commentObj: {},
      isCommentdAdded: false,
      newCommentId: '',
    };
  }

  handleWriteChange = (e) => {
    if (e.target.value) {
      this.setState({
        commentString: e.target.value,
        isColor: true,
      });
    } else {
      this.setState({
        isColor: false,
      });
    }
  };

  handleUpdateChange = (e) => {
    if (e.target.value) {
      this.setState({
        commentString: e.target.value,
        isColor: true,
      });
    } else {
      this.setState({
        isColor: false,
      });
    }
  };

  componentDidMount() {
    fetch(`http://3.35.216.109:8000/movies/${this.props.id}/comments`, {
      headers: {
        Authorization: PREFERRED_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          commentList: res.data,
        });
      });
  }

  addComment = (e) => {
    e.preventDefault();
    this.sendComment();
  };

  sendComment = () => {
    const {
      commentString,
      id,
      commentObj,
      commentArray,
      commentList,
      isCommentdAdded,
    } = this.state;

    fetch(`${SERVER}/movies/${this.props.id}/comment`, {
      method: 'POST',
      headers: {
        Authorization: PREFERRED_TOKEN,
      },
      body: JSON.stringify({
        movieId: this.props.id,
        content: this.state.commentString,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        const obj = {
          id: result.message.id,
          content: commentString,
          userName: '고은정',
          starPoint: '5.0',
          userImage: '/images/chorong2.png',
          likeCount: '0',
          replyCount: '0',
        };

        if (result.message !== 'ALREADY_EXIST') {
          this.setState({
            commentList: [obj, ...commentList],
            isCommentdAdded: true,
            newCommentId: obj.id,
          });
          this.closeModalComment();
        } else {
          alert('이미 쓰셨습니다');
        }
      })
      .catch((error) => console.log('error', error));
  };

  updateComment = () => {
    this.openModalComment();
    const { commentList, commentString } = this.state;
    const updatedCommentList = [...commentList];
    const updatedComment = { ...commentList[0], content: commentString };
    updatedCommentList.splice(0, 1, updatedComment);

    fetch(
      `${SERVER}/movies/${this.props.id}/comment/${this.state.newCommentId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: PREFERRED_TOKEN,
        },
      }
    ).then((res) => {
      console.log(res);
    });
  };

  deleteComment = () => {
    const { commentList } = this.state;
    const { id } = this.props;
    const deletedComment = Array.from(commentList);
    deletedComment.splice(0, 1);

    this.setState({
      commentList: deletedComment,
      isCommentdAdded: false,
    });

    fetch(`${SERVER}/movies/${id}/comment/${this.state.newCommentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: PREFERRED_TOKEN,
      },
    }).then((res) => {
      console.log(res);
    });
  };

  goToCommentDetail = () => {
    this.props.history.push(`/movies/${this.props.id}/comments`);
  };

  openModalComment = () => {
    this.setState({
      isComment: true,
    });
  };

  closeModalComment = () => {
    this.setState({
      isComment: false,
    });
  };

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
    };

    const {
      contentData,
      isComment,
      commentList,
      isCommentdAdded,
      isEditted,
    } = this.state;
    const { movieContentData, goToOverview } = this.props;
    const castingListData = movieContentData.staff;

    return (
      <>
        <div className='MovieContent'>
          {isCommentdAdded ? (
            <ShowComment
              deleteComment={this.deleteComment}
              updateComment={this.updateComment}
              commentList={commentList.length > 0 && commentList}
            />
          ) : (
            <div className='hiddenComment'>
              <div className='commentSuggestion'>
                대단한 작품이군요! {commentList[0]?.userName} 님의 감동을 글로
                남겨보세요
              </div>
              <button onClick={this.openModalComment}>코멘트 남기기</button>
            </div>
          )}
          <div className='movieContentBox'>
            <div className='predictStar'>
              <div className='predictHeading'>내가 좋아할 이유</div>
              <div className='predictContent'>
                <p>재밌게 본 비슷한 작품</p>
                <div>
                  아키라
                  <img src='/images/akiraHeaderImage.jpg' alt='연관영화'></img>
                </div>
              </div>
            </div>
            <div className='normalInfo'>
              <div className='infoHeading' onClick={goToOverview}>
                기본 정보<span>더보기</span>
              </div>
              <div className='infoContent'>
                <div className='contentHeading'>{movieContentData.name}</div>
                <div className='contentInfo'>
                  {movieContentData.genre[0].name}
                </div>
                <div className='contentTime'>
                  {movieContentData.showTime} 분
                </div>
                <div className='detailContent'>
                  {movieContentData.description}
                </div>
              </div>
            </div>
            <div className='castingWrapper'>
              <div className='castingHeading'>출연/제작</div>
              <div className='castingContent'>
                <CastingList castingListData={castingListData} />
              </div>
            </div>
            <div className='commentWrapper'>
              <div className='commentHeading'>
                <div className='headgitingLeft'>
                  코멘트 <span>{commentList.length}</span>
                </div>
                <span onClick={this.goToCommentDetail}>더보기</span>
              </div>
              <div className='commentBoxWrapper'>
                <Slider {...settings}>
                  {commentList.length > 0 &&
                    commentList.map((el) => {
                      return (
                        <CommentBox
                          key={el.id}
                          movieId={movieContentData.id}
                          commentList={el}
                          contentData={this.state.contentData}
                        />
                      );
                    })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
        <div className={isComment ? '' : 'displayNone'}>
          <CommentWrite
            commentWriteData={contentData.length > 0 && contentData}
            handleWriteChange={this.handleWriteChange}
            handleUpdateChange={this.handleUpdateChange}
            addComment={this.addComment}
            updateComment={this.updateComment}
            isColor={this.state.isColor}
            isComment={isComment}
            isEditted={isEditted}
            closeModalComment={this.closeModalComment}
          />
        </div>
      </>
    );
  }
}

export default withRouter(MovieContent);
