/* --- constants --- */
const lookup = {
    '1': 'black',
    '-1': 'white',
    'null': 'transparent'
};

//Array of checker pieces as objects
const checkers = [
    {row: 1, cell: 2, color: 'white'},
    {row: 1, cell: 4, color: 'white'},
    {row: 1, cell: 6, color: 'white'},
    {row: 1, cell: 8, color: 'white'},
    {row: 2, cell: 1, color: 'white'},
    {row: 2, cell: 3, color: 'white'},
    {row: 2, cell: 5, color: 'white'},
    {row: 2, cell: 7, color: 'white'},
    {row: 3, cell: 2, color: 'white'},
    {row: 3, cell: 4, color: 'white'},
    {row: 3, cell: 6, color: 'white'},
    {row: 3, cell: 8, color: 'white'},
    {row: 6, cell: 1, color: 'black'},
    {row: 6, cell: 3, color: 'black'},
    {row: 6, cell: 5, color: 'black'},
    {row: 6, cell: 7, color: 'black'},
    {row: 7, cell: 2, color: 'black'},
    {row: 7, cell: 4, color: 'black'},
    {row: 7, cell: 6, color: 'black'},
    {row: 7, cell: 8, color: 'black'},
    {row: 8, cell: 1, color: 'black'},
    {row: 8, cell: 3, color: 'black'},
    {row: 8, cell: 5, color: 'black'},
    {row: 8, cell: 7, color: 'black'},
]

/* --- app's state (variables) --- */
let board; // Array of column arrays with 1, -1, or null
let turn; // 1 or -1 (player)
let king; // A king piece when a checker gets to the other end
let winner; // 1 = Player 1; -1 = Player 2; null = no winner
let selectedChecker = undefined; // A variable for when a checker is clicked and becomes a selected checker

/* --- cached element refrences --- */
const message = document.querySelector('h1');

/* --- event listeners --- */
document.querySelector('button').addEventListener('click', init);

/* --- functions --- */
init();

function render() {
    
    if(winner) {
        message.innerHTML = `Congrats ${lookup[winner].toUpperCase()}!`;
    } else {
        message.innerHTML = `${lookup[turn].toUpperCase()}'s Turn`;
    }
};

//Function that will render board layout
function renderBoard() {
    return `
        ${renderRow(1)}
        ${renderRow(2)}
        ${renderRow(3)}
        ${renderRow(4)}
        ${renderRow(5)}
        ${renderRow(6)}
        ${renderRow(7)}
        ${renderRow(8)}
    `
}

//Function that will create each row in board
function renderRow(rowNumber) {
    return `
        <div id="row-${rowNumber}" class="row">
            ${renderCell(rowNumber, 1)}
            ${renderCell(rowNumber, 2)}
            ${renderCell(rowNumber, 3)}
            ${renderCell(rowNumber, 4)}
            ${renderCell(rowNumber, 5)}
            ${renderCell(rowNumber, 6)}
            ${renderCell(rowNumber, 7)}
            ${renderCell(rowNumber, 8)}
        </div>
    `
}

//Function that will tile pieces for each row
function renderCell(rowNumber, cellNumber) {
    if(cellColor(cellNumber, rowNumber) === 'black') {
        return `<div id="cell-${rowNumber}-${cellNumber}" class="cell black"></div>`
    } else {
        return `<div id="cell-${rowNumber}-${cellNumber}" class="cell white"></div>`
    }
}

//Function that will render the checker pieces 
function renderCheckerPiece(i, color) {
    if(checkers[i].isKing) {
        return `<div id="checker-${i}" class="checker ${color}-checker" checkerIdx="${i}">
            <img id="king" src="images/king-icon.png">
        </div>`;
    } else {
    return `<div id="checker-${i}" class="checker ${color}-checker" checkerIdx="${i}"></div>`;
    }
}

//Function that will render the placement of the checkers a.k.a the render function
function renderCheckers() {
    clearCheckers();
    $(`.black.cell`).click(moveChecker);
    for(let i = 0; i < checkers.length; i++) {
        let checker = checkers[i];
        if(checker.row && checker.cell) {
            $(`#cell-${checker.row}-${checker.cell}`).html(renderCheckerPiece(i, checker.color));
            $(`#cell-${checker.row}-${checker.cell}`).unbind('click');
        } else {
            $(`#captured-${checker.color}`)
                .append(`<div class="cell">${renderCheckerPiece(i, checker.color)}</div>`);
        }
    }
    $('.checker').click(clickedChecker);
}

//Function to figure out if a row/cell/checker is at an even or odd placement
function evenOdd(num) {
    return (num % 2 === 0) ? 'even' : 'odd';
}

//Function to figure out color placement for cell/checker
function cellColor(cellNumber, rowNumber) {
    return evenOdd(cellNumber) == evenOdd(rowNumber) ? 'white' : 'black'
}

//Function for when a checker is clicked
function clickedChecker() {
    let checker = $(this);
    if(checker.hasClass(`clicked`)) {
        removeChecker();
        return
    }
    $('.clicked').removeClass('clicked');
    let checkerIdx = checker.attr('checkerIdx');
    selectedChecker = checkers[checkerIdx];
    checker.addClass('clicked');
}

//Function that will move checker piece after clicked
function moveChecker() {
    if(selectedChecker) {
        let blackCell = $(this);
        let id = blackCell.attr('id');
        let splitId = id.split('-');
        selectedChecker.row = Number(splitId[1])
        selectedChecker.cell = Number(splitId[2])

        if(selectedChecker.color == 'black' && selectedChecker.isKing == false) {
            if(selectedChecker.row == (selectedChecker.row - 1)) {
                
            }
        } else if(selectedChecker.color == 'white' && selectedChecker.isKing == false) {
            if(selectedChecker.row == (selectedChecker.row + 1)) {

            }
        }
        
        if(selectedChecker.color == 'black' && selectedChecker.row == 1) {
            selectedChecker.isKing = true;
        } else if(selectedChecker.color == 'white' && selectedChecker.row == 8) {
            selectedChecker.isKing = true;
        }
        selectedChecker = undefined;
        renderCheckers();
    } else {

    }
}

//Function that removes a checker when jumped
function removeChecker() {
    selectedChecker.row = undefined;
    selectedChecker.cell = undefined;
    selectedChecker = undefined;
    renderCheckers()
}

//Function that will clear checker from the board
function clearCheckers() {
    $(`.black.cell`).html(``);
    $(`.black.cell`).unbind('click');
    $(`.captured`).html(``);
}

//Initialization function
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
    $('#boardContainer').html(renderBoard());
    $('.black-cell').click(moveChecker);
    renderCheckers();
};