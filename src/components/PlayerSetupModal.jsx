import { TURNS } from '../constants.js'

export function PlayerSetupModal({ startGame }) {
    return (
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
    )
}
