const {random_num} = require('./util');
const {get_words} = require('../database/db_util');


/*
    This function returns a dictionary 
    containing the random sentence generated and also 
    the array of any urls found inside the sentence.
*/
async function gen_sentence(){
    const rndm = random_num(1, 10);
    const words = (await get_words(rndm)).map(x=>x.word);
    const phrase = words.join(' ');

    const _urls = get_urls(phrase);
    const sentence = format_text(phrase, _urls);

    return {
        text: sentence,
        urls: _urls
    }
}

function get_urls(text){
    const regex = new RegExp(/https?:.*?(?:.png|.jpg|.gif)/g);
    let urls = text.match(regex) ?? []
    return urls
}

function format_text(text, urls){
    urls.forEach(x => text = text.replace(x, ''));
    return text.trim().replace(/  +/g, ' ');
}

module.exports = {
    gen_sentence
}