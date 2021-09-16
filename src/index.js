const {startTweetSchedule} = require('./twitter/tw_util')
const {loadWords} = require('./util/words_util')


loadWords().then(()=>{
    startTweetSchedule();
});


