import React, { Component } from 'react'
import BoardComponent from '../components/BoardComponent'
import OpponentsComponent from '../components/OpponentsComponent'
import PlayerStatsComponent from '../components/PlayerStatsComponent'
import Game from '../models/game'
// import Road from '../models/road'
import Dice from '../models/dice'
const dice = new Dice()

class GameContainer extends Component {
  constructor(props){
    super(props)
    const newGame = new Game()

    this.state={
      game: newGame,
      tilesArray: newGame.tilesArray, 
      roadsArray: newGame.roadsArray,
      nodesArray: newGame.nodesArray,
      robberIndex: newGame.initialRobberIndex, 
      previousRobberIndex: undefined, 
      currentPlayer: newGame.players[0] 
    }

    this.handleClick = this.handleClick.bind(this)
    this.moveRobber = this.moveRobber.bind(this)
    this.rollDice = this.rollDice.bind(this)
    this.colourRoads = this.colourRoads.bind(this)
    this.colourSettlements = this.colourSettlements.bind(this)
  }

  render() {

    console.log(this.state.currentPlayer)

    const tiles = this.state.tilesArray
    if (this.state.previousRobberIndex !== undefined) {
      tiles[this.state.previousRobberIndex].hasRobber = false
    }
    tiles[this.state.robberIndex].hasRobber = true

    const roads = this.state.roadsArray
    const nodes = this.state.nodesArray
  
    return(
      <div id="game-container" onClick={this.handleClick}>
        <OpponentsComponent /> 
        <BoardComponent 
          
          tiles={tiles} 
          roads={roads} 
          nodes={nodes} 
          moveRobber={this.moveRobber} 
          colourRoads = {this.colourRoads} 
          colourSettlements = {this.colourSettlements} 
          letPlayerBuildRoad={this.state.game.letPlayerBuildRoad} 
          letPlayerBuildSettlement={this.state.game.letPlayerBuildSettlement} 
          radar={this.state.game.radar.bind(this.state.game)}
          currentPlayer={this.state.currentPlayer}/> 
        <PlayerStatsComponent 
          currentPlayer={this.state.currentPlayer} 
          rollDice={this.rollDice}/> 
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
    let playerToUpdate = this.state.currentPlayer
    playerToUpdate.roadsAvailable -= 1
    this.setState({roadsArray: updatedRoadsArray, currentPlayer: playerToUpdate})
  }

  handleClick(event) {
    console.log("x",event.clientX)
    console.log("y",event.clientY)
  }

  colourSettlements(clickedNodeIndex) {
    const colour = this.state.currentPlayer.colour
    let updatedNodesArray = this.state.nodesArray
    updatedNodesArray[clickedNodeIndex].colour = colour
    let playerToUpdate = this.state.currentPlayer
    playerToUpdate.settlementsAvailable -= 1
    this.setState({nodesArray: updatedNodesArray, currentPlayer: playerToUpdate})
  }

  rollDice() {
    const numberRolled = dice.rollDice()
    let playerToUpdate = this.state.currentPlayer
    playerToUpdate.numberRolled = numberRolled
    this.setState({currentPlayer: playerToUpdate})
  }

  // window.onClick() {
  //   console.log('x,y', ta)
  // }
}

export default GameContainer