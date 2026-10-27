export const TURNS = {
    X: '×',
    O: '○'
}

export const PLAYERS = {
    [TURNS.X]: {
        name: 'Taíno',
        title: 'Jugador Quisqueya (X)',
        badge: '🔵 Taíno'
    },
    [TURNS.O]: {
        name: 'Caribe',
        title: 'Jugador Quisqueya (O)',
        badge: '🔴 Caribe'
    }
}

export const WINNER_COMBOS = [
    [0, 1, 2], // Horizontales
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Verticales
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonales
    [2, 4, 6]
]