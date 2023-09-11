import { swipe } from "./moves";
import { randomizeBlock } from "./randomize";
import { Board } from "./types";
let startX:any = null;
let startY:any = null;
let endX:any = null;
let endY:any= null;

export const handleTouchStart = (e:any) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    
  };
  
  export const handleTouchMove = (e:any) => {
    endX = e.touches[0].clientX;
    endY = e.touches[0].clientY;
  };
  
  export const handleTouchEnd = (mainBoard:Board) => {
    let board:Board = [...mainBoard];
    if (startX && startY && endX && endY) {
      const deltaX = endX - startX;
      const deltaY = endY - startY;
  
      // Calculate the angle of the swipe
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      console.log('s')
      // Determine the swipe direction based on the angle
      let direction = '';
      if (angle >= -45 && angle < 45) {
        direction = 'd';
      } else if (angle >= 45 && angle < 135) {
        direction = 's';
      } else if (angle >= -135 && angle < -45) {
        direction = 'w';
      } else {
        direction = 'a';
      }
  
      const update = swipe(board, direction)
      if (update == undefined || update[0][0] == 1222){
        return [[111]]
      }
      board = generateBlock(update)
      console.log(direction)

    }
    startX = null;
    startY = null;
    endX = null;
    endY = null;
    return board
  };
export const generateBlock:any = (board:Board) => {
    let block = randomizeBlock()
    if(board[block.row][block.col] != 0){
      return generateBlock(board)
    }else{
      let newBoard:Board = board;
      newBoard[block.row][block.col] = block.num
      return newBoard
    }
  }