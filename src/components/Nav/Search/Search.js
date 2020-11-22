import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './search.scss';

const DETAIL_API = 'http://10.58.1.5:8000/movie/23';
const DETAIL_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NH0.GOPhcT6nmt8M7Apx1rI-fvvQfSDIMTtWMe371hZ3t8E';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      isSearchOn: false,
      isListActive: false,
      filteredMovie: [],
      detailData: {},
    };
  }

  componentDidMount() {
    this.loadDetailData();
  }

  loadDetailData = () => {
    fetch(DETAIL_API, {
      method: 'GET',
      headers: {
        Authorization: DETAIL_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((res) => this.setState({ detailData: res.data }))
      .catch((error) => console.log('error', error));
  };

  goToDetail = (event) => {
    console.log('click');
    this.props.history.push(`/monsters/detail/${event.key}`);
    this.setState({ isListActive: false });
  };

  saveKeyword = () => {
    const { searchValue } = this.state;
    console.log('enter');
  };

  searchMovie = (event) => {
    event.preventDefault();
    const { searchValue } = this.state;
    const { searchData } = this.props;
    const searchPool = searchData.data;
    const searchKeywords = searchValue.split(' ');
    let tempSearchPool = [...searchPool];
    let tempFilteredMovie = [];

    searchKeywords.forEach((key) => {
      if (key !== '') {
        tempFilteredMovie = tempSearchPool.filter((movie) => {
          if (movie.title.includes(key)) {
            return true;
          }
        });
        tempSearchPool = [...tempFilteredMovie];
      }
    });
    // if (event.key === 'Enter') {
    //   localStorage.setItem(RECENT_KEYWORDS, searchValue);
    // }
    this.setState({ filteredMovie: tempFilteredMovie });
  };

  onSearchInputChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  render() {
    const {
      searchValue,
      isSearchOn,
      isListActive,
      filteredMovie,
      detailData,
    } = this.state;
    console.log(detailData.subImage && detailData.subImage[0].url);

    return (
      <>
        <div className='temp'>
          {/* <img src={detailData && detailData.subImage[0].url} alt="temp"/> */}
        </div>
        <input
          type='text'
          className='searchInput'
          placeholder='작품 제목,배우,감독을 검색해보세요.'
          autoCapitalize='none'
          value={searchValue}
          onChange={this.onSearchInputChange}
          onFocus={() => this.setState({ isListActive: true })}
          onBlur={() =>
            this.setState({ isListActive: false, isSearchOn: false })
          }
          onKeyUp={this.searchMovie}
        />
        <div className={isListActive ? 'listBox' : 'displayNone'}>
          <div className='searchList'>
            <div className='searchHeaderWrapper'>
              <span>최근 검색어</span>
              <div className='keywordDeleteBtn'>모두 삭제</div>
            </div>
            <ul className='latestList'>
              {filteredMovie &&
                filteredMovie.map((movie) => (
                  <li
                    className='resultMovie'
                    key={movie.movieId}
                    className={movie.movieId}>
                    {movie.title}
                  </li>
                ))}
            </ul>
          </div>
          <div className='popularList'>
            <div className='searchHeaderWrapper'>
              <span>인기 검색어</span>
              <div className='keywordDeleteBtn'>모두 삭제</div>
            </div>
            <ul className='latestList'>
              <li className='resultMovie' key='23' onClick={this.goToDetail}>
                바닐라 스카이
              </li>
              <li className='resultMovie'>라라랜드</li>
              <li className='resultMovie'>붉은 돼지</li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Search);
