var nextId = 4
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
];

var Header = function(props){

  return (
    <div className="header">
      <Stats players={props.players}/>
      <h1>{props.title}</h1>

      <Stopwatch />
    </div>
    );
};

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired,
};

var Counter  =function(props){
  return (
    <div className="counter">
      <button className="counter-action decrement" onClick={function(){props.onChange(-1)}}>-</button>
      <div className="counter-score">{props.score}</div>
      <button className="counter-action increment" onClick={function(){props.onChange(+1)}}>+</button>
    </div>
  );
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
};

var Player = function(props){

  return (
    <div className="player">
      <div className="player-name">
      <a className="remove-player" onClick={props.onRemove}>x</a>
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score}  onChange={props.onScoreChange} />
      </div>
    </div>
  );
};

Player.propTypes = {
  onScoreChange: React.PropTypes.func.isRequired,
  score: React.PropTypes.number.isRequired,
  onRemove: React.PropTypes.func.isRequired
};

var Stats = function(props){
  var totalPlayers = props.players.length;
  var totalPoints = props.players.reduce(function(total, player){ 
    return total + player.score;
  },0);

  return (
    <table className="stats">
      <thead></thead>
      <tbody>
        <tr>
          <td>Players:</td><td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total Points:</td><td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  );
};



var Stopwatch = React.createClass({

  getInitialState: function(){
    return {
      isRunning: false,
      elapsedTime: 0,
      previousTime: 0,
    };
  },

  onTick: function(){
    if(this.state.isRunning){
      var now = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
      });
    }
  },

  componentDidMount: function(){
    this.interval =  setInterval(this.onTick, 100);
  },

  componentWillUnmount: function(){
   clearInterval(this.interval);
  },

  toggleStartStop: function(){
    if(this.state.isRunning){
      this.onStop();
    }else{
      this.onStart();
    }
  },

  onStart: function(){
    this.setState({
      isRunning: true,
      previousTime: Date.now(),
    });
  },

  onStop: function(){
    this.setState({
      isRunning: false,
    })
  },

  reset: function(){
    this.setState({
      elapsedTime: 0,
      previouwTime: Date.now(),
    })
  },

  seconds: function(){
   return Math.floor(this.state.elapsedTime/1000)
  },

  render: function(){
    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2> 
        <div className="stopwatch-time">{this.seconds()}</div>
         <button onClick={this.toggleStartStop}>{this.state.isRunning ? "Stop" : "Start"}</button>
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }

});

Stats.propTypes = {
  players: React.PropTypes.array.isRequired,
};


var AddPlayerForm = React.createClass({

  propTypes: {
    onAdd: React.PropTypes.func.isRequired,
  },

  getInitialState: function(){
    return {
      name: "",
    };
  },

  onNameChange: function(e){
    this.state.name = e.target.value;
    this.setState(this.state);
  },

  onSubmit: function(e){
    e.preventDefault();
    this.props.onAdd(this.state.name);
    this.setState({name: ""});
  },

  render: function(){ 
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.name} onChange={this.onNameChange}/>
          <input type="submit" />
        </form>
      </div>
    );
  }
});


var Application = React.createClass( {

  propTypes: {
    title: React.PropTypes.string,
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape(
      {
        name: React.PropTypes.string.isRequired,
        score: React.PropTypes.number.isRequired,
        id: React.PropTypes.number.isRequired
      }
    )).isRequired
  },

  onScoreChange: function(delta, index){
    this.state.players[index].score += delta;
    this.setState(this.state);
  }, 

  onAddPlayer: function(name){
    this.state.players.push({
      name: name,
      score: 0,
      id: nextId,
    });
   
    nextId +=1;
    this.setState(this.state);
  },

  onRemovePlayer: function(index){
    this.state.players.splice(index);
    this.setState(this.state);
  },

  getDefaultProps: function(){
    return {
      title: "My Scoreboard"
    }
  },

  getInitialState: function(){
    return {
      players: this.props.initialPlayers,
    };
  },



  render: function(){
    return (
      <div className="scoreboard">
        <Header title={this.props.title} players={this.state.players} />
        <div className="players">
          {
            this.state.players.map(function(player, index){
              return(<Player 
                onScoreChange={function(delta){this.onScoreChange(delta, index)}.bind(this)}
                onRemove={function(){this.onRemovePlayer(index)}.bind(this)}
                name={player.name} 
                score={player.score} 
                key={player.id} />
                    );
            }, this)
          }
        </div>
        <AddPlayerForm onAdd={this.onAddPlayer} />
      </div>
    );
  }
});




ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'));
