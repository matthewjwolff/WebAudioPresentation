function startGain() {
  window.audioCtx = (window.audioCtx || new AudioContext())
  window.oscillator = audioCtx.createOscillator()
  window.gainNode = audioCtx.createGain()
  oscillator.connect(gainNode)
  gainNode.connect(audioCtx.destination)
  gainNode.gain.value = 0.05
  oscillator.start()
}

function gainValue(event) {
  if(gainNode)
    gainNode.gain.value = event.srcElement.value
}

function stopSlide() {
  gainNode.disconnect()
}
