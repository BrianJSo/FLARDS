let list = [];
let answerKey;
let score;
let initialLength;
let answerInput;

function loadApp(){
  const csv = document.querySelector(".csv .input");
  csv.value = localStorage.getItem("csv");

  answerInput = document.querySelector(".answer .input");

  answerInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      document.querySelector(".answer .btn").click();
    }
  }); 
}

function loadCSV(){
  const answerDiv = document.querySelector(".answer");
  const csvDiv = document.querySelector(".csv");
  const csv = document.querySelector(".csv .input").value;
  const titleCard = document.querySelector(".title");
  const promptCard = document.querySelector(".prompt");

  localStorage.setItem("csv", csv);

  list = csv.split("\n");
  score = 0;
  initialLength = list.length;

  titleCard.classList.toggle("hide");
  promptCard.classList.toggle("hide");
  answerDiv.classList.toggle("hide");
  csvDiv.classList.toggle("hide");

  nextItem();
}

function nextItem() {
  const maintext = document.querySelector(".prompt .maintext");
  const subtext = document.querySelector(".prompt .subtext");
  const counter = document.querySelector(".counter");

  const curLength = list.length;
  const itemNum = Math.floor(Math.random() * curLength);

  const curCount = initialLength - curLength;

  counter.innerHTML = `${curCount}/${initialLength}`
  
  const item = list.splice(itemNum,1)[0];
  const itemArr = item.split(",");
  maintext.innerHTML  = itemArr[0];
  subtext.innerHTML   = itemArr[1];
  answerKey           = itemArr[2];
  answerInput.value = '';
  answerInput.focus()
}

function answer(){
  const answer = answerInput.value;

  if (answerKey.toLowerCase() == answer.toLowerCase()){
    score++;
  }
  else {
    console.log("wrong");
  }

  if (list.length == 0) {
    showScore();
  }
  else {
    nextItem()
  }
}

function showScore() {
  const promptCard = document.querySelector(".prompt");
  const scoreCard = document.querySelector(".score");
  const answerDiv = document.querySelector(".answer");
  const scoreText = document.querySelector(".score .maintext");

  scoreText.innerHTML = `${score}/${initialLength}`

  promptCard.classList.toggle("hide");
  scoreCard.classList.toggle("hide");
  answerDiv.classList.toggle("hide");
}