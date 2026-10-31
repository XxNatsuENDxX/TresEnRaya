import { TURNS } from '../constants.js'

export function GameHeader({ players, resetGame }) {
    return (
        <>
            <div className='flag-banner'>🇩🇴</div>
            <h1>Cero Mata Cero Quisqueyano</h1>
            <p className='subtitle'>
                Duelo Patrio: <strong>{players[TURNS.X] || 'Jugador X'} ({TURNS.X})</strong> vs{' '}
                <strong>{players[TURNS.O] || 'Jugador O'} ({TURNS.O})</strong>
            </p>
            <button className='reset-btn' onClick={resetGame}>
                Reiniciar Partida
            </button>
        </>
    )
}
