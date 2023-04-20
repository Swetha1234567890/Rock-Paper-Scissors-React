import {Component} from 'react'
import {RiCloseLine} from 'react-icons/ri'
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import {
  UnorderedList,
  Container,
  Gamer,
  Image,
  ResultText,
  CustomButton,
  SubContainer,
  Heading,
  ScoreContainer,
  AppHeaderContainer,
  AppContainer,
  CloseButton,
  ScoreText,
  ScoreValue,
} from './styledComponents'
import Game from '../Game'

const gameStatusConstants = {
  win: 'WIN',
  lost: 'LOST',
  draw: 'DRAW',
  inProgress: 'IN_PROGRESS',
}

class RulesPopUp extends Component {
  state = {
    yourOpinion: '',
    score: 0,
    gameStatus: gameStatusConstants.inProgress,
    gameChoice: '',
  }

  onClickUserOpinion = id => {
    this.setState(
      {yourOpinion: id, gameChoice: this.gameChoice()},
      this.evaluateGame,
    )
  }

  onClickGoToGameView = () => {
    this.setState({gameStatus: gameStatusConstants.inProgress})
  }

  gameChoice = () => {
    const {choicesList} = this.props
    const gameChoiceList = choicesList.map(each => each.id)
    const randomIndex = Math.floor(Math.random() * choicesList.length)
    return gameChoiceList[randomIndex]
  }

  evaluateGame = () => {
    const {yourOpinion, gameChoice} = this.state

    if (yourOpinion === gameChoice) {
      this.setState({gameStatus: gameStatusConstants.draw})
    } else if (yourOpinion === 'ROCK') {
      if (gameChoice === 'SCISSORS') {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.lost,
          score: prevState.score - 1,
        }))
      }
    } else if (yourOpinion === 'PAPER') {
      if (gameChoice === 'ROCK') {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.lost,
          score: prevState.score - 1,
        }))
      }
    } else if (yourOpinion === 'SCISSORS') {
      if (gameChoice === 'PAPER') {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.lost,
          score: prevState.score - 1,
        }))
      }
    }
  }

  renderGameInProgressView = () => {
    const {choicesList} = this.props
    return (
      <UnorderedList>
        {choicesList.map(each => (
          <Game
            key={each.id}
            imagesList={each}
            onClickUserOpinion={this.onClickUserOpinion}
          />
        ))}
      </UnorderedList>
    )
  }

  renderGameWinView = () => {
    const {choicesList} = this.props
    const {gameChoice, yourOpinion} = this.state
    const userChoiceList = choicesList.filter(each => each.id === yourOpinion)
    const userChoiceId = userChoiceList[0]
    const gameChoiceList = choicesList.filter(each => each.id === gameChoice)
    const gameChoiceId = gameChoiceList[0]

    return (
      <Container>
        <SubContainer>
          <Gamer>YOU</Gamer>
          <Image src={userChoiceId.imageUrl} alt="your choice" />
        </SubContainer>
        <SubContainer>
          <Gamer>OPPONENT</Gamer>
          <Image src={gameChoiceId.imageUrl} alt="opponent choice" />
        </SubContainer>
        <ResultText>YOU WON</ResultText>
        <CustomButton type="button" onClick={this.onClickGoToGameView}>
          PLAY AGAIN
        </CustomButton>
      </Container>
    )
  }

  renderGameLostView = () => {
    const {choicesList} = this.props
    const {gameChoice, yourOpinion} = this.state
    const userChoiceList = choicesList.filter(each => each.id === yourOpinion)
    const userChoiceId = userChoiceList[0]
    const gameChoiceList = choicesList.filter(each => each.id === gameChoice)
    const gameChoiceId = gameChoiceList[0]

    return (
      <Container>
        <SubContainer>
          <Gamer>YOU</Gamer>
          <Image src={userChoiceId.imageUrl} alt="your choice" />
        </SubContainer>
        <SubContainer>
          <Gamer>OPPONENT</Gamer>
          <Image src={gameChoiceId.imageUrl} alt="opponent choice" />
        </SubContainer>
        <ResultText>YOU LOSE</ResultText>
        <CustomButton type="button" onClick={this.onClickGoToGameView}>
          PLAY AGAIN
        </CustomButton>
      </Container>
    )
  }

  renderGameDrawView = () => {
    const {choicesList} = this.props
    const {gameChoice, yourOpinion} = this.state
    const userChoiceList = choicesList.filter(each => each.id === yourOpinion)
    const userChoiceId = userChoiceList[0]
    const gameChoiceList = choicesList.filter(each => each.id === gameChoice)
    const gameChoiceId = gameChoiceList[0]

    return (
      <Container>
        <SubContainer>
          <Gamer>YOU</Gamer>
          <Image src={userChoiceId.imageUrl} alt="your choice" />
        </SubContainer>
        <SubContainer>
          <Gamer>OPPONENT</Gamer>
          <Image src={gameChoiceId.imageUrl} alt="opponent choice" />
        </SubContainer>
        <ResultText>IT IS DRAW</ResultText>
        <CustomButton type="button" onClick={this.onClickGoToGameView}>
          PLAY AGAIN
        </CustomButton>
      </Container>
    )
  }

  renderGameStatusView = () => {
    const {gameStatus} = this.state

    switch (gameStatus) {
      case gameStatusConstants.inProgress:
        return this.renderGameInProgressView()
      case gameStatusConstants.win:
        return this.renderGameWinView()
      case gameStatusConstants.lost:
        return this.renderGameLostView()
      case gameStatusConstants.draw:
        return this.renderGameDrawView()
      default:
        return null
    }
  }

  render() {
    const {score} = this.state
    return (
      <AppContainer>
        <AppHeaderContainer>
          <UnorderedList>
            <Heading>
              ROCK
              <br />
              PAPER
              <br />
              SCISSORS
            </Heading>
          </UnorderedList>
          <ScoreContainer>
            <ScoreText>Score</ScoreText>
            <ScoreValue>{score}</ScoreValue>
          </ScoreContainer>
        </AppHeaderContainer>
        <Container>{this.renderGameStatusView()}</Container>
        <>
          <Popup
            modal
            trigger={
              <CustomButton className="trigger-button" type="button">
                Rules
              </CustomButton>
            }
            closeOnEscape
            window
          >
            {close => (
              <Container>
                <Gamer>Rules</Gamer>
                <Image
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />
                <CloseButton type="button" onClick={() => close()}>
                  <RiCloseLine />
                </CloseButton>
              </Container>
            )}
          </Popup>
          )
        </>
      </AppContainer>
    )
  }
}

export default RulesPopUp
