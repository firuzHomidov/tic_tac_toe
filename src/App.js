import React, {useState} from 'react';
import styles from './App.module.css';

const initialState = {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
};

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const App = () => {
    const [state, setState] = useState(initialState);

    const handleSquareClick = (index) => {
        if (state.board[index] || state.winner) return;

        const newBoard = [...state.board];
        newBoard[index] = state.currentPlayer;

        const newPlayer = state.currentPlayer === 'X' ? 'O' : 'X';

        const winner = checkWinner(newBoard);

        setState({
            board: newBoard,
            currentPlayer: newPlayer,
            winner,
        });
    };

    const checkWinner = (board) => {
        for (let i = 0; i < winCombinations.length; i++) {
            const [a, b, c] = winCombinations[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const renderSquare = (index) => {
        return (
            <div className={styles.square} onClick={() => handleSquareClick(index)}>
                {state.board[index]}
            </div>
        );
    };

    const resetGame = () => {
        setState(initialState);
    };

    return (
        <div className={styles.App}>
            <h1>Игра Крестики и Нолики</h1>
            <div className={styles.board}>
                {state.board.map((square, index) => (
                    <div key={index} className={styles['square-container']}>
                        {renderSquare(index)}
                    </div>
                ))}
            </div>
            {state.winner && <h2>{`Победитель: ${state.winner}`}</h2>}
            {!state.winner && state.board.every((square) => square !== null) && (
                <h2>Это ничья!</h2>
            )}
            <button onClick={resetGame}>Новая игра</button>
        </div>
    );
};

export default App;
