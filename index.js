var words=['apple','banana','car'];
const f=async ()=>{
    const list=await fetch("./common.json");
    const json=await list.json();
    words=json.commonWords;
    return json.commonWords;
}
f().then(load,nload);
function load(e){
    words=e;
    // console.log('loaded',words);
    startgame();

}
function nload(){
    console.log('not loaded');
}

let randomWord=words[Math.floor(Math.random()*words.length)];
console.log(randomWord);
const visitedArray=[];
const correctChar=[];
const wrongChar=[];
const hangmanBody=document.querySelectorAll('.figure-part');

//console.log(hangmanBody);
function showDashes(){
    
    document.getElementById('word').innerHTML=
    `${randomWord.split('').map((letter)=>{
        return( `   <span class="letter">
                ${correctChar.includes(letter) ? letter : ''}
            </span>
        `)
    }).join('')
    }`;
    const guessedWordel=document.querySelectorAll('.letter');
    let gw='';
    guessedWordel.forEach((ele)=>{
        gw+=ele.innerHTML.trim();
    })
    console.log(gw)
    if(gw==randomWord){
        document.getElementById('final-message').innerHTML="Hurray! you WON the game"
        document.getElementById('popup-container').style.display='block';
        overgame();
    }

}
function updateIncorrectChar(){
    document.getElementById('wrong-char-block').innerHTML=
    `
    ${wrongChar.length> 0 ? "<p> wrong char guessed </p>": ''}
    ${wrongChar.map((let)=>{
        return`
            <span>${let}</span>
        `
    })}
    `;

    hangmanBody.forEach((ele,index)=>{
        const noOfIncorrectGuess=wrongChar.length;
        //aconsole.log(ele,index);
        if(index < noOfIncorrectGuess){
            
            ele.style.display="block";
        }else {
            ele.style.display='none';
        }
    });
    
    if(wrongChar.length==hangmanBody.length){
        document.getElementById('final-message').innerHTML="You loss the game"
        document.getElementById('showword').innerHTML=`correct word is:${randomWord}`
        document.getElementById('popup-container').style.display='block';
        
        overgame();
    }
}
showDashes();
const nc=document.getElementById('notification-container');
window.addEventListener('keydown',addevent);

function addevent(e){
    console.log(e.key);
    if(e.key>='a' && e.key<='z'){
        if(visitedArray.includes(e.key)){
            //alert('already used char')
            nc.style.display='block';
        }else{
            nc.style.display='none';
            visitedArray.push(e.key);
            if(randomWord.includes(e.key)){
                //correct char
                correctChar.push(e.key);
                showDashes();
            }else{
                //wrong char
                wrongChar.push(e.key);
                updateIncorrectChar();
            }
            
        }
    }else{
        console.log('bad char');
    }
}

function startgame(){
    
    document.getElementById('play-button').addEventListener('click',()=>{
        document.getElementById('showword').innerHTML='';
        wrongChar.splice(0);
        correctChar.splice(0);
        visitedArray.splice(0);
        console.log(wrongChar);
        document.getElementById('popup-container').style.display='none';
    
        document.getElementById('word').innerHTML='';
        randomWord=words[Math.floor(Math.random()*words.length)];
        console.log(randomWord);
        showDashes();    
        window.addEventListener('keydown',addevent);
        updateIncorrectChar();
    })
}
function overgame(){
    
    window.removeEventListener('keydown',addevent);
}
