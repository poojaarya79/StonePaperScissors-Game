let score=JSON.parse(localStorage.getItem('score')) || {
wins:0,
losses:0,
ties:0
};
updateScoreElement();
let isAutoPlaying=false;
let intervalId;
function autoPlay(){
    if(!isAutoPlaying){
        intervalId=setInterval(function(){
            const playerMove=pickCompMove();
            playGame(playerMove);
        },1000);
        isAutoPlaying=true;
    }
    else{
        clearInterval(intervalId);
        isAutoPlaying=false;
    }
    
}
document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r') playGame('stone');
    else if(event.key==='p') playGame('paper');
    else if(event.key==='s') playGame('scissors');
})
function playGame(playerMove){
    const compMove=pickCompMove();
    let result='';
    if(playerMove==='stone'){
        if(compMove==='stone'){
        result='tie';
        }
        else if(compMove==='paper'){
            result='youlose';
        }
        else if (compMove==='scissors'){
            result='youwin';
        }
    }
    else if(playerMove==='paper'){
        if(compMove==='stone'){
            result='youwin';
        }
        else if(compMove==='paper'){
            result='tie';
        }
        else if (compMove==='scissors'){
            result='youloose';
        }
    }
    else if(playerMove==='scissors'){
        if(compMove==='stone'){
            result='youloose';
        }
        else if(compMove==='paper'){
            result='youwin';
        }
        else if (compMove==='scissors'){
            result='tie';
        }
    }
    if(result==='youwin') score.wins+=1;
    else if(result==='youloose') score.losses+=1;
    else if(result==='tie') score.ties+=1;
    localStorage.setItem('score',JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML=result;
    document.querySelector('.js-moves').innerHTML=`You <img src="${playerMove}.png" class="move-icon">
    Computer <img src="${compMove}.png" class="move-icon">`;
}

function updateScoreElement(){
    document.querySelector('.js-score').innerHTML=`Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`;
}

function pickCompMove(){
    const randomNumber=Math.random();
    let compMove='';
    if(randomNumber>=0 && randomNumber<1/3){
    compMove='stone';
    }
    else if(randomNumber>=1/3 && randomNumber<2/3){
        compMove='paper';
    }
    else{
        compMove='scissors';
    }
    return compMove;
}
        