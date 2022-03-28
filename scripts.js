const players = [
    "You", 
    "Computer"
];

const moves = [
    "fa-hand-rock",
    "fa-hand-paper",
    "fa-hand-scissors",
];

const m = {
        rock: moves[0],
        paper: moves[1],
        scissor: moves[2]
    }

const p = {
    user: players[0],
    computer: players[1]
}

let pScore = 0, cScore = 0;

const rockBtn = document.querySelector("#rock-move");
const paperBtn = document.querySelector("#paper-move");
const scissorsBtn = document.querySelector("#scissors-move");
const placeHolders = [...document.querySelectorAll("i.placeholder")];
const playerMove = placeHolders[0];
const computerMove = placeHolders[1];
const playerMoveContainer = document.querySelector("div.playerMove");
const computerMoveContainer = document.querySelector("div.computerMove");
const pScoreElement = document.querySelector("#pScore");
const cScoreElement = document.querySelector("#cScore");
const winnerElement = document.querySelector("#winner");
const winnerContainer = document.querySelector("#winnerP");


const getComputerMove = () => {
    return moves[Math.floor(Math.random() * 3)]
};

const removePlaceholder = () => {
    placeHolders.forEach(i => {
        i.classList.remove("placeholder");
    });
};

const setPMove = (move, style) => {
    playerMove.classList.remove(...playerMove.classList);
    playerMoveContainer.classList.remove(...playerMoveContainer.classList);
    playerMove.classList.add("far", move);
    playerMoveContainer.classList.add(style);
};

const setCMove = (move, style) => {
    computerMove.classList.remove(...computerMove.classList);
    computerMoveContainer.classList.remove(...computerMoveContainer.classList);
    computerMove.classList.add("far", move);
    computerMoveContainer.classList.add(style);
}

const setMove = (move, player) => {

    if(move === m.rock){
        player === p.user 
            ? setPMove(m.rock, "pMove") 
            : setCMove(m.rock, "cMove");
    } else if(move === m.paper){
        player === p.user 
            ? setPMove(m.paper, "pMove") 
            : setCMove(m.paper, "cMove");
    } else if(move === m.scissor){
        player === p.user 
            ? setPMove(m.scissor, "pMoveScissor") 
            : setCMove(m.scissor, "cMoveScissor");
    } else {
        throw new Error("Error!")
    }
};

const compareMoves = (pMove, cMove) => {
    
    if(pMove === cMove){
        return undefined;
    }
    else if(pMove === m.rock){
        if(cMove === m.paper) return p.computer;
        else return p.user;
    }
    else if(pMove === m.paper){
        if(cMove === m.rock) return p.user;
        else return p.computer;
    } else {
        if(cMove === m.rock) return p.computer;
        else return p.user;
    }
}

const calculateScore = (winner) => {
    if(!winner) return;
    winner === p.user ? pScore++:cScore++;
}

const displayResults = (winner) => {
    pScoreElement.textContent = pScore;
    cScoreElement.textContent = cScore;
    winnerElement.textContent = !winner ? "Tie": winner;
    winnerContainer.classList.remove("hidden");
}

const playMove = (move) => {
    removePlaceholder();
    let cMove = getComputerMove();

    setMove(move, players[0]);
    setMove(cMove, players[1]);

    let roundWinner = compareMoves(move, cMove);
    calculateScore(roundWinner);
    displayResults(roundWinner);
}

rockBtn.addEventListener("click", () => playMove(m.rock));
paperBtn.addEventListener("click", () => playMove(m.paper));
scissorsBtn.addEventListener("click", () => playMove(m.scissor));