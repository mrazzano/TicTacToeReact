const MAX_MOVES = 9;

class Board extends React.Component {
	renderSquare(i) {
		return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
	}
	render() {
		var cells = [];
		for(var i = 0; i < MAX_MOVES; i++)
			cells.push(this.renderSquare(i));
		
		return (<div>{cells}</div>);
	}
}

class Game extends React.Component {
	constructor() {
		super();
		this.resetGame();
	}
	render() {
		const history = this.state.history;
		const current = history[this.state.moves];
		const winner = calculateWinner(current.squares);
		
		let status = '';
		let cssClass = 'winner ';
		if (winner) {
			status = 'WINNER!'
			this.state.isGameOver = true;
			cssClass += winner === 'X' ? ' xSymbol' : ' oSymbol'
		} 
		else if(this.state.moves === MAX_MOVES){
			status = 'DRAW!';
			this.state.isGameOver = true;
		}
		return (
			<div className="board">
			<div className="cell-matrix">
				<Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
			</div>
			<div className={['popover', this.state.isGameOver ? '' : ' hidden'].join(' ')}>
				<div className={cssClass}></div>
				<h1 className="label">{status}</h1>
			</div>
			<div className="restart-game">
				<div className="restart-game-button" onClick={()=> this.resetGame(true)}>RESTART GAME</div>
			</div>
			</div>
		);
	}
	handleClick(i) {
		const history = this.state.history;
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				squares: squares
			}]),
			xIsNext: !this.state.xIsNext,
			moves: history.length
		});
	}
	resetGame(redraw){
		 this.state = {
			history: [{
				squares: Array(9).fill(null)
			}],
			moves: 0,
			xIsNext: true,
			isGameOver: false
		};

		if(redraw) {
			this.forceUpdate();
		}
	}
}

// ========================================
React.render(
	<Game />,
	document.getElementById('container')
);

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

function Square(props) {
	var cssClass = 'cell ';
	if(props.value === 'X') {
		cssClass += 'xSymbol';
	}
	else if (props.value === 'O') {
		cssClass += 'oSymbol';
	}
	return (
		<button className={cssClass} onClick={() => props.onClick()}></button>
	);
}
