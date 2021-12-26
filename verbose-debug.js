// basic module that prints out verbose messages if VERBOSE_DEBUG is set
const verboseDebug = process.env.VERBOSE_DEBUG ? process.env.VERBOSE_DEBUG.toLowerCase() === 'true' : false;

function debug(message) {
    if (verboseDebug) {
        console.log(message);
    }
}

module.exports = debug;