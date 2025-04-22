"use client"

import React, { useState } from 'react';

type SquareProps = {
  value: string | number,
  onSquareClick: React.MouseEventHandler
}


const Square = ({ value, onSquareClick }: SquareProps) => {
  return (
    <button className="square" style={{fontSize: 20}} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const area: Array<number | string> = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(area);

  function handleClick(i: number) {
    console.log(squares)
    if (calculateWinner(squares) || typeof squares[i] === "string") {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares: any) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function make_q_table() {
  const arr = Array(3 * 3**9).fill(null)
  const q_table = []

  while (arr.length) {
    q_table.push(arr.splice(0, 9))
  }

  return q_table
}