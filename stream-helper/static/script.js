let lastChangeTime = 0;
const timeToUpdate = 2000;

function textChanged() {
    const currentTime = Date.now();
    lastChangeTime = currentTime;

    setTimeout(() => {
        if (currentTime === lastChangeTime) {
            console.log("Event fired");
            // SEND REQUEST HERE
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