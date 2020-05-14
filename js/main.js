/* --- constants --- */
const lookup = {
    '1': 'player 1 Black',
    '-1': 'player 2 White',
    'null': 'transparent'
};

//Array that will hold checkers
let checkers = []

/* --- app's state (variables) --- */
let turn; // 1 or -1 (player black or white)
let selectedChecker = undefined; // A variable for when a checker is clicked

/* --- cached element refrences --- */
const message = document.querySelector('h1');

/* --- event listeners --- */
document.querySelector('button').addEventListener('click', init);

/* --- functions --- */
init();

function renderMessage() {
    message.innerHTML = `${lookup[turn].toUpperCase()}'s Turn`;
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
        return `<div id="cell-${rowNumber}-${cellNumber}" class="cell black"></div>`;
    } else {
        return `<div id="cell-${rowNumber}-${cellNumber}" class="cell white"></div>`;
    }
}

//Function to figure out color placement for cell/checker
function cellColor(cellNumber, rowNumber) {
    return evenOdd(cellNumber) == evenOdd(rowNumber) ? 'white' : 'black';
}

//Function to figure out if a row/cell/checker is at an even or odd placement
function evenOdd(num) {
    return (num % 2 === 0) ? 'even' : 'odd';
}

//Function that will clear checker from the board
function clearCheckers() {
    $(`.black.cell`).html(``);
    $(`.black.cell`).unbind('click');
    $(`.captured`).html(``);
}

//Function that will assign array of checker objects
function resetCheckers() {
    checkers = [
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
    ];
}

//Function that will render the placement of the checkers a.k.a the render function
function renderCheckers() {
    clearCheckers();
    $(`.black.cell`).click(moveChecker);
    checkers.forEach((checker, i) => {
        if(checker.row && checker.cell) {
            $(`#cell-${checker.row}-${checker.cell}`).html(renderCheckerPiece(i, checker.color));
            $(`#cell-${checker.row}-${checker.cell}`).unbind('click');
        } else {
            $(`#captured-${checker.color}`)
                .append(`<div class="cell">${renderCheckerPiece(i, checker.color)}</div>`);
        }
    });
    $('.checker').click(clickedChecker);
};

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

//Function for when a checker is clicked
function clickedChecker() {
    let checker = $(this);
    $('.clicked').removeClass('clicked');
    let checkerIdx = checker.attr('checkerIdx');
    selectedChecker = checkers[checkerIdx];
    checker.addClass('clicked');
}
//Function that checks if a checker piece of opposite color is within the next row
function checkOpponent(selectedPiecePosition, selectedPieceColor) {
    for(let i = 0; i < checkers.length; i++) {
        if(selectedPieceColor != checkers[i].color) {
            if(selectedChecker.isKing) {
                if((selectedPiecePosition[1] - 1 == checkers[i].row || selectedPiecePosition[1] + 1 == checkers[i].row)) {
                    if(selectedPiecePosition[2] - 1 == checkers[i].cell || selectedPiecePosition[2] + 1 == checkers[i].cell) {
                        return true;
                    }
                }
            }
            if(selectedPieceColor == 'black') {
                if(selectedChecker.cell + 1 == checkers[i].cell || selectedChecker.cell - 1 == checkers[i].cell) {
                    if(selectedChecker.row - 1 == checkers[i].row) {
                        return true;
                    }
                }
            }
            if(selectedPieceColor == 'white') {
                if(selectedChecker.cell + 1 == checkers[i].cell || selectedChecker.cell - 1 == checkers[i].cell) {
                    if(selectedChecker.row + 1 == checkers[i].row) {
                        return true;
                    }
                }
            }

        }
    }
}
//Checks if a move is following the rules of checker
function validMove(step, splitId) {
    if(selectedChecker.isKing) {
        if(selectedChecker.cell + step == Number(splitId[2]) || selectedChecker.cell - step == Number(splitId[2])) {
            if(selectedChecker.row - step == Number(splitId[1]) || selectedChecker.row + step == Number(splitId[1])) {
                const previousCheckerLocation = {...selectedChecker};
                selectedChecker.row = Number(splitId[1]);
                selectedChecker.cell = Number(splitId[2]);
                return (step === 2) ? previousCheckerLocation : undefined;
            }
        }
    }
    //Handles black checker that are not king movements
    if(selectedChecker.color == 'black') {
        if(selectedChecker.cell + step == Number(splitId[2]) || selectedChecker.cell - step == Number(splitId[2])) {
            if(selectedChecker.row - step == Number(splitId[1])) {
                const previousCheckerLocation = {...selectedChecker};
                selectedChecker.row = Number(splitId[1]);
                selectedChecker.cell = Number(splitId[2]);
                return (step === 2) ? previousCheckerLocation : undefined;
            }
        }
        
    //Handles white checker that are not king movements 
    } else if(selectedChecker.color == 'white') {
        if(selectedChecker.cell + step == Number(splitId[2]) || selectedChecker.cell - step == Number(splitId[2])) {
            if(selectedChecker.row + step == Number(splitId[1])) {
                const previousCheckerLocation = {...selectedChecker}
                selectedChecker.row = Number(splitId[1]);
                selectedChecker.cell = Number(splitId[2]);
                return (step === 2) ? previousCheckerLocation : undefined;
            }
        }
    }
}

