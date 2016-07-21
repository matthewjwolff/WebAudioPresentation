var audioData

(() => {
  var request = new XMLHttpRequest()
  request.open('GET', 'https://dl.dropboxusercontent.com/u/37873577/allstar.mp3', true)
  request.responseType = 'arraybuffer'
  request.onload = () => {
    audioData = request.response
  }
  request.send()
})()

var audioBuffer
var source

function decodeAndPlay() {
  window.audioCtx = (window.audioCtx || new AudioContext())
  //create an AudioBufferSourceNode
  source = audioCtx.createBufferSource()
  //Decode audio data. On completion execute function with AudioBuffer node containing decoded audio
  audioCtx.decodeAudioData(audioData, (buffer) => {
    //Add the buffer to the AudioBufferSourceNode
    source.buffer = buffer
    //keep track of this buffer
    audioBuffer = buffer
    source.connect(audioCtx.destination)
    //what if smash mouth were anime?
    source.detune.value = 1000
    source.start()
  })
}

function cutItOut() {
  source.stop()
}

function chorus() {
  mainSource = audioCtx.createBufferSource()
  chorusSource = audioCtx.createBufferSource()
  mainSource.buffer = audioBuffer
  chorusSource.buffer = audioBuffer
  var lfo = audioCtx.createOscillator()
  var lfoGain = audioCtx.createGain()
  lfoGain.gain.value = 50
  lfo.frequency.value = 10
  lfo.connect(lfoGain)
  lfo.start()
  lfoGain.connect(chorusSource.detune)
  mainSource.connect(audioCtx.destination)
  chorusSource.connect(audioCtx.destination)
  mainSource.start()
  chorusSource.start()
}

function stopChorus() {
  mainSource.stop()
  chorusSource.stop()
}

//https://github.com/cwilso/Audio-Input-Effects
//I got lazy
function flanger() {
  window.audioContext = (window.audioCtx || new AudioContext())
  var delayNode = audioContext.createDelay();
    delayNode.delayTime.value = .005;

    var inputNode = audioContext.createGain();
    tone = audioContext.createOscillator()
    tone.connect(inputNode)
    var feedback = audioContext.createGain();
    var osc = audioContext.createOscillator();
    var gain = audioContext.createGain();
    gain.gain.value = .002;

    feedback.gain.value = .5;

    osc.type = 'sine';
    osc.frequency.value = 0.75;

    osc.connect(gain);
    gain.connect(delayNode.delayTime);

    inputNode.connect( audioContext.destination );
    inputNode.connect( delayNode );
    delayNode.connect( audioContext.destination );
    delayNode.connect( feedback );
    feedback.connect( inputNode );

    osc.start(0);
    tone.start()
}

function stopFlanger() {
  tone.stop()
}
