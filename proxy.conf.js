const PROXY_CONFIG = [
 {
        context: ['/bhsoftwaresback'],
        target: 'http://localhost/',
        secure: false,
        logLeval: 'debug',
  }
];

module.exports = PROXY_CONFIG;