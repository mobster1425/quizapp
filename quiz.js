class script{
    constructor(){
      this.question=document.getElementById('question');
      this.choices=Array.from(document.getElementsByClassName('choice-text'));
this.time_display=document.getElementsByClassName('time-display');
this.display_correct_incorrect=document.getElementById('display-correct-or-incorrect');
this.display_correct=document.getElementById('displaycorrectanswer');
this.score=0;
this.acceptinganswers=false;
this.questioncounter;
this.currentquestion={};
this.availablequestions=[];
this.correct_bonus=10;
this.max_questions=5;
this.questions=[];
this.timeleft=50;
    
    }
    
    async  opendb(){
        const result = await fetch('https://opentdb.com/api.php?amount=10');
        const data= result.json().then((loadedQuestions) => {
         this.questions = loadedQuestions.results.map((loadedQuestion) => {
              const formattedQuestion = {
                  question : loadedQuestion.question,
              };
  
              const answerChoices = [...loadedQuestion.incorrect_answers];

              formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
              answerChoices.splice(
                  formattedQuestion.answer - 1,
                  0,
                  loadedQuestion.correct_answer
              );
  
              answerChoices.forEach((choice, index) => {
                  formattedQuestion['choice' + (index + 1)] = choice;
                //  console.log(formattedQuestion);
              });
  
              return formattedQuestion;
              
          });
        this.startgame();
       // setTimeout(this.assign_to_end(),500);
      })
      .catch((err) => {
          console.error(err);
      });
       // return data;
    }

    startgame=()=>{
      this.timestart();
      console.log(this.questions);

this.questioncounter=0;
this.score=0;
this.availablequestions=[...this.questions];
console.log(this.availablequestions);
console.log(this.availablequestions.length);
    

this.getnewquestion();

    }
    
    getnewquestion(){
      if(this.availablequestions.length=== 0 || this.questioncounter>=this.max_questions ){
  localStorage.setItem('mostrecentscore',this.score);
  return window.location.assign('/end.html');
      }
this.questioncounter++;
      const questionindex=Math.floor(Math.random()*this.availablequestions.length);
      this.currentquestion=this.availablequestions[questionindex];
      this.question.innerText=this.currentquestion.question;
  
      this.choices.forEach((choice)=>{
        const number=choice.dataset['number'];
        choice.innerText=this.currentquestion['choice' + number];
      });
      this.availablequestions.splice(questionindex,1);
      this.acceptinganswers=true;
  
    
    this.choices.forEach((choice)=>{
      choice.addEventListener('click',(e)=>{
        console.log(e.target);
        if(!this.acceptinganswers) return;

        this.acceptinganswers=false;
        const selectedchoice=e.target;
        const selectedanswer=selectedchoice.dataset['number'];

        const classtoapply= selectedanswer==this.currentquestion.answer?this.display_correct_incorrect.innerText='correct':this.display_correct_incorrect.innerText='incorrect';
     //  this.display_correct_incorrect=null;
        if(classtoapply==='correct'){
          this.increamentscore(this.correct_bonus);
        }
       if(classtoapply==='incorrect'){
        this.timeleft-=10;
        this.display_correct.innerText=this.currentquestion.answer;

       }
        selectedchoice.parentElement.classList.add(classtoapply);
        console.log(classtoapply);
        setTimeout(()=>{
          selectedchoice.parentElement.classList.remove(classtoapply);this.getnewquestion();
        },1000);
           });
    });
  }
increamentscore(num){
  this.score+=num;
}



timestart(){
 let time=setInterval(function(){
  if(this.timeleft<=0){
    clearInterval(time)
  }
  else{
    this.time_display.innerText=this.timeleft;
  }
  this.timeleft-=1
 },1000);
 this.startgame();
}

  
  
   };


    const s=new script;
   s.opendb();
  //s.startgame();
 //s.getnewquestion();
    
//s.newquestion2();
//getElementsByClassName('btn').addEventListener('click',s.timestart());