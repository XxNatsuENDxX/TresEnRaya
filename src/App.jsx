import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square.jsx'
import { WinnerModal } from './components/WinnerModal.jsx'
import { TURNS, PLAYERS } from './constants.js'
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
            <div className='flag-banner'>🇩🇴</div>
            <h1>Cero Mata Cero Quisqueyano</h1>
            <p className='subtitle'>
                Duelo Patrio: <strong>{players[TURNS.X] || 'Jugador X'} ({TURNS.X})</strong> vs{' '}
                <strong>{players[TURNS.O] || 'Jugador O'} ({TURNS.O})</strong>
            </p>

            <button className='reset-btn' onClick={resetGame}>
                Reiniciar Partida
            </button>

            <section className='game'>
                {board.map((square, index) => (
                    <Square
                        key={index}
                        index={index}
                        updateBoard={updateBoard}
                    >
                        {square}
                    </Square>
                ))}
            </section>

            <section className='turn-container'>
                <p className='turn-label'>
                    Turno actual: <strong>{players[turn]}</strong> — <em>{PLAYERS[turn].title}</em>
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

            <WinnerModal resetGame={resetGame} winner={winner} players={players} />

            {confirmPlayers ? (
                <section className='winner player-confirmation'>
                    <div className='text'>
                        <h2>¿Seguirán jugando los mismos?</h2>
                        <p className='winner-subtext'>
                            ¿{players[TURNS.X]} y {players[TURNS.O]} continuarán en la próxima partida?
                        </p>
                        <div className='confirmation-actions'>
                            <button type='button' onClick={keepPlayers}>Sí, somos los mismos</button>
                            <button type='button' onClick={changePlayers}>No, cambiar nombres</button>
                        </div>
                    </div>
                </section>
            ) : !players[TURNS.X] || !players[TURNS.O] ? (
                <section className='winner setup-modal'>
                    <form className='text setup-form' onSubmit={startGame}>
                        <h2>¿Quiénes van a jugar?</h2>
                        <p className='winner-subtext'>Escriban sus nombres para comenzar la partida.</p>

                        <label htmlFor='player-x'>Jugador de {TURNS.X}</label>
                        <input id='player-x' name='playerX' type='text' placeholder='Nombre del jugador X' autoFocus required />

                        <label htmlFor='player-o'>Jugador de {TURNS.O}</label>
                        <input id='player-o' name='playerO' type='text' placeholder='Nombre del jugador O' required />

                        <button type='submit'>Comenzar partida</button>
                    </form>
                </section>
            ) : null}
        </main>
    )
}

export default App