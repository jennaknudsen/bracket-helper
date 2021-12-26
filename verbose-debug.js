const verboseDebug = process.env.VERBOSE_DEBUG ? Boolean(process.env.VERBOSE_DEBUG) : true;

function debug(message) {
    if (verboseDebug) {
        console.log(message);
    }
}

module.exports = debug;