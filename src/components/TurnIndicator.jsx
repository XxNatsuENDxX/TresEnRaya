import { Square } from './Square.jsx'
import { TURNS, PLAYERS } from '../constants.js'

export function TurnIndicator({ turn, players }) {
    return (
        <section className='turn-container'>
            <p className='turn-label'>
                Turno actual: <strong>{players[turn]}</strong> — <em>{PLAYERS[turn].title}</em>
            </p>
            <div className='turn'>
                <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
                <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
            </div>
        </section>
    )
}
