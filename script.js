const gameBoard=(function(){
    const board=['','','','','','','','',''];
    const getBoard=function(){
        return board;
    }
    const setBoard=function(index,marker){
        if(board[index]!='')
            return false;

        board[index]=marker;
        return true;
    }
    const printConsole=function(){
        console.log(board[0],board[1],board[2]);
        console.log(board[3],board[4],board[5]);
        console.log(board[6],board[7],board[8]);
    }
    return {getBoard,setBoard, printConsole}
})();

function player(userMarker){
    const score='';
    const marker=userMarker;
    const increaseScore=()=>{
        score++;
    };
    const getScore=()=>{return score};
    const getMarker=()=>{return marker};
    return {increaseScore,getScore,getMarker};
}

const human=player('X');
const bot=player('O');

const controller=(function(){
    var turn='X';
    const markEntry=(user,index)=>{
        let userMarker=user.getMarker();
        if(userMarker==turn){
            if(!gameBoard.setBoard(index,userMarker))
                console.log("Choose a valid block")
            else
                turn = (turn=='X') ? 'O' : 'X';
            
        }else{
            console.log('Please wait your turn.');
        }
    }

    const add=function(){
        console.log("Do something");
    }
    return {add,markEntry}
})();