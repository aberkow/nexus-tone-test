var $ = require("jquery");
//var nx = require('nexusUI');
var tone = require('tone');

var delay = new tone.FeedbackDelay('16n', 0.5).toMaster();

var sampler = new tone.Sampler({
  0: '../studderSchool.wav'
}, {
  player: {
    loop: true,
  }
}).connect(delay);



//the .onload method is deprecated. this is correct.
tone.Buffer.on('load', function(){
  waveform1.setBuffer(sampler._buffers[0]._buffer);
  waveform1.select(0, 500);
  //sampler.triggerAttack('0');
});

// tone.Buffer.onload = function(){
//   waveform1.setBuffer(sampler._buffers[0]._buffer);
//   waveform1.select(0, 500);
//   sampler.triggerAttack(0);
// }


//why can't I require nexusUI here?
nx.onload = function(){
  //start and stop the sampler.

  toggle1.on('*', function(data){
    debugger;
    if (data.value === 1){
      sampler.triggerAttack('0');
    } else {
      sampler.triggerRelease();
    }
  });
  //change the delay time
  dial1.on('*', function(data){
    delay.delayTime.value = data.value;
  });

  tilt1.on('*', function(data){

    if (data.x >== 0){
      sampler.reverse = false;
      sampler.player._playbackRate = data.x;
    } else {
      sampler.reverse = true;
      sampler.player._playbackRate = data.x * -1;
    }
  });


  nx.colorize('accent', '#1ac');
  waveform1.on('*', function(data){
    sampler.player.setLoopPoints(data.starttime/1000, data.stoptime/1000);
  });

  //set button1.mode = 'impulse' so that it only works on
  //click (as opp to button down and up)
  // button1.mode = 'impulse';
  // button1.on('*', function(data){
  //   console.log('button1 pressed');
  //   //sampler.retrigger = true lets the sample play back
  //   //many times w/o waiting until it's finished.
  //   sampler.retrigger = true;
  //   sampler.start();
  // });
  // //let the sampler loop.
  // toggle1.on('*', function(data){
  //   if (data.value === 1) {
  //     sampler.loop = true;
  //   } else {
  //     //sampler.loop needs to be set explicitly to false.
  //     //otherwise it loops forever.
  //     sampler.loop = false;
  //   }
  // });
  // waveform1.on('*', function(data){
  //   sampler.player.setLoopPoints(data.starttime/1000, data.stoptime/1000);
  // });

  // //change the delay feedback
  // dial2.on('*', function(data){
  //   delay.feedback.value = data.value;
  // });
  // //change the playback rate for sampler.
  // dial3.on('*', function(data){
  //   sampler.playbackRate = data.value;
  // });
}

//wav needed as audio format. possibly mp3 too?
// var sampler = new tone.Player('../studderSchool.wav', function(){
//   console.log('sample loaded');
// });

// var buffer = new tone.Buffer();
//
// buffer.onload = function(){
//   waveform1.setBuffer = (sampler._buffers[0]._buffer);
//   waveform1.select(0, 500);
//   sampler.triggerAttack('0');
//   //debugger;
// }

//var delay = new tone.FeedbackDelay('16n', 0.5).toMaster();

// sampler.connect(delay);
//sampler.toMaster();
