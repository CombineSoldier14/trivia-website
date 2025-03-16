var answered = false;

function getQuestion() {
    answered = false;
    document.getElementById("response").innerHTML = "";
    document.getElementById("answers").innerHTML = "";
    document.getElementById("question").innerHTML = "Loading...\n(Click the button again if this is taking a while)";
    var url = "https://opentdb.com/api.php?amount=1";
    var category = document.getElementById("category").value;
    var difficulty = document.getElementById("difficulty").value;
    var type = document.getElementById("type").value;
    if (category != "any") {
        url += "&category=" + category;
    }
    if (difficulty != "any") {
        url += "&difficulty=" + difficulty;
    }
    if (type != "any") {
        url += "&type=" + type;
    }
    console.log(url);
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("question").innerHTML = data.results[0].question;
            var answers = data.results[0].incorrect_answers;
            var correctAnswer = data.results[0].correct_answer;
            answers.push(correctAnswer);
            answers = answers.sort();
            var answerHTML = "";
            for (var i = 0; i < answers.length; i++) {
                if(answers[i] == correctAnswer){
                    answerHTML += "<button onclick='checkAnswer(this)', id='correctAnswer'>" + answers[i] + "</button>";
                } else {
                    answerHTML += "<button onclick='checkAnswer(this)'>" + answers[i] + "</button>";
                }
            }
            document.getElementById("answers").innerHTML = answerHTML;
            
        });
}

function checkAnswer(button) {
    var correctAnswer = document.getElementById("correctAnswer");
    if (button.innerHTML == correctAnswer.innerHTML && answered == false) {
        button.style.backgroundColor = "green";
        document.getElementById("response").innerHTML = "Correct!";
        answered = true;
    } 
    if(button.innerHTML != correctAnswer.innerHTML && answered == false) {
        button.style.backgroundColor = "red";
        document.getElementById("response").innerHTML = "Incorrect!";
        answered = true;
    }
}