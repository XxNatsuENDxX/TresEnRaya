import { TURNS } from '../constants.js'

export function PlayerConfirmationModal({ players, keepPlayers, changePlayers }) {
    return (
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
    )
}
