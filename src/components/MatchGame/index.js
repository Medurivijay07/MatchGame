import {Component} from 'react'

import './index.css'

import TabItem from '../TabItem'

import Thumbnail from '../Thumbnail'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      timeLeft: 60,
      imgUrl: props.imagesList[0].imageUrl,
      activeTab: props.tabsList[0].tabId,
      isGameEnded: false,
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.onDecrease, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onDecrease = () => {
    this.setState(prevState => {
      if (prevState.timeLeft <= 0) {
        clearInterval(this.timerId)
        return {isGameEnded: true}
      }
      return {timeLeft: prevState.timeLeft - 1}
    })
  }

  clickTabItem = id => {
    this.setState({activeTab: id})
  }

  getfilteredThumbnails = () => {
    const {activeTab} = this.state
    const {imagesList} = this.props
    const filteredThumbnails = imagesList.filter(
      eachItem => activeTab === eachItem.category,
    )
    return filteredThumbnails
  }

  thumbailClicked = id => {
    const {imgUrl} = this.state
    const {imagesList} = this.props
    const imagesObject = imagesList.find(eachItem => eachItem.id === id)
    if (imagesObject.imageUrl === imgUrl) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        imgUrl:
          imagesList[Math.floor(Math.random() * imagesList.length)].imageUrl,
      }))
    } else {
      this.setState({isGameEnded: true})
      clearInterval(this.timerId)
    }
  }

  playAgain = () => {
    const {imagesList, tabsList} = this.props
    clearInterval(this.timerId)
    this.timerId = setInterval(this.onDecrease, 1000)
    this.setState({
      timeLeft: 60,
      score: 0,
      imgUrl: imagesList[0].imageUrl,
      activeTab: tabsList[0].tabId,
      isGameEnded: false,
    })
  }

  renderScoreCardView = () => {
    const {score} = this.state
    return (
      <div className="score-card-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
          alt="trophy"
          className="trophy-image"
        />
        <p>Your Score</p>
        <p>{score}</p>
        <button type="button" className="reset-button" onClick={this.playAgain}>
          <div className="button-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
              alt="reset"
            />
            <p>PLAY AGAIN</p>
          </div>
        </button>
      </div>
    )
  }

  render() {
    const filteredThumbnails = this.getfilteredThumbnails()
    const {tabsList, imagesList} = this.props
    const {score, timeLeft, imgUrl, activeTab, isGameEnded} = this.state
    return (
      <>
        <ul>
          <li className="navbar-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              alt="website logo"
              className="logo-image"
            />
            <div className="score-container">
              <p>
                Score: <span className="score-number">{score}</span>
              </p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-image"
              />
              <p className="sixty-sec">{timeLeft} sec</p>
            </div>
          </li>
        </ul>
        <div className="main-container">
          {isGameEnded ? (
            this.renderScoreCardView()
          ) : (
            <>
              <ul>
                <li>
                  <img src={imgUrl} alt="match" className="match-image" />
                </li>
              </ul>
              <ul className="tabs-list">
                {tabsList.map(eachItem => (
                  <TabItem
                    eachTab={eachItem}
                    key={eachItem.tabId}
                    isActive={eachItem.tabId === activeTab}
                    clickTabItem={this.clickTabItem}
                  />
                ))}
              </ul>
              <ul className="thumbnails-list">
                {filteredThumbnails.map(eachItem => (
                  <Thumbnail
                    key={eachItem.id}
                    thumbnail={eachItem}
                    thumbailClicked={this.thumbailClicked}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      </>
    )
  }
}

export default MatchGame
