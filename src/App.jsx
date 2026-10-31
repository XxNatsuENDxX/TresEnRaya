import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'

import { WinnerModal } from './components/WinnerModal.jsx'
import { GameHeader } from './components/GameHeader.jsx'
import { GameBoard } from './components/GameBoard.jsx'
import { TurnIndicator } from './components/TurnIndicator.jsx'
import { PlayerSetupModal } from './components/PlayerSetupModal.jsx'
import { PlayerConfirmationModal } from './components/PlayerConfirmationModal.jsx'
import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'
import { playMoveSound, playWinSound, playTieSound } from './logic/sounds.js'

function App() {
    // Inicialización perezosa del estado desde localStorage
    const [board, setBoard] = useState(() => {
        const boardFromStorage = window.localStorage.getItem('board')
        return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
    })

    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem('turn')
        return turnFromStorage ?? TURNS.X
    })

    const [players, setPlayers] = useState(() => ({
        [TURNS.X]: window.localStorage.getItem('playerX') ?? '',
        [TURNS.O]: window.localStorage.getItem('playerO') ?? ''
    }))

    // null = en juego, false = empate, o el ganador (X u O)
    const [winner, setWinner] = useState(null)
    const [confirmPlayers, setConfirmPlayers] = useState(false)

    // Persistencia automática del juego
    useEffect(() => {
        saveGameToStorage({ board, turn })
    }, [turn, board])

    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(TURNS.X)
        setWinner(null)
        setConfirmPlayers(Boolean(players[TURNS.X] && players[TURNS.O]))
        resetGameStorage()
    }

    const keepPlayers = () => {
        setConfirmPlayers(false)
    }

    const changePlayers = () => {
        setPlayers({ [TURNS.X]: '', [TURNS.O]: '' })
        setConfirmPlayers(false)
        window.localStorage.removeItem('playerX')
        window.localStorage.removeItem('playerO')
    }

    const startGame = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const nextPlayers = {
            [TURNS.X]: formData.get('playerX').trim(),
            [TURNS.O]: formData.get('playerO').trim()
        }

        if (!nextPlayers[TURNS.X] || !nextPlayers[TURNS.O]) return

        setPlayers(nextPlayers)
        setConfirmPlayers(false)
        window.localStorage.setItem('playerX', nextPlayers[TURNS.X])
        window.localStorage.setItem('playerO', nextPlayers[TURNS.O])
    }

    const updateBoard = (index) => {
        // Bloquear si la casilla ya está ocupada o ya hay un ganador
        if (board[index] || winner !== null) return

        // 1. Crear el nuevo tablero
        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)

        // 2. Reproducir sonido de movimiento
        playMoveSound(turn === TURNS.X)

        // 3. Evaluar si el movimiento actual generó un ganador o un empate
        const winningResult = checkWinnerFrom(newBoard)

        if (winningResult) {
            playWinSound()
            confetti({
                particleCount: 120,
                spread: 80,
                colors: ['#002D62', '#CE1126', '#FFFFFF'] // Colores patrios de RD 🇩🇴
            })
            setWinner(winningResult)
        } else if (checkEndGame(newBoard)) {
            playTieSound()
            setWinner(false) // Empate
        } else {
            // 4. Si el juego continúa, cambiar el turno
            const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
            setTurn(newTurn)
        }
    }

    return (
        <main className='board'>
            <GameHeader players={players} resetGame={resetGame} />
            <GameBoard board={board} updateBoard={updateBoard} />
            <TurnIndicator turn={turn} players={players} />

            <WinnerModal resetGame={resetGame} winner={winner} players={players} />

            {confirmPlayers ? (
                <PlayerConfirmationModal
                    players={players}
                    keepPlayers={keepPlayers}
                    changePlayers={changePlayers}
                />
            ) : !players[TURNS.X] || !players[TURNS.O] ? (
                <PlayerSetupModal startGame={startGame} />
            ) : null}
        </main>
    )
}

export default App