
Vue.component('sub-split',{
  props: ['split'],
  template: '<li>{{ split.split }}</li>'
})


Vue.component('cum-split',{
  props: ['split'],
  template: '<li>{{ split.split }}</li>'
})

var vm = new Vue({
  el: '#main',
  data: {
    minutes: 00,
    seconds: 00,
    hundreths:00,
    splitMin: 00,
    splitSec: 00,
    splitHund: 00,
    cumulativeSplit: '',
    subtractedSplit: '',
    cumSplitsArray: [],
    subSplitsArray: [],
    buttontext: 'STOP',
  },
  methods: {
    startTimer: function(){
      let self = this;
      console.log('hello I started');
      self.running = setInterval(function(){
        self.time++;

        self.hundreths++
        if(self.hundreths === 99){
          self.hundreths = 00;
          self.seconds +=1;
          if(self.seconds === 59){
            self.seconds = 00;
            self.minutes +=1;
          }
        }
      }, 10)
    },
    getSplit: function(){
      let self = this;

      let mins = self.minutes
      let secs = (self.seconds).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
      let hunds = (self.hundreths).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
      let splitM = self.splitMin
      let splitS = (self.splitSec).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
      let splitH = (self.splitHund).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

      self.cumulativeSplit = mins+":"+secs+"."+hunds;
      self.subtractedSplit = splitM+":"+splitS+"."+splitH;

      self.cumSplitsArray.push({split: self.cumulativeSplit});

      if(self.subSplitsArray.length === 0){
        self.subSplitsArray.push({split: self.cumulativeSplit});
      }else {
        self.subSplitsArray.push({split: self.subtractedSplit});
      }

      console.log(self.cumulativeSplit);
      console.log(self.subtractedSplit);

      clearInterval(self.subtracting);
      self.splitHund = 00;
      self.splitSec = 00;
      self.splitMin = 00;
      self.subtractSplit();
    },
    subtractSplit: function(){
      let self = this;
      self.subtracting = setInterval(function(){
        self.splitHund++
        if(self.splitHund === 99){
          self.splitHund = 00;
          self.splitSec +=1;
          if(self.splitSec === 59){
            self.splitSec = 00;
            self.splitMin +=1;
          }
        }
      }, 10)
    },
    stopTimer: function(){
      let self = this;
      self.getSplit();
      // console.log(self.cumulativeSplit);
      // console.log(self.subtractedSplit);
      clearInterval(self.running);
      clearInterval(self.subtracting);
    }
  }
});
