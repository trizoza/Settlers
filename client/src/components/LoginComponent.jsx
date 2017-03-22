import React, {Component} from 'react'

class LoginComponent extends Component {
  constructor(props) {
    super(props)
    this.handlePlayer1 = this.handlePlayer1.bind(this)
    this.handlePlayer2 = this.handlePlayer2.bind(this)
    this.handlePlayer3 = this.handlePlayer3.bind(this)
    this.handlePlayer4 = this.handlePlayer4.bind(this)
  }

  render() {
    return (
      <div>
        <form>
          Blue player: <input type="text" value="A" name="player1" onChange={this.handlePlayer1}/>
          <br/>
          Red player: <input type="text" value="B" name="player2" onChange={this.handlePlayer2}/>
          <br/>
          White player: <input type="text" value="C" name="player3" onChange={this.handlePlayer3}/>
          <br/>
          Yellow player: <input type="text" value="D" name="player4" onChange={this.handlePlayer4}/>
          <br/>
        </form>
        <button onClick={this.props.startGame}> Start Game </button>
      </div>
    ) 
  }

  handlePlayer1(event) {
    const name = event.target.value
    this.props.handlePlayer1(name)
  }
  handlePlayer2(event) {
    const name = event.target.value
    this.props.handlePlayer2(name)
  }
  handlePlayer3(event) {
    const name = event.target.value
    this.props.handlePlayer3(name)
  }
  handlePlayer4(event) {
    const name = event.target.value
    this.props.handlePlayer4(name)
  }
}

export default LoginComponent


// Player 2: <input type="text" value="" name="player2" onChange={this.props.handlePlayer2} />
// Player 3: <input type="text" value="" name="player3" onChange={this.props.handlePlayer3} />
// Player 4: <input type="text" value="" name="player4" onChange={this.props.handlePlayer4} />