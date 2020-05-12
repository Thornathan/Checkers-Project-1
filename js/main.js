/* --- constants --- */
const lookup = {
    '1': 'black',
    '-1': 'white',
    'null': 'transparent'
};

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

//Function that will render the checker pieces initial placement on proper rows
function renderCheckerPiece(color) {
    return `<div class="checker ${color}-checker"></div>`
}

//Function that will render the checker pieces 
function renderCheckers() {
    for(let i = 0; i < checkers.length; i++) {
        let checker = checkers[i];
        $(`#cell-${checker.row}-${checker.cell}`).html(renderCheckerPiece(checker.color));
    }
}

//Function to figure out if a row/cell/checker is at an even or odd placement
function evenOdd(num) {
    return (num % 2 === 0) ? 'even' : 'odd'
}

//Function to figure out color placement for cell/checker
function cellColor(cellNumber, rowNumber) {
    return evenOdd(cellNumber) == evenOdd(rowNumber) ? 'white' : 'black'
}

function handleMove(evt) {
    //Get square index
    const idx = parseInt(evt.target.id.replace('sq', ''));
    if(board[idx] || winner) return;
    //update state variables
    board[idx] = turn;
    turn *= -1;
    render();
}

function showChecker() {
    let checker = $(this).children().first()
    checker.showChecker()
    if(!checker.is(":visible")) {
        changeChecker(checker);
    }
}

function changeChecker(checker) {
    if(checker.hasClass('black-checker')) {
        checker.removeClass('black-checker')
        checker.addClass('white-checker')
    } else {
        checker.addClass('black-checker')
        checker.removeClass('white-checker')
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
    turn = 1;
    winner = null;
    $('#boardContainer').html(renderBoard());
    renderCheckers();
    render();
};