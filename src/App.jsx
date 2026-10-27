import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square.jsx'
import { WinnerModal } from './components/WinnerModal.jsx'
import { TURNS, PLAYERS } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'
import { playMoveSound, playWinSound, playTieSound } from './logic/sounds.js'

function App() {
    // Inicialización perezosa del estado leyendo desde localStorage (solo se ejecuta una vez)
    const [board, setBoard] = useState(() => {
        const boardFromStorage = window.localStorage.getItem('board')
        if (boardFromStorage) return JSON.parse(boardFromStorage)
        return Array(9).fill(null)
    })

    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem('turn')
        return turnFromStorage ?? TURNS.X
    })

    // null = no hay ganador, false = empate
    const [winner, setWinner] = useState(null)

    // Guardar el estado del juego en el navegador usando localStorage y useEffect
    useEffect(() => {
        saveGameToStorage({
            board,
            turn
        })
    }, [turn, board])

    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(TURNS.X)
        setWinner(null)
        resetGameStorage()
    }

    const updateBoard = (index) => {
        // No actualizamos esta posición si ya tiene algo o si ya hay un ganador
        if (board[index] || winner) return

        // Actualizar el tablero (inmutabilidad con spread operator)
        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)

        // Sonido local al marcar casilla
        playMoveSound(turn === TURNS.X)

        // Cambiar el turno entre X y O
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)

        // Revisar si hay ganador o empate con el nuevo tablero
        const newWinner = checkWinnerFrom(newBoard)
        if (newWinner) {
            playWinSound()
            confetti({
                particleCount: 120,
                spread: 80,
                colors: ['#002D62', '#CE1126', '#FFFFFF'] // Colores de la bandera RD
            })
            setWinner(newWinner)
        } else if (checkEndGame(newBoard)) {
            playTieSound()
            setWinner(false) // Empate
        }
    }

    return (
        <main className='board'>
            <div className='flag-banner'>🇩🇴</div>
            <h1>Tres en Raya Quisqueyano</h1>
            <p className='subtitle'>Duelo Patrio: <strong>Taíno (×)</strong> vs <strong>Caribe (○)</strong></p>

            <button className='reset-btn' onClick={resetGame}>
                Reiniciar
            </button>

            <section className='game'>
                {board.map((square, index) => {
                    return (
                        <Square
                            key={index}
                            index={index}
                            updateBoard={updateBoard}
                        >
                            {square}
                        </Square>
                    )
                })}
            </section>

            <section className='turn-container'>
                <p className='turn-label'>
                    Turno actual: <strong>{PLAYERS[turn].name}</strong> — <em>{PLAYERS[turn].title}</em>
                </p>
                <div className='turn'>
                    <Square isSelected={turn === TURNS.X}>
                        {TURNS.X}
                    </Square>
                    <Square isSelected={turn === TURNS.O}>
                        {TURNS.O}
                    </Square>
                </div>
            </section>

            <WinnerModal resetGame={resetGame} winner={winner} />
        </main>
    )
}

export default App