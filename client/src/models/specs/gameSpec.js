import assert from 'assert';
import Player from '../player.js';
import Game from '../game.js';
import 'babel-polyfill'

describe("Game Tests", function(){

  var player1
  var player2
  var player3
  var player4
  var game

  beforeEach("Setup", function(){
    player1 = new Player({name: "John", colour: "blue"})
    player2 = new Player({name: "John", colour: "red"})
    player3 = new Player({name: "John", colour: "yellow"})
    player4 = new Player({name: "John", colour: "white"})
    game = new Game({player1: player1, player2: player2, player3: player3, player4: player4})
  })

  it("should have 4 players", function(){
    assert.equal(4, game.players.length)
  })

  it("should have 19 tiles", function(){
    assert.equal(19, game.tilesArray.length)
  })

  it("should have 72 possible roads", function(){
    assert.equal(72, game.roadsArray.length)
  })

  it("should have 9 possible ports", function(){
    assert.equal(9, game.portsArray.length)
  })

})