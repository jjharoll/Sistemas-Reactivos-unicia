'use strict';
const chalk = require('chalk').default;
const CONFIG = require('peanut-restify/config');

const getGeneration = birthYear => {
  if (birthYear <= 1945) return 'Silenciosa';
  if (birthYear >= 1946 && birthYear <= 1964) return 'Baby Boomer';
  if (birthYear >= 1965 && birthYear <= 1980) return 'Generacion X';
  if (birthYear >= 1981 && birthYear <= 1997) return 'Millenial';
  if (birthYear >= 1998) return 'Generacion Z';
};

module.exports = (message, publishMessageOnQueue, markAsProcessed, log) => {
  const newMessage = {
    ...message,
    generation: getGeneration(message.birth_year),
  };

  publishMessageOnQueue(newMessage)
    .then(ack => {
      log(newMessage, chalk.yellow('Birth Date Calculated'), chalk.yellow(`Published to channel: ${chalk.redBright(CONFIG.get('QUEUE_EVENT_TO_PUBLISH'))} | ack: ${ack}`));
      markAsProcessed();
    })
    .catch(err => console.error(err));
};
