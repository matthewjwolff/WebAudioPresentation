var moduloOsc
var rangeGain

function modulate() {
  window.audioCtx = (window.audioCtx || new AudioContext())
  moduloOsc = audioCtx.createOscillator()
  var toneOsc = audioCtx.createOscillator()
  rangeGain = audioCtx.createGain()
  //amplify the modular oscillator from [-1.0, 1.0] (standard audio signal) to +/- this value (detune frequency)
  rangeGain.gain.value = 0.0 //multiplication except for signals
  //set modulation frequency to something not extreme
  moduloOsc.frequency.value = 200 //how often we fluctuate the 'carrier frequency' from -gain to +gain
  //central pitch of resulting tone
  toneOsc.frequency.value = 440
  //conect moduloOsc to the gainNode to amplify
  moduloOsc.connect(rangeGain)
  //connect the modulation part to the sound producing part
  //connect the output wave (set of values flucutating between -40.0 and 40.0 at a rate of 40 cycles per second) to the frequency of the toneOsc
  //this will fluctuate the frequency of the toneOsc, moving the wave from the pitch 440Hz between 400Hz and 480Hz at a rate of 40 fluctuations per second
  rangeGain.connect(toneOsc.frequency)
  //connect toneOsc to speakers
  toneOsc.connect(audioCtx.destination)
  //now start the oscillators
  moduloOsc.start()
  toneOsc.start()
}

function modulateFlux(event) {
  var val = event.srcElement.value
  rangeGain.gain.value = val
  document.getElementById('modvalue').innerHTML = val
}
