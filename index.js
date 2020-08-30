const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons');
const clickStart = document.getElementById('click-strt');
const rightAnswer = document.getElementById('right-answer');
const wrongAnswer = document.getElementById('wrong-answer');
const chooseOption = document.getElementById('choose-option');
const displayScore = document.getElementById('display-score');
const displayForm = document.getElementById("display-form");
const displayContainer = document.getElementById("container")
const signupButton = document.getElementById('signup-b');
const userName = document.getElementById("user-name");
const previousButton = document.getElementById('previous-btn');
const displayNavbar = document.getElementById('tab-group');
const elapsed = document.getElementById('elapsed');
const highscoreButton = document.getElementById("highscore-btn");


var shuffledQuestions,currentQuestionIndex;
let score = 0;
let name,email;

startButton.addEventListener('click',startGame);
signupButton.addEventListener('click',handleSubmit)




nextButton.addEventListener('click',()=>{
    currentQuestionIndex++;
    setNextQuestion();
})



previousButton.addEventListener('click',()=>{
    currentQuestionIndex--;
    setNextQuestion();
})





function handleSubmit()
{
  if(userName.value!=='')
  {
    displayForm.classList.add('hide');
    displayContainer.classList.remove('hide');
    name = userName.value;
  }
}


var checker = 0;

function startGame()
{ 
  answerButtonElement.classList.remove('hide');
  displayScore.classList.add('hide');
  questionElement.classList.remove('hide');
  clickStart.classList.add('hide');
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(()=>Math.random()-0.5);
  currentQuestionIndex =0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
  if(!doublechecker)
  {
    checker=1;
  }

}




var reps =0;
function setNextQuestion()
{ 
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  for(var i=0;i<questions.length;i++)
  { 
    if(reps<questions.length)
    {
      const li = document.createElement('LI');
      li.classList = 'tab-active';
      li.innerHTML = "<a>"+Number(i+1)+"</a>";
      li.value = Number(i);
      displayNavbar.appendChild(li);
      li.addEventListener("click",()=>{
        currentQuestionIndex = li.value;
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
      })
    }
    reps++;
  }
}
let l =0;




let options = ['A','B','C','D'];
function showQuestion(question)
{ 
 
  


  chooseOption.classList.remove('hide');
  questionElement.innerText = currentQuestionIndex +1+") " +  question.question;
  var check =0;
  question.answers.forEach(answer => { 
      
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.dataset.optionValue=options[check];
      check++;
      button.classList.add('btn');
      if(answer.correct){
          button.dataset.correct = answer.correct;
      }
        button.addEventListener('click',selectAnswer);
    
      answerButtonElement.appendChild(button);



      answeredQuestions.forEach(answeredQuestion=>{
        if(answeredQuestion.question==currentQuestionIndex)
        {
          setStatusClass(button,button.dataset.correct);
        }
      })



  })
  


}