//Function that will move checker piece after clicked
function moveChecker() {
    if(selectedChecker) {
        let blackCell = $(this);
        let id = blackCell.attr('id');
        let splitId = id.split('-');
        //Check proper player movement
        if(selectedChecker.color == 'black' && turn == -1) return;
        if(selectedChecker.color == 'white' && turn == 1) return;
        //First checks if their is an opponent piece
        if(checkOpponent(splitId, selectedChecker.color)) {
            let previousCheckerLocation = validMove(2, splitId);
            if(previousCheckerLocation) {
                removeChecker(previousCheckerLocation, selectedChecker);
            }
        }
        validMove(1, splitId);
        //Creates a King Piece
        if(selectedChecker.color == 'black' && selectedChecker.row == 1) {
            selectedChecker.isKing = true;
        } else if(selectedChecker.color == 'white' && selectedChecker.row == 8) {
            selectedChecker.isKing = true;
        }
        selectedChecker = undefined;
        renderCheckers();
        turn *= -1;
        renderMessage();
        checkWinner();
    }
}

//Function that removes a checker when jumped
function removeChecker(previous, current) {
    const row = ((previous.row + current.row)/2);
    const cell = ((previous.cell + current.cell)/2);
    for(let i = 0; i < checkers.length; i++) {
        if(checkers[i].row == row && checkers[i].cell == cell) {
            checkers[i].row = undefined;
            checkers[i].cell = undefined;
            renderCheckers();
        } 
    }
}

//Function that will clear checker from the board and move it captured
function clearCheckers() {
    $(`.black.cell`).html(``);
    $(`.black.cell`).unbind('click');
    $(`.captured`).html(``);
}

//Function that will check if their is a winner
function checkWinner() {
    const black = document.getElementById("captured-black");
    const white = document.getElementById("captured-white");
    if(white.children.length > 11) {
        message.innerHTML = "Player 1 Wins!";
        document.getElementById('button').style.display = 'block';
    } else if(black.children.length > 11) {
        message.innerHTML = "Player 2 Wins!";
        document.getElementById('button').style.display = 'block';
    }
}

//Initialization function
function init() {
    resetCheckers();
    turn = 1;
    //Renders the board to html
    $('#boardContainer').html(renderBoard());
    //Renders the ability to move the checkers
    $('.black-cell').click(moveChecker);
    //Renders the Checker Pieces
    renderCheckers();
    //Renders the Message
    renderMessage();
};