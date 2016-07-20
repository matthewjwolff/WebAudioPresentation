function oscillate() {
  window.audioCtx = (window.audioCtx || new AudioContext())
  window.oscillator = audioCtx.createOscillator()
  oscillator.frequency.value = 440
  oscillator.connect(audioCtx.destination)
  oscillator.start()
}

function stop() {
  oscillator.stop()
  oscillator.disconnect()
  oscillator = null
}
