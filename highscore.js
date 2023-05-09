/*const start=document.getElementById("start-quiz");

let se=document.getElementById("card_content");
let b=document.getElementById('card_content2');
start.addEventListener('click',function(){
    se.textContent=null;
se.innerHTML=`
<div id="card_content" class="card white z-depth-2 ">
    <div class="card-content black-text">
      <h2>Coding Quiz Challenge</h2>
      <h5> questions within the time limit
      </h5>
      <h5>keep in mind that incorrect answers will penalize your score/time by ten seconds</h5>
    </div>
    <div class="card-action">
        <button id="start-quiz" class="btn-large light-blue white-text">Start Quiz</button>
    </div>
  </div>`
})
*/
class highsc{
  constructor(){
    this.highscoreslist=document.getElementById('highscoreslist');
    this.highscores=JSON.parse(localStorage.getItem('highscores')) || [];
  }
  viewhighscore=()=>{
    this.highscoreslist.innerHTML=this.highscores.map(score=>{
      return `<tr>
      <th colspan="4"></th>
  
    </tr>
    <tr>
      <th scope="row">Name</th>
      <td >${score.name}</td>
    </tr>
    <tr>
      <th scope="row">Scores</th>
      <td >${score.score}</td>
    </tr>`;
    })
    //.join("");
  }
}

const h=new highsc;
h.viewhighscore();