import React, { Component } from 'react'
import BoardComponent from '../components/BoardComponent'
import OpponentsComponent from '../components/OpponentsComponent'
import PlayerStatsComponent from '../components/PlayerStatsComponent'
import Game from '../models/game'
import Dice from '../models/dice'
const dice = new Dice()

class GameContainer extends Component {
  constructor(props){
    super(props)
    const newGame = new Game({player1: this.props.player1, 
      player2: this.props.player2, 
      player3: this.props.player3, 
      player4: this.props.player4})

    this.state={
      game: newGame,
      tilesArray: newGame.tilesArray, 
      roadsArray: newGame.roadsArray,
      nodesArray: newGame.nodesArray,
      robberIndex: newGame.initialRobberIndex, 
      previousRobberIndex: undefined, 
      currentPlayer: newGame.players[0],
      players: newGame.players, 
      turn: 0, 
      showTurnButton: true, 
      showRollDiceButton: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.moveRobber = this.moveRobber.bind(this)
    this.rollDice = this.rollDice.bind(this)
    this.colourRoads = this.colourRoads.bind(this)
    this.buildCity = this.buildCity.bind(this)
    this.colourSettlements = this.colourSettlements.bind(this)
    this.nextTurn = this.nextTurn.bind(this)
    this.winChecker = this.winChecker.bind(this)
    this.getLongestRoadCount = this.getLongestRoadCount.bind(this)
    this.checkForLongestRoadWinner = this.checkForLongestRoadWinner.bind(this)
  }

  render() {

    let winScreen = ""
    if (this.winChecker()) {
      winScreen = <h1> {this.winChecker()} wins </h1>
    }

    const tiles = this.state.tilesArray
    if (this.state.previousRobberIndex !== undefined) {
      tiles[this.state.previousRobberIndex].hasRobber = false
    }
    tiles[this.state.robberIndex].hasRobber = true

    const roads = this.state.roadsArray
    const nodes = this.state.nodesArray
  
    return(
      <div id="game-container" onClick={this.handleClick}>
        <OpponentsComponent 
          players={this.state.players}
          currentPlayer={this.state.currentPlayer}
        /> 
        <BoardComponent    
          tiles={tiles} 
          roads={roads} 
          nodes={nodes} 
          moveRobber={this.moveRobber} 
          colourRoads = {this.colourRoads} 
          colourSettlements = {this.colourSettlements}
          buildCity = {this.buildCity}
          letPlayerBuildRoad={this.state.game.letPlayerBuildRoad} 
          letPlayerBuildSettlement={this.state.game.letPlayerBuildSettlement}
          letPlayerBuildCity={this.state.game.letPlayerBuildCity}
          radar={this.state.game.radar.bind(this.state.game)}
          mapConstructionAround={this.state.game.mapConstructionAround.bind(this.state.game)}
          mapNextPossibleRoads ={this.state.game.mapNextPossibleRoads.bind(this.state.game)}
          currentPlayer={this.state.currentPlayer}/> 
        <PlayerStatsComponent 
          currentPlayer={this.state.currentPlayer} 
          turn={this.state.turn}
          getLongestRoadCount={this.getLongestRoadCount}
          checkForLongestRoadWinner={this.checkForLongestRoadWinner}
          nextTurn={this.nextTurn}
          showTurnButton={this.state.showTurnButton}
          showRollDiceButton={this.state.showRollDiceButton}
          rollDice={this.rollDice}/> 
        {winScreen} 
      </div>
    )
  }

  moveRobber(newRobberIndex) {
    const current = this.state.robberIndex
    this.setState({previousRobberIndex: current, robberIndex: newRobberIndex})
  }

  colourRoads(clickedRoadIndex) {
    const colour = this.state.currentPlayer.colour
    let updatedRoadsArray = this.state.roadsArray
    updatedRoadsArray[clickedRoadIndex].colour = colour
    updatedRoadsArray[clickedRoadIndex].builtYet = true
    let playerToUpdate = this.state.currentPlayer
    playerToUpdate.hasLongestRoad = this.checkForLongestRoadWinner(playerToUpdate)

    // playerToUpdate.findLongestRoads()
    this.setState({roadsArray: updatedRoadsArray, currentPlayer: playerToUpdate})
  }

  winChecker() {
    let winner = false
    this.state.players.forEach((player) => {
      console.log("player", player.score)
      if (player.score >= 10) {
        winner = player.name
      }
    })
    return winner
  }

  nextTurn() {
    const turn = this.state.turn + 1

    if (turn > 4 && turn < 8) {
      if (this.state.currentPlayer === this.state.players[3]) {
        this.setState({currentPlayer: this.state.players[2], turn: turn})
      }
      if (this.state.currentPlayer === this.state.players[2]) {
        this.setState({currentPlayer: this.state.players[1], turn: turn})
      }
      if (this.state.currentPlayer === this.state.players[1]) {
        this.setState({currentPlayer: this.state.players[0], turn: turn})
      }
    } else if (turn == 4) {
      this.setState({currentPlayer: this.state.players[3], turn: turn})
    } else {
      if (this.state.currentPlayer === this.state.players[0]) {
        this.setState({currentPlayer: this.state.players[1], turn: turn})
      }
      if (this.state.currentPlayer === this.state.players[1]) {
        this.setState({currentPlayer: this.state.players[2], turn: turn})
      }
      if (this.state.currentPlayer === this.state.players[2]) {
        this.setState({currentPlayer: this.state.players[3], turn: turn})
      }
      if (this.state.currentPlayer === this.state.players[3]) {
        this.setState({currentPlayer: this.state.players[0], turn: turn})
      }
    }
  }

  handleClick(event) {
    console.log("x",event.clientX)
    console.log("y",event.clientY)
  }

  colourSettlements(clickedNodeIndex) {
    const colour = this.state.currentPlayer.colour
    let updatedNodesArray = this.state.nodesArray
    updatedNodesArray[clickedNodeIndex].colour = colour
    updatedNodesArray[clickedNodeIndex].hasSettlement = true
    let playerToUpdate = this.state.currentPlayer
    this.setState({nodesArray: updatedNodesArray, currentPlayer: playerToUpdate})
  }

  buildCity(clickedNodeIndex) {
    const colour = this.state.currentPlayer.colour
    let updatedNodesArray = this.state.nodesArray
    updatedNodesArray[clickedNodeIndex].colour = colour
    updatedNodesArray[clickedNodeIndex].hasCity = true
    updatedNodesArray[clickedNodeIndex].classOfNode = 'city'
    // updatedNodesArray[clickedNodeIndex].hasSettlement = false
    let playerToUpdate = this.state.currentPlayer
    this.setState({nodesArray: updatedNodesArray, currentPlayer: playerToUpdate, classOfNode: 'city'})
  }

  getLongestRoadCount(player) {
    let longestRoad = 0
    player.longestRoads.forEach((road) => {
      if (road.length > longestRoad) {
        longestRoad = road.length
      }
    })
    return longestRoad
  }

  checkForLongestRoadWinner(currentPlayer) {
    let returnStatement = true
    if (!currentPlayer.hasLongestRoad) {
      this.state.players.forEach((player) => {
        if (currentPlayer !== player && this.getLongestRoadCount(currentPlayer) <= this.getLongestRoadCount(player) || this.getLongestRoadCount(currentPlayer) < 5) {
          returnStatement = false
        } else if (currentPlayer !== player && player.hasLongestRoad == true) {
          player.hasLongestRoad = false
          player.score -= 2
        }
      })
      if (returnStatement) {
        currentPlayer.score += 2
      }
      return returnStatement
    }
    return returnStatement
  }

  rollDice() {
    const numberRolled = dice.rollDice()
    let playerToUpdate = this.state.currentPlayer
    playerToUpdate.numberRolled = numberRolled
    console.log("players", this.state.players)
    this.state.players.forEach((player) => {
    console.log("player", player)
       player.conqueredTiles.forEach((tile) => {
        if (tile.number === numberRolled && tile.hasRobber === false) {
          const resource = tile.resource
          this.state.game.giveResourceCardToPlayer(player, resource)
        }
      })
    })

    this.setState({currentPlayer: playerToUpdate})
  }


}

export default GameContainer