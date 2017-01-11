Vue.component('sub-split',{
  props: ['split'],
  template: '<li class="split-time">{{ split.split }}</li>'
})

Vue.component('cum-split',{
  props: ['split'],
  template: '<li class="split-time">{{ split.split }}</li>'
})

var vm = new Vue({
  el: '#main',
  data: {
    minutes: 00,
    seconds: 00,
    hundreths: 00,
    splitMin: 00,
    splitSec: 00,
    splitHund: 00,
    cumulativeSplit: '',
    subtractedSplit: '',
    cumSplitsArray: [],
    subSplitsArray: [],
    clockisRunning: false,
    stopClearText: 'CLEAR',
    startSplitText: 'START',
  },
  methods: {
    startTimer: function(){
      var self = this;
      if(self.clockisRunning){
        self.startSplitText = 'SPLIT';
        self.getSplit();
      }else {
        self.startSplitText = 'SPLIT';
        self.stopClearText = 'STOP';
        self.clockisRunning = true;
        self.running = setInterval(function(){
          self.time++;
          self.hundreths+=01
          if(self.hundreths === 99){
            self.hundreths = 00;
            self.seconds +=01;
            if(self.seconds === 59){
              self.seconds = 00;
              self.minutes +=1;
            }
          }
        }, 10)
      }

    },
    getSplit: function(){
      var self = this;
      //If the watch has been running, record the split
      if(self.clockisRunning){
        let mins = self.minutes;
        let secs = (self.seconds).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        let hunds = (self.hundreths).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        let splitM = self.splitMin;
        let splitS = (self.splitSec).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        let splitH = (self.splitHund).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

        //Strings to push into the arrays for their respective splits
        self.cumulativeSplit = mins+":"+secs+"."+hunds;
        self.subtractedSplit = splitM+":"+splitS+"."+splitH;

        //Adds cumulative split to it's own array, and adds the subtracted split to a separate array. If there have been no splits recorded, the cumulative split will count as the subtracted split.
        self.cumSplitsArray.unshift({split: self.cumulativeSplit});
        if(self.subSplitsArray.length === 0){
          self.subSplitsArray.unshift({split: self.cumulativeSplit});
        }else {
          self.subSplitsArray.unshift({split: self.subtractedSplit});
        }
        //Will clear the running split clock and then reset values to 0 before calling it again. Sloppy and poor coding but worked in a crunch. Will fix this to be actual math and subtracted splitting from overall time.
        clearInterval(self.subtracting);
        self.splitHund = 00;
        self.splitSec = 00;
        self.splitMin = 00;
        self.subtractSplit();
      }
    },
    //Starts a new clock that is able to get the time between split calls
    subtractSplit: function(){
      var self = this;
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
    //Will change the button text to clear, and stop the running clock timer. If the clear button is pressed, all time values will be reset.
    stopTimer: function(){
      var self = this;
      self.stopClearText = 'CLEAR';
      self.startSplitText = 'START';
      if(self.clockisRunning === false){
        while(self.subSplitsArray.length > 0){
          self.subSplitsArray.pop();
          self.cumSplitsArray.pop();
        }
        self.clearClock();
      }else {
        //Will add a subtracted and cumulative split to the arrays so that final time and final split are recorded and will clear the intervals on both functions
        self.getSplit();
        self.clockisRunning = false;
        clearInterval(self.running);
        clearInterval(self.subtracting);
      }
    },
    //Resets all clock values back to 0.
    clearClock: function(){
      var self = this;
      self.minutes = 00;
      self.seconds = 00;
      self.hundreths = 00;
      self.splitMin = 00;
      self.splitSec = 00;
      self.splitHund = 00;
    }
  }
});