function resetState()
{   
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    previousButton.classList.add('hide');
    rightAnswer.classList.add('hide');
    wrongAnswer.classList.add('hide');
    while(answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}




var answeredQuestions=[];
var doublechecker =0;
function selectAnswer(e)
{ 


  
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  
  var flag=0;
  answeredQuestions.forEach(answeredQuestion=>{
    answeredQuestion.question==currentQuestionIndex&&flag++;
  })
  if(flag==0)
  {
    answeredQuestions.push({
      question: currentQuestionIndex,
      answer: selectedButton.dataset.optionValue
    });
    if(correct)
    {
      score++;
    }
  }


  selectedButton.dataset.clicked = true;

  chooseOption.classList.add('hide');
  if(correct)
  {   
      wrongAnswer.classList.add('hide');
      rightAnswer.classList.remove('hide');
 
  }
  else
  { 
    rightAnswer.classList.add('hide');
    wrongAnswer.classList.remove('hide');
  }
  setStatusClass(document.body,correct);
  Array.from(answerButtonElement.children).forEach(button=>{
      setStatusClass(button,button.dataset.correct)
  })
  if(shuffledQuestions.length>(currentQuestionIndex+1))
  {
    nextButton.classList.remove('hide');
    if(currentQuestionIndex!=0)
    {
        previousButton.classList.remove('hide');
    }
  } 
  if(answeredQuestions.length==shuffledQuestions.length)
  {   
      rightAnswer.classList.add('hide');
      wrongAnswer.classList.add('hide');
      questionElement.classList.add('hide');
      answerButtonElement.classList.add('hide');
      displayScore.innerHTML = "<h1 class='disp-score-title'>Thankyou " +"<bold>"+ "<div class='disp-score-name'>"+name +"</div>"+"</bold>"+"<br>You have answered " + "<div class='disp-score'>"+score+"</div>" +" qns correctly </h1>";
      if(localStorage.getItem('indexValue')==null)
      {
        localStorage.setItem('indexValue',0);
      }
      var j = localStorage.getItem('indexValue');
      localStorage.setItem('name'+j,name);
      localStorage.setItem('score'+j,score);
      j++;
      localStorage.setItem('indexValue',j);
      displayScore.classList.remove('hide');
      highscoreButton.classList.remove('hide');
      highscoreButton.addEventListener("click",handleHighscoreClick);
      score =0;
      checker =0;
      doublechecker =1;
      //highscore
  }
 
 
}
var Userscore = [];
function handleHighscoreClick()
{
  var j = localStorage.getItem('indexValue');
  for(var i=0;i<j;i++)
  {
    var name = localStorage.getItem('name'+i);
    var score = localStorage.getItem('score'+i);
    Userscore.push({
      username: name,
      userscore: score
    })
  }
 
  rightAnswer.classList.add('hide');
  wrongAnswer.classList.add('hide');
  questionElement.classList.add('hide');
  answerButtonElement.classList.add('hide');
  document.getElementById('tab-group').classList.add('hide');
  displayScore.classList.add('hide');
  elapsed.classList.add('hide');
  document.getElementById('clock').classList.add('hide');
  highscoreButton.classList.add('hide');

  for(var k=0;k<Userscore.length;k++)
  { for(var l=k;l<Userscore.length;l++)
    {
      if(Userscore[k].userscore<Userscore[l].userscore)
      {
        var temp = Userscore[k];
        Userscore[k] = Userscore[l];
        Userscore[l] = temp;
      }
    }
  }
  console.log(Userscore);
  if(Userscore.length==1)
  {
    document.getElementById('highscore').innerHTML = "<h2>1."+Userscore[0].username+": "+Userscore[0].userscore+ "</h2>";
  }
  if(Userscore.length==2)
  {
    document.getElementById('highscore').innerHTML = "<h2>1."+Userscore[0].username+": "+Userscore[0].userscore+ "<br>"+
                                                      "2."+Userscore[1].username+": " +Userscore[1].userscore + "</h2>";
  }
  if(Userscore.length>=3)
  {
    document.getElementById('highscore').innerHTML = "<h2>1."+Userscore[0].username+": "+Userscore[0].userscore+ "<br>" + 
    "2."+Userscore[1].username+": " +Userscore[1].userscore + "<br>" +
    "3."+ Userscore[2].username+": "+ Userscore[2].userscore+"</h2>";
  }
 
  document.getElementById('highscore').classList.remove('hide');
}






function setStatusClass(element,correct){
    clearStatusClass(element);
    if(correct)
    {
        element.classList.add('correct')
    }
    else
    {
        element.classList.add('wrong');
    } 
    answeredQuestions.forEach(answeredQuestion=>{
      if(answeredQuestion.question==currentQuestionIndex)
      { 
        if(answeredQuestion.answer===element.dataset.optionValue)
        {
          element.classList.add('clicked');
        }
      }
    })

}







function clearStatusClass(element)
{
    element.classList.remove('correct');
    element.classList.remove('wrong');
}













//Questions Data

const questions = [
    {
      question: "What are the symptoms of COVID-19?",
      answers: [
          {
              text: "Dry Cough and fever", correct: true
          },
          {
            text: "Retinal Inflammation", correct: false
          },
          {
            text: "Light Headedness", correct: false
          },
          {
            text: "Loss of taste", correct: false
          }
      ]  
    },
    {
        question: "Which is the best way to prevent Covid-19",
        answers: [
            {
                text: "Practise Social Distancing", correct: true
            },
            {
              text: "Say Go Corona Go", correct: false
            },
            {
                text: "Make the entire country do meditation for 5 minutes", correct: false
            },
            {
                text: "Bang the shit out with vessels", correct: false
            },
        ]  
      },
      {
        question: "Where did Covid-19 Originate?",
        answers: [
            {
                text: "China", correct: true
            },
            {
              text: "USA", correct: false
            },
            {
                text: "Australia", correct: false
            },
            {
                text: "Japan", correct: false
            },
        ]  
      },
      {
        question: "Which of the following are true regarding Covid-19 ?",
        answers: [
            {
                text: "It is not Air-borne", correct: true
            },
            {
              text: "It is Air-borne", correct: false
            }
        ]  
      },
      {
        question: "What are some of the measures taken by the Indian Government towards erradication of Covid-19",
        answers: [
            {
                text: "Lockdown for 21 days", correct: true
            },
            {
              text: "UV dis-infenctions in public areas", correct: false
            },
            {
                text: "Inventing a safe Vaccine", correct: false
            },
            {
                text: "Maintaining and implementing strict rules", correct:false
            }
        ]  
      },
      {
        question: "What is the name of the vaccine that is under human trials in India?",
        answers: [
            {
                text: "Bharath Vaccine", correct: false
            },
            {
              text: "Covaxin", correct: true
            },
            {
                text: "Sputnik", correct: false
            },
            {
                text: "Appolo", correct:false
            }
        ]  
      },
      {
        question: "What is Covid-19?",
        answers: [
            {
                text: "A form of bacteria", correct: false
            },
            {
              text: "A form of parasite", correct: false
            },
            {
                text: "A virus", correct: true
            },
            {
                text: "None of the above", correct:false
            }
        ]  
      },
      {
        question: "Which is the best practise to prevent Covid-19?",
        answers: [
            {
                text: "Drink Sanitizer", correct: false
            },
            {
              text: "Meditate for 5 minutes", correct: false
            },
            {
                text: "Wash your hands frequently", correct: true
            },
            {
                text: "Keep shouting and clapping", correct:false
            }
        ]  
      },
      {
        question: "Which country has the most number of Covid-19 cases as of now?",
        answers: [
            {
                text: "India", correct: false
            },
            {
              text: "Brazil", correct: false
            },
            {
                text: "USA", correct: true
            },
            {
                text: "China", correct:false
            }
        ]  
      },
      {
        question: "Why do we use sanitizers",
        answers: [
            {
                text: "It increases our immunity", correct: false
            },
            {
              text: "It provides strength", correct: false
            },
            {
                text: "It is very good for health", correct: false
            },
            {
                text: "It kills Covid-19", correct:true
            }
        ]  
      },
]








//Clock

setInterval(setClock, 1000)
let seconds =0;
let minute =0;
let hours =0;
const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')
elapsed.innerHTML = "Time Elapsed "+hours+":"+minute+":"+seconds;
function setClock() {
  const currentDate = new Date();
  const secondsRatio = currentDate.getSeconds() / 60;
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);

  if(checker)
  { 
    seconds+=1;
    if(seconds==60)
    {
      minute+=1;
      seconds=0;
    }
    if(minute==60)
    {
      hours+=1;
      minutes=0;
    }
    elapsed.innerHTML = "<h2>Time Elapsed "+hours+":"+minute+":"+seconds+"</h2>";
  }

}

function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * 360)
}

setClock()