let lastChangeTime = 0;
const timeToUpdate = 2000;

function textChanged() {
    const currentTime = Date.now();
    lastChangeTime = currentTime;

    setTimeout(() => {
        if (currentTime === lastChangeTime) {
            console.log("Request sent to server. Payload:");

            const round = document.getElementById('round-name').value;
            const p1_name = document.getElementById('player-1').value;
            const p2_name = document.getElementById('player-2').value;
            const p1_score = document.getElementById('player-1-score').value;
            const p2_score = document.getElementById('player-2-score').value;
            const p1_losers = document.getElementById('player-1-losers').checked;
            const p2_losers = document.getElementById('player-2-losers').checked;

            const post_object = {
                round: round,
                p1_name: p1_name,
                p2_name: p2_name,
                p1_score: p1_score,
                p2_score: p2_score,
                p1_losers: p1_losers,
                p2_losers: p2_losers
            };

            console.log(post_object)

            fetch('http://localhost:3000/api', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post_object)
            }).then(data => data.json()).then((data) => {
                console.log('All values updated on server')
                document.getElementById('results-pre').innerHTML = 
                    JSON.stringify(data, null, '    ');
            });
        }
    }, timeToUpdate);
}

/**
 * These next four functions control the plus / minus on the interface
 */
function decrementP1() {
    const p1_score = document.getElementById('player-1-score');
    if (parseInt(p1_score.value) !== 0) { 
        p1_score.value = parseInt(p1_score.value) - 1;
        textChanged();
    }
}

function incrementP1() {
    const p1_score = document.getElementById('player-1-score');
    p1_score.value = parseInt(p1_score.value) + 1;
    textChanged();
}

function decrementP2() {
    const p2_score = document.getElementById('player-2-score');
    if (parseInt(p2_score.value) !== 0) {
        p2_score.value = parseInt(p2_score.value) - 1;
        textChanged();
    }
}

function incrementP2() {
    const p2_score = document.getElementById('player-2-score');
    p2_score.value = parseInt(p2_score.value) + 1;
    textChanged();
}

function resetWins() {
    document.getElementById('player-1-score').value = '0';
    document.getElementById('player-2-score').value = '0';
    document.getElementById('player-1-losers').checked = false;
    document.getElementById('player-2-losers').checked = false;
    textChanged();
}

function resetAll() {
    document.getElementById('round-name').value = '';
    document.getElementById('player-1').value = '';
    document.getElementById('player-2').value = '';
    document.getElementById('player-1-score').value = '0';
    document.getElementById('player-2-score').value = '0';
    document.getElementById('player-1-losers').checked = false;
    document.getElementById('player-2-losers').checked = false;
    textChanged();
}

// test code for websockets
const wsclient = new WebSocket('ws://localhost:3000');
wsclient.onmessage = message => {
    console.log('Got message from server via WebSocket');
    console.log(JSON.parse(message.data));
}