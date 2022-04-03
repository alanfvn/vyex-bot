# Vyex-Bot

This twitter bot posts a random sentence to your account. 
Every hour a random amount of words is pulled from the database 
to generate a sentence.


## Installation

In order  to use this bot you need [Node.js](https://nodejs.org/es/download/current/) and set the following environment variables:

* `KEY`: Your twitter api key. 
* `SECRET`: Your twitter secret.
* `TOKEN`: Your twitter token.
* `TOKEN_SECRET`: Your twitter token secret.

*all of the above can be obtained [here](https://developer.twitter.com/apps)*

* `DATABASE_URL`: The connection string for your postgres database.