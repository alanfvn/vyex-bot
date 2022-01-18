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
        `select word_id, word from (select floor(random()*(select count(*) from ${table})+1) `+
        `as  row_number from generate_series(1, ${amount})) rwr join (select *, row_number() over () `+
        `from ${table}) original using (row_number)`
    )
    //query: https://stackoverflow.com/a/23897463
    await client.end()
    return words.rows;
}

module.exports = {
    get_words,
}