/* --- constants --- */
const lookup = {
    '1': 'black',
    '-1': 'white',
    'null': 'transparent'
};

/* --- app's state (variables) --- */
let board; // Array of column arrays with 1, -1, or null
let turn; // 1 or -1 (player)
let king; // A king piece when a checker gets to the other end
let winner; // 1 = Player 1; -1 = Player 2; null = no winner

/* --- cached element refrences --- */
const message = document.querySelector('h1');
/* --- event listeners --- */
document.querySelector('button').addEventListener('click', init);
/* --- functions --- */
init();

function render() {
    // board.forEach(function(sq, idx) {
    //     squares
    // })
    if(winner) {
        message.innerHTML = `Congrats ${lookup[winner].toUpperCase()}!`;
    } else {
        message.innerHTML = `${lookup[turn].toUpperCase()}'s Turn`;
    }
};

// Array.from(squares.children).forEach(function(cell) {
//     cell.onclick = function(element) {
//         if(element.target.innerHTML === )
//     }
// })

// function handleKing(squares.children) {
//     // Create a king piece when a piece reaches the other end of the board
// }

function handleMove(evt) {
    //Get square index
    const idx = parseInt(evt.target.id.replace('sq', ''));
    if(board[idx] || winner) return;
    //update state variables
    board[idx] = turn;
    turn *= -1;
    render();
}

function cellClick(cell) {
    const black = cell.children[0];
    const white = cell.children[1];
    if(!black.hidden && white.hidden) { //black Checker is on cell, Remove black Checker
        black.hidden = true;
        white.hidden = false;
    } else if(black.hidden && !white.hidden) { //white Checker is on cell, Remove white Checker
        black.hidden = true;
        white.hidden = true;
    } else if(black.hidden && white.hidden) { //No Checker is on cell, Add a Checker (black will show first) 
        black.hidden = false;
        white.hidden = true;
    }
}

function init() {
    board = [
        [null,-1,null,-1,null,-1,null,-1],
        [-1,null,-1,null,-1,null,-1,null],
        [null,-1,null,-1,null,-1,null,-1],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [1,null,1,null,1,null,1,null],
        [null,1,null,1,null,1,null,1],
        [1,null,1,null,1,null,1,null]
        ];
    turn = 1;
    winner = null;
    render();
};