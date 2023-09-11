


// export const resetRandomization = () => {
//     const fBlock = randomizeBlock()
//     let secBlock = randomizeBlock()
//     if(fBlock == secBlock){
//     while(fBlock == secBlock){
//         secBlock = randomizeBlock()
//     }}
//     const dispatch = useDispatch()
//     dispatch(resetBoard())
//     dispatch(secBlock(fBlock))
//     dispatch(secBlock(secBlock))

// }
export const randomizeBlock= () => {
    const row= Math.floor(Math.random() *4)
    const col= Math.floor(Math.random() *4)
    const numberIndicator = Math.floor(Math.random() *2)
    let num = 0;
    if(numberIndicator == 0){
        num = 2
    }else{
        num = 4 
    } 
    return {row,col, num}
}
export const initialRandomizer = () => {
    const fBlock = randomizeBlock()
    const secBlock = randomizeBlock()
    let board =[
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      board[fBlock.col][ fBlock.row] =fBlock.num
      board[secBlock.col][secBlock.row] =secBlock.num
    return board
}
export const initialBoard = initialRandomizer()