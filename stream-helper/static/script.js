function textChanged() {
    console.log("Text changed");
}

// const p1_score = document.getElementById('player-1-score');
const p2_score = document.getElementById('player-2-score');

function decrementP1() {
    const p1_score = document.getElementById('player-1-score');
    if (parseInt(p1_score.value) !== 0) p1_score.value = parseInt(p1_score.value) - 1;
}

function incrementP1() {
    const p1_score = document.getElementById('player-1-score');
    p1_score.value = parseInt(p1_score.value) + 1;
}

function decrementP2() {
    const p2_score = document.getElementById('player-2-score');
    if (parseInt(p2_score.value) !== 0) p2_score.value = parseInt(p2_score.value) - 1;
}

function incrementP2() {
    const p2_score = document.getElementById('player-2-score');
    p2_score.value = parseInt(p2_score.value) + 1;
}