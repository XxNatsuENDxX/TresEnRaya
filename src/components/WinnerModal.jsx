import { Square } from './Square.jsx'
import { PLAYERS } from '../constants.js'

export function WinnerModal({ winner, resetGame, players }) {
    if (winner === null) return null

    const winnerText = winner === false ? '¡Tranqué en el colmadón!' : '¡Qué palo! ¡Tenemos ganador!'
    const subText =
        winner === false
            ? 'Nadie cedió ni un chin. ¡Se armó un empate!'
            : `¡Coronó ${players[winner]} (${PLAYERS[winner]?.title})! 🇩🇴`

    return (
        <section className='winner'>
            <div className='text'>
                <h2>{winnerText}</h2>
                <p className='winner-subtext'>{subText}</p>

                <header className='win'>
                    {winner ? <Square>{winner}</Square> : <span className='tie-icon'>🇩🇴🤝🇩🇴</span>}
                </header>

                <footer>
                    <button onClick={resetGame}>Reiniciar partida</button>
                </footer>
            </div>
        </section>
    )
}