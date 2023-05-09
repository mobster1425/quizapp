class UI{
    constructor(){
       this.finalscore=document.getElementById('final-score-display');
       this.initials=document.getElementById('initials');
       this.savscore=document.getElementById('submit-initials');
       this.mostrecentscore=localStorage.getItem('mostrecentscore');
       this.finalscore.innerText=this.mostrecentscore;
this.max_high_score=5;
this.highscore=JSON.parse(localStorage.getItem('highscores')) || [];
console.log(this.highscore);
    }


usernameclicked=()=>{
//iif username is being typed disable button
this.initials.addEventListener('keyup',()=>{
    this.initials.disabled=!this.initials.value;
})
}

savetolocalstorage=()=>{
this.savscore.addEventListener('click',(e)=>{
    e.preventDefault();
    const score={
        score:this.mostrecentscore,
        name:this.initials.value
    };
    this.highscore.push(score);
    this.highscore.sort((a,b)=>b.score-a.score);
    this.highscore.splice(5);

    localStorage.setItem('highscores',JSON.stringify(this.highscore));
   // console.log(this.highscore);
    window.location.assign('/');
})
}
    
}
const u=new UI;
u.usernameclicked();
u.savetolocalstorage();























