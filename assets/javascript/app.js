
$( document ).ready(function() {
    
$(".timeCount").hide();
$(".answers").hide();
$("#correctAnswer").hide();
$("#playagain").hide();
$("#timeisup").hide();

var showNext;
var countDown;
var timeLeft = 15;
var counter = 0;
var rightAnswers = 0;
var wrongAnswers = 0;
var unanswered = 0;
var questionAnswer = [{
    question: "What is the largest country in the world?",
    answer: ["Canada", "China", "Russia", "USA"],
    correctAnswer: 2,
    picture: src="assets/images/russia.jpg"
    }, {
    question: "What has the most gramms of vitamin C in 100 gramms?",
    answer: ["Kiwi", "Orange", "Broccoli", "Strawberries"],
    correctAnswer: 0,
    picture: src="assets/images/kiwi.jpg"
    }, {
    question: "What is the biggest planet in solar system?",
    answer: ["Saturn", "Jupiter", "Earth", "Uranus"],
    correctAnswer: 1,
    picture: src="assets/images/jupiter.jpg"
    }, {
    question: "How many square inches in 1 square meter?",
    answer: ["2325", "1550", "2015", "1240"],
    correctAnswer: 1,
    picture: src="assets/images/convert.jpg"
    }, {
    question: "What is the deepest lake in the world?",
    answer: ["Tahoe", "Malawi", "Caspian Sea", "Baikal"],
    correctAnswer: 3,
    picture: src="assets/images/baikal.jpg"
    }, {
    question: "What is the largest city by population in the world?",
    answer: ["Tokyo - Japan", "New York - USA", "Shanghai - China", "Delhi - India"],
    correctAnswer: 0,
    picture: src="assets/images/tokyo.jpg"
    }, {
    question: "Which from the list is not a musical band?",
    answer: ["Modern Talking", "Roxette", "Vitas", "Little Big"],
    correctAnswer: 2,
    picture: src="assets/images/sorry.jpg"
    }, {
    question: "How many bones are in the human body?",
    answer: ["216", "208", "206", "198"],
    correctAnswer: 2,
    picture: src="assets/images/skull.jpg"
    }, {
    question: "Which from the list is not an island?",
    answer: ["Santorini", "Maui", "Tasmania", "Tuvalu"],
    correctAnswer: 3,
    picture: src="assets/images/tuvalu.jpg"
    }, {
    question: "What is the biggest star?",
    answer: ["Sirius", "Canopus", "Alpha", "Centauri"],
    correctAnswer: 0,
    picture: src="assets/images/stars.jpg"
    }];


//Game begins when user clicks on START button
    $("a.btn").on("click", function(){
    $(".timeCount").fadeIn();
    $("a.btn").hide(); 
    displayQuestion();
    $(".answers").fadeIn();
    });        

    //Setting up the countdown timer for 15 sec
    function countDownTime() {    
        if (timeLeft == 0) {
          clearTimeout(countDown);          
          displayTimeIsUp();
          showNext = setTimeout(nextQuestion, 3000);
          counter++;         
        } else {          
          timeLeft--;
        }       
        $(".timeCount").text('Time remaining: ' + timeLeft + ' seconds'); 
    };

    //When the time is up
    function displayTimeIsUp(){
        $(".result").show();
        $(".answers").hide();
        $(".question").hide();
        $(".correctAnswer").show();
        $("#timeisup").show();
        $(".result").text("Sorry, the time is up:(");
        $(".correctAnswer").text("The right answer is: " + questionAnswer[counter].answer[questionAnswer[counter].correctAnswer]);
        unanswered++;
    }
    //Display the question and 4 possible answers
    function displayQuestion(){
        $("#unanswered").hide();
        $("#wrongAnswers").hide();
        $("#rightAnswers").hide();
        $(".result").hide();
        $("#playagain").hide();
        $("#timeisup").hide();
        $(".timeCount").show();
        //clearTimeout(countdown);
    if (counter <= 9) {
        timeLeft = 15;
        $(".timeCount").text('Time remaining: ' + timeLeft + ' seconds');
        countDown = setInterval(countDownTime, 1000);
        $(".answers").show();
        $(".question").show();
        $("#pic").hide();
        $("#correctAnswer").hide();
        var Question = questionAnswer[counter];
        //console.log(Question);
        $(".question").text(Question.question);
        $(".answers #button1").text(Question.answer[0]);
        $(".answers #button2").text(Question.answer[1]);
        $(".answers #button3").text(Question.answer[2]);
        $(".answers #button4").text(Question.answer[3]); 
    }else{
        finalPage();
        }       
     };
    
    //When user make his choice and clicks on on of 4 possible answers buttons
     $(".btn-info").on("click", function(){
        clearTimeout(countDown);
        //Retrieve the text from the button (since it doesn't have the value)
        var choice = $(this).html();
        //Checking if the choice is the right answer
        if (choice !== questionAnswer[counter].answer[questionAnswer[counter].correctAnswer]) {
            wrongAnswer();
            wrongAnswers ++;
            console.log("Wrong: " + wrongAnswers);
        } else {
            rightAnswer();
            rightAnswers++;
            console.log("RIGHT: " + rightAnswers);
        }
        counter++;
        });
   
    //When user picked the correct answer    
    function rightAnswer() {
        clearTimeout(countDown);
        $(".result").show();
        $(".answers").hide();
        $(".question").hide();
        $(".result").text("That is correct!");
        $("#correctAnswer").show();
        showNext = setTimeout(nextQuestion, 3000);
       
    }

    //Usewr picked the wrong answer
    function wrongAnswer() {
        clearTimeout(countDown);        
        $(".correctAnswer").show();
        $(".result").show();
        $("#pic").show();
        $(".answers").hide();
        $(".question").hide();
        $(".result").text("Sorry, you are wrong! :(");
        $(".correctAnswer").text("The right answer is: " + questionAnswer[counter].answer[questionAnswer[counter].correctAnswer])
        showNext = setTimeout(nextQuestion, 3000);
        $("#pic").attr("src", questionAnswer[counter].picture);
        
    }

    //Display next question
    function nextQuestion() {
        clearTimeout(showNext); 
        $("#correctAnswer").hide();
        $(".result").hide();
        $(".correctAnswer").hide();
        displayQuestion();
        //alert("hi");
    }

    //Display final page with all the scores
    function finalPage() {
        clearTimeout(showNext);  
        $("#correctAnswer").hide();
        $(".timeCount").hide();
        $(".result").hide();
        $(".answers").hide();
        $(".question").hide();
        $("#timeisup").hide();
        $("#unanswered").text("Unanswered questions: " + unanswered);
        $("#wrongAnswers").text("Wrong answeres: " + wrongAnswers);
        $("#rightAnswers").text("Correct answeres: " + rightAnswers);
        $("#unanswered").show();
        $("#wrongAnswers").show();
        $("#rightAnswers").show();
        $(".result").show();
        $(".result").text("You are all done! BRAVO!");
        $("#pic").attr("src", "assets/images/bravo.jpg");
        $("#pic").show();
        $("#playagain").show();
        //showNext = setTimeout(ifPlayAgain, 3000);

    }
    
    //Asking the user if he wants to play again
    $("#playagain").on("click", function(){
        counter = 0;
        rightAnswers = 0;
        wrongAnswers = 0;
        unanswered = 0;
        displayQuestion();
    })


}); 
    

      
    




