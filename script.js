const O=`<svg class="zero" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M128,236A108,108,0,1,1,236,128,108.12225,108.12225,0,0,1,128,236Zm0-192a84,84,0,1,0,84,84A84.09522,84.09522,0,0,0,128,44Z" />
                    </svg>`;

const X=`<svg class="cross" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" />
                    </svg>`

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
    const checkWin=(marker)=>{
        if(
            (board[0]==marker && board[1]==marker && board[2]==marker)
            || (board[3]==marker && board[4]==marker && board[5]==marker)
            || (board[6]==marker && board[7]==marker && board[8]==marker)
            || (board[0]==marker && board[3]==marker && board[6]==marker)
            || (board[1]==marker && board[4]==marker && board[7]==marker)
            || (board[2]==marker && board[5]==marker && board[8]==marker)
            || (board[0]==marker && board[4]==marker && board[8]==marker)
            || (board[2]==marker && board[4]==marker && board[6]==marker)
        )
            return true;
        return false;
    }
    const reset=()=>{
        for(let i=0;i<9;i++){
            board[i]='';
        }
    }
    const printConsole=function(){
        console.log(board[0],board[1],board[2]);
        console.log(board[3],board[4],board[5]);
        console.log(board[6],board[7],board[8]);
        console.log("-----------------------------");
    }
    return {getBoard,setBoard, printConsole, checkWin, reset}
})();

function player(userMarker){
    var score=0;
    const marker=userMarker;
    const increaseScore=()=>{
        score++;
    };
    const getScore=()=>{return score};
    const getMarker=()=>{return marker};
    return {increaseScore,getScore,getMarker};
}

const human=player('X');
const bot=(function(){
    let {increaseScore,getScore,getMarker} = player('O');

    let selectBox=()=>{
        let tempArr=(gameBoard.getBoard()).map((val,i)=>{if(val==''){return i}else {return null}}).filter((e)=>{return e!=null});
        let randomChoice=Math.floor(Math.random() * ((tempArr.length-1) - 0 + 1)) + 0;
        return tempArr[randomChoice];
    }
    return {increaseScore,getScore,getMarker,selectBox};
})();

const controller=(function(){
    var turn='X';
    const markEntry=(user,index)=>{
        let userMarker=user.getMarker();
        if(userMarker==turn){
            if(!gameBoard.setBoard(index,userMarker))
                alert("Choose a valid block")
            else{
                board.addIcon(index,userMarker);
                if(gameBoard.checkWin(userMarker)){
                    user.increaseScore();
                    setTimeout(()=>{
                        alert(user.getMarker()+" WON")
                        gameBoard.reset();
                        board.resetBoard();
                    },500)
                }
                turn = (turn=='X') ? 'O' : 'X';
            }
            
        }else{
            alert('Please wait your turn.');
        }
        if(turn=='O')
            setTimeout(()=>{
                markEntry(bot,bot.selectBox())
            },500)
    }

    const add=function(){
        console.log("Do something");
    }
    return {add,markEntry}
})();

// -------------------------------------- UI ------------------------------------------

let boxes=document.querySelector('div.board')
let board=(function(){
    const createBoard=()=>{
        for(let j=0;j<9;j++){
            let box=document.createElement('div');
            box.dataset.id=j;
            boxes.appendChild(box);
        }
    }

    const resetBoard=()=>{
        boxes.innerHTML='';
        createBoard();
    }

    const addIcon=(i,icon)=>{
        let temp=document.querySelector(`.board div[data-id="${i}"]`);
        let svgIcon=(icon=='X') ? X:O;
        temp.innerHTML=svgIcon;
    }

    return {createBoard,resetBoard, addIcon}
})();
board.createBoard();


boxes.addEventListener('click',(e)=>{
    controller.markEntry(human,e.target.dataset.id)
});