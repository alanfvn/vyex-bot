const {Client} = require('pg');
const table = 'vyexbot';

const client = new Client({
    connectionString: process.env.database_url,
    ssl: { rejectUnauthorized: false }
});


/*
    ngl this feels a bit hacky
    need to find a proper way (?) 
    to pull random words from the database.
*/

async function get_words(amount){
    await client.connect()
    const words = await client.query(
        `select * from get_random_word(${amount})`
    )
    //query: https://stackoverflow.com/a/23897463
    await client.end()
    return words.rows;
}

module.exports = {
    get_words,
}