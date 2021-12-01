
/**
 *  @type - DOMElement - current question
 */
 const question = document.querySelector('#question');
 
 //  const choices = Array.from(document.querySelector('.choice-text'));
 const choices = document.querySelectorAll('.choice-text');

 const progressText = document.querySelector('#progressText');
 const scoreText = document.querySelector('#score');
 const progressBarFull = document.querySelector('#progressBarFull');
 
 let currentQuestion = {};
 let acceptingAnswers = true;
 let score = 0;
 let questionCounter = 0;
 let availableQuestions = [];
 
 let questions = [
     {
         question: "What year was the first Iron Man movie released, kicking off the Marvel Cinematic Universe?",
         choice1: "2011",
         choice2: "2008",
         choice3: "1999",
         choice4: "2005",
         answer: 2,
     },
     {
         question: "What is the name of Thor’s hammer?",
         choice1: "Blow Hammer",
         choice2: "Pixie",
         choice3: "Mjolnir",
         choice4: "Jane",
         answer: 3,
     },
     {
         question: "What is Captain America’s shield made out of?",
         choice1: "Steel",
         choice2: "Kryptonite",
         choice3: "Platinum",
         choice4: "Vibranium",
         answer: 4,
     },
     {
         question: "What country are Scarlet Witch and Quicksilver from?",
         choice1: "Sokovia",
         choice2: "Bulgaria",
         choice3: "Russia",
         choice4: "Spain",
         answer: 1,
     },
     {
         question: "Before becoming Vision, what is the name of Iron Man’s A.I. butler?",
         choice1: "J.A.R.E.D.",
         choice2: "J.U.P.I.T.E.R.",
         choice3: "J.A.R.V.I.S.",
         choice4: "J.U.N.K.Y.A.R.D.",
         answer: 3,
     }
 ];
 
 const SCORE_POINTS = 100;
 const MAX_QUESTIONS = 5;
 
 const startGame = () =>{
     questionCounter = 0;
     score = 0;
     availableQuestions = [...questions];
     getNewQuestion();
 };
 
 
 const getNewQuestion = () => {
     if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
         localStorage.setItem('mostRecentScore', score);
 
         return window.location.assign('/end.html');
     }
     //Applied the prefix over postfix, explain this
     ++questionCounter;
     progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
     progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;
     
     const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
     currentQuestion = availableQuestions[questionsIndex];
     question.innerText = currentQuestion.question;
 
     choices.forEach(choice => {
         const number = choice.dataset['number'];
         choice.innerText = currentQuestion['choice' + number];
     });

     availableQuestions.splice(questionsIndex, 1); 

    acceptingAnswers = true;
 };
 
 
 const incrementScore = num => {
     score +=num;
     scoreText.innerText = score;
 };
 
 choices.forEach(choice => {
     choice.addEventListener('click', e => {
         if(!acceptingAnswers) return;
 
         acceptingAnswers = false;
         const selectedChoice = e.target;
         const selectedAnswer = selectedChoice.dataset['number'];
 
         let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
 
         if(classToApply === 'correct'){
             incrementScore(SCORE_POINTS);
         }
 
         selectedChoice.parentElement.classList.add(classToApply);
 
        //  setTimeout(() => {
        //      selectedChoice.parentElement.classList.remove(classToApply);
        //      getNewQuestion();
        //  }, 1000);
        // Made the response time shorter to make the questions snap quicker
        setTimeout(() => {
             selectedChoice.parentElement.classList.remove(classToApply);
             getNewQuestion();
         }, 750);
     });
 });
 
 startGame();
