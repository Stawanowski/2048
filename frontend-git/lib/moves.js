export const swipe = (board, direction) => {
    const size = board.length;
    let hasChanged = false;
    // console.log(board)
    const cloneBoard = (board) => board.map((row) => [...row]);

    const swipeRight = (fboard) => {
        board = cloneBoard(fboard); // Create a copy of the board
        for (let row = 0; row < size; row++) {
            for (let col = size - 2; col >= 0; col--) {
                if (board[row][col] !== 0) {
                    let currentTile = board[row][col];
                    let nextCol = col + 1;

                    while (nextCol < size) {
                        const nextTile = board[row][nextCol];

                        if (nextTile === 0) {
                            board[row][nextCol] = currentTile;
                            board[row][col] = 0;
                            col++;
                            hasChanged = true;
                        } else if (nextTile === currentTile) {
                            board[row][nextCol] *= 2;
                            board[row][col] = 0;
                            hasChanged = true;
                            break;
                        } else {
                            break;
                        }
                        nextCol++;
                    }
                }
            }
        }
        return board;
    };

    const swipeLeft = (fboard) => {
        board = cloneBoard(fboard); // Create a copy of the board
        for (let row = 0; row < size; row++) {
            for (let col = 1; col < size; col++) {
                if (board[row][col] !== 0) {
                    let currentTile = board[row][col];
                    let prevCol = col - 1;

                    while (prevCol >= 0) {
                        const prevTile = board[row][prevCol];

                        if (prevTile === 0) {
                            board[row][prevCol] = currentTile;
                            board[row][col] = 0;
                            col--;
                            hasChanged = true;
                        } else if (prevTile === currentTile) {
                            board[row][prevCol] *= 2;
                            board[row][col] = 0;
                            hasChanged = true;
                            break;
                        } else {
                            break;
                        }
                        prevCol--;
                    }
                }
            }
        }
        return board;
    };

    const swipeDown = (fboard) => {
        board = cloneBoard(fboard); // Create a copy of the board
        for (let col = 0; col < size; col++) {
            for (let row = size - 2; row >= 0; row--) {
                if (board[row][col] !== 0) {
                    let currentTile = board[row][col];
                    let nextRow = row + 1;

                    while (nextRow < size) {
                        const nextTile = board[nextRow][col];

                        if (nextTile === 0) {
                            board[nextRow][col] = currentTile;
                            board[row][col] = 0;
                            row++;
                            hasChanged = true;
                        } else if (nextTile === currentTile) {
                            board[nextRow][col] *= 2;
                            board[row][col] = 0;
                            hasChanged = true;
                            break;
                        } else {
                            break;
                        }
                        nextRow++;
                    }
                }
            }
        }
        return board;
    };

    const swipeUp = (fboard) => {
        board = cloneBoard(fboard); // Create a copy of the board
        for (let col = 0; col < size; col++) {
            for (let row = 1; row < size; row++) {
                if (board[row][col] !== 0) {
                    let currentTile = board[row][col];
                    let prevRow = row - 1;

                    while (prevRow >= 0) {
                        const prevTile = board[prevRow][col];

                        if (prevTile === 0) {
                            board[prevRow][col] = currentTile;
                            board[row][col] = 0;
                            row--;
                            hasChanged = true;
                        } else if (prevTile === currentTile) {
                            board[prevRow][col] *= 2;
                            board[row][col] = 0;
                            hasChanged = true;
                            break;
                        } else {
                            break;
                        }
                        prevRow--;
                    }
                }
            }
        }
        return board;
    };
    let originalBoard;

    switch (direction) {
        case 'w':
        case 'ArrowUp':
            originalBoard = swipeUp(board);
            break;
        case 's':
        case 'ArrowDown':
            originalBoard = swipeDown(board);
            break;
        case 'a':
        case 'ArrowLeft':
            originalBoard = swipeLeft(board);
            break;
        case 'd':
        case 'ArrowRight':
            originalBoard = swipeRight(board);
            break;
        default:
            return undefined
    }

    if (hasChanged) {
        return originalBoard;
    } else {
        return [
            [1222, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ];
    }
}

