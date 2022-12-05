// DOM Elements
const allCells = document.querySelectorAll('.cell:not(.row-top)');
const topCells = document.querySelectorAll('.cell.row-top');
const resetButton = document.querySelector('.reset');
const statusSpan = document.querySelector('.status');

// Columns
const column0 = [allCells[35], allCells[28], allCells[21], allCells[14], allCells[7], allCells[0], topCells[0]];
const column1 = [allCells[36], allCells[29], allCells[22], allCells[15], allCells[8], allCells[1], topCells[1]];
const column2 = [allCells[37], allCells[30], allCells[23], allCells[16], allCells[9], allCells[2], topCells[2]];
const column3 = [allCells[38], allCells[31], allCells[24], allCells[17], allCells[10], allCells[3], topCells[3]];
const column4 = [allCells[39], allCells[32], allCells[25], allCells[18], allCells[11], allCells[4], topCells[4]];
const column5 = [allCells[40], allCells[33], allCells[26], allCells[19], allCells[12], allCells[5], topCells[5]];
const column6 = [allCells[41], allCells[34], allCells[27], allCells[20], allCells[13], allCells[6], topCells[6]];
const columns = [column0, column1, column2, column3, column4, column5, column6];


// Rows
const topRow = [topCells[0], topCells[1], topCells[2], topCells[3], topCells[4], topCells[5], topCells[6]];
const row0 = [allCells[0], allCells[1], allCells[2], allCells[3], allCells[4], allCells[5], allCells[6]];
const row1 = [allCells[7], allCells[8], allCells[9], allCells[10], allCells[11], allCells[12], allCells[13]];
const row2 = [allCells[14], allCells[15], allCells[16], allCells[17], allCells[18], allCells[19], allCells[20]];
const row3 = [allCells[21], allCells[22], allCells[23], allCells[24], allCells[25], allCells[26], allCells[27]];
const row4 = [allCells[28], allCells[29], allCells[30], allCells[31], allCells[32], allCells[33], allCells[34]];
const row5 = [allCells[35], allCells[36], allCells[37], allCells[38], allCells[39], allCells[40], allCells[41]];
const rows = [row0, row1, row2, row3, row4, row5, topRow];

//Variables
let gameIsLive = true;
let yellowIsNext = true;


//Functions
const getClassListArray = (cell) => {
    const classList = cell.classList;
    return [...classList];
};

const getCellLocation = (cell) => {
    const classList = getClassListArray(cell);
    const rowClass = classList.find(className => className.includes('row'));
    const columnClass = classList.find(className => className.includes('col'));

    const rowIndex = rowClass[4];
    const columnIndex = columnClass[4];

    const rowNumber = parseInt(rowIndex, 10);
    const columnNumber = parseInt(columnIndex, 10);

    return [rowNumber, columnNumber];
};

const getFirstOpenCellForColumn = (columnIndex) => {
    const column = columns[columnIndex];
    const columnWithoutTop = column.slice(0, 6);
    
    for (const cell of columnWithoutTop) {
        const classList = getClassListArray(cell);
        if (!classList.includes('yellow') && !classList.includes('red')) {
            return cell;
        }
    }
    return null;
};

const clearColorFromTop = (columnNumber) => {
    const topCell = topCells[columnNumber];
    topCell.classList.remove('yellow');
    topCell.classList.remove('red');
}

const getColorOfCell = (cell) => {
    const classList = getClassListArray(cell);
    if (classList.includes('yellow')) return 'yellow';
    if (classList.includes('red')) return 'red';
    return null;
}

const checkWinningCells = (cells) => {
    if (cells.length >= 4) {
        gameIsLive = false;
        for (const cell of cells) {
            cell.classLis.add('win');
        }
    }
    //I left off here - 1:05:17

}

const checkStatusOfGame = (cell) => {
    const color = getColorOfCell(cell);
    if (!color) return;
    const [rowNumber, columnNumber] = getCellLocation(cell);

    //Horizontal Check
    let winningCells = [cell];
    let rowToCheck = rowNumber;
    let columnToCheck = columnNumber -1
    while (columnToCheck >= 0) {
        const cellToCheck = rows[rowToCheck][columnNumber];
        if (getColorOfCell(cellToCheck) === color) {
            winningCells.push(cellToCheck);
            columnToCheck--;
        } else {
            break;
        }
    }
    columnToCheck = columnNumber +1;
    while (columnToCheck <= 6) {
    const cellToCheck = rows[rowToCheck][columnNumber];
    if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        columnToCheck++;
        } else {
        break;
        }
    };


 
    if (winningCells.length >= 4) {
        gameIsLive = False;
        winningCells.add
    }
};


//Event Handlers
const handleCellMouseOver = (e) => {
    const cell = e.target;
    const [rowNumber, columnNumber] = getCellLocation(cell);

    const topCell = topCells[columnNumber];
    if (yellowIsNext) {
        topCell.classList.add('yellow');
        } else {
        topCell.classList.add('red');
        }
    };

const handleCellMouseOut = (e) => {
    const cell = e.target;
    const [rowNumber, columnNumber] = getCellLocation(cell);

   clearColorFromTop(columnNumber);
};

const handleCellClick = (e) => {
    const cell = e.target;
    const [rowNumber, columnNumber] = getCellLocation(cell);
    const openCell = getFirstOpenCellForColumn(columnNumber);
    
    if (!openCell) return;

    if (yellowIsNext) {
        openCell.classList.add('yellow');
        } else {
        openCell.classList.add('red');
    }
    
    checkStatusOfGame(openCell);

    yellowIsNext = !yellowIsNext;
    clearColorFromTop(columnNumber);
    const topCell = topCells[columnNumber];
    if (yellowIsNext) {
        topCell.classList.add('yellow');
        } else {
        topCell.classList.add('red');
        }
};




//Event Listeners
for (const row of rows) {
    for (const cell of row) {
        cell.addEventListener('mouseover', handleCellMouseOver);
        cell.addEventListener('mouseout', handleCellMouseOut);
        cell.addEventListener('click', handleCellClick);
    }
};