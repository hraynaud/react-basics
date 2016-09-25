
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
        <Counter score={props.score}  onChange={props.onChange} />
      </div>
    </div>
  );
};

var Counter  =function(props){
  return (
    <div className="counter">
      <button className="counter-action decrement">-</button>
      <div className="counter-score">{props.score}</div>
      <button className="counter-action increment">+</button>
    </div>
  );
}

Counter.propTypes = {
  score: React.PropTypes.number,
};

var Application = React.createClass( {

  propTypes: {
    title: React.PropTypes.string,
    players: React.PropTypes.arrayOf(React.PropTypes.shape(
      {
        name: React.PropTypes.string.isRequired,
        score: React.PropTypes.number.isRequired,
        id: React.PropTypes.number.isRequired
      }
    )).isRequired
  },
  getDefaultProps: function(){
    return {
      title: "My Scoreboard"
    }
  },

  getInitialState: function(){
     return {
         players: PLAYERS,
     };
  },

  render: function(){
    return (
      <div className="scoreboard">
      <Header title={this.props.title} />
      <div className="players">
        {
          this.props.players.map(function(player){
            return(<Player name={player.name} score={player.score} key={player.id} />);
          })
        }
      </div>
      </div>
    );
  }
});


Header.propTypes = {
  title: React.PropTypes.string.isRequired,
};

ReactDOM.render(<Application players={PLAYERS}/>, document.getElementById('container'));
