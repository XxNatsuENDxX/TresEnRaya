const playTone = (freq, type, duration, delay = 0) => {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext
        if (!AudioCtx) return
        const ctx = new AudioCtx()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = type
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay)

        gain.gain.setValueAtTime(0.15, ctx.currentTime + delay)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(ctx.currentTime + delay)
        osc.stop(ctx.currentTime + delay + duration)
    } catch {
        // Ignorar si el navegador bloquea el audio antes de interacción
    }
}

export const playMoveSound = (isX) => {
    // Sonido tipo golpe de clave/tambora distinto para Taíno (X) y Caribe (O)
    playTone(isX ? 520 : 380, 'triangle', 0.12)
}

export const playWinSound = () => {
    // Fanfarria alegre estilo acorde mayor
    playTone(523.25, 'sine', 0.18, 0)    // Do
    playTone(659.25, 'sine', 0.18, 0.12) // Mi
    playTone(783.99, 'sine', 0.18, 0.24) // Sol
    playTone(1046.5, 'triangle', 0.4, 0.36) // Do alto
}

export const playTieSound = () => {
    playTone(300, 'sawtooth', 0.2, 0)
    playTone(240, 'sawtooth', 0.3, 0.2)
}