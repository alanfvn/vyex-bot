const fs = require('fs').promises
const {randomNum, randomItem} = require('./util');
let words = null

/*
    This function returns a dictionary containing the random
    sentence generated and also the array of urls if theres.
*/
function genSentence(){
    const max_wrd_size = randomNum(5, 140);
    let wrd_count = 0;
    let sentence = ''

    for(let i = 0; i < words.length; i++){
        let wrd = randomItem(words);
        wrd_count += wrd.length;
        if(max_wrd_size < wrd_count){break}
        sentence +=' '+wrd;
    }
    
    let _urls = getUrls(sentence);
    sentence = formatText(sentence, _urls);
 
    return {
        text: sentence,
        urls: _urls
    }
}

function getUrls(text){
    const regex = new RegExp(/https?:.*?(?:.png|.jpg|.gif)/g);
    let urls = text.match(regex) ?? []
    return urls
}

function formatText(text, urls){
    urls.forEach(x => text = text.replace(x, ''));
    return text.trim().replace(/  +/g, ' ');
}

//call this function if you need to reload the words.json file.
async function loadWords(){
    const data = await fs.readFile('words.json');
    words = await JSON.parse(data);
}

module.exports = {
    genSentence,
    loadWords,
}