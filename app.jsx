
var PLAYERS = [
  {
    name: "Herby",
    score: 50,
    id: 1
  },

  {
    name: "Tisha",
    score: 45,
    id: 2
  }
]
var Header = function(props){

  return (
    <div className="header">
      <h1>{props.title}</h1>
    </div>
    );
};

var Player = function(props){

  return (
    <div className="player">
      <div className="player-name">{props.name}</div>
      <div className="player-score">
        <Counter initialScore={props.score} title="hello"/>
      </div>
    </div>
  );
};

var Counter = React.createClass({
  getInitialState: function(){
    return {
      score: this.props.initialScore,
    };
  },
  decrementScore: function(){
    this.setState({
      score: this.state.score -1
    })
  },

  incrementScore: function(){
    this.setState({
      score: this.state.score +1
    })
  },
  render: function(){
    return (
      <div className="counter">
        <button className="counter-action decrement" onClick={this.decrementScore}>-</button>
        <div className="counter-score">{this.state.score}</div>
        <button className="counter-action increment" onClick={this.incrementScore}>+</button>
      </div>
    );
  }
});

Counter.propTypes = {
  initialScore: React.PropTypes.number.isRequired
};

var Application = function(props) {
  return (
    <div className="scoreboard">
      <Header title={props.title} />
      <div className="players">
        {
          props.players.map(function(player){
            return(<Player name={player.name} score={player.score} key={player.id} />);
          })
        }
      </div>
    </div>

  );
}


Header.propTypes = {
  title: React.PropTypes.string.isRequired,
};

Application.propTypes = {
  title: React.PropTypes.string,
  players: React.PropTypes.arrayOf(React.PropTypes.shape(
    {
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired
    }
  )).isRequired
};

Application.defaultProps = {
  title: "My Scoreboard"
};

ReactDOM.render(<Application players={PLAYERS}/>, document.getElementById('container'));
