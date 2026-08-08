let mainPanel;
let titleCard;
let menuDiv;
let csvInput;

let promptCard;
let counter;
let maintext;
let subtext;
let answerDiv;

let scoreCard;
let scoreText;
let resetDiv;

let optionsPanel;

let list = [];
let answerKey;
let score;
let initialLength;
let answerInput;
let subtextToggleOn;

function loadApp(){
  mainPanel = document.querySelector(".panel.main");
  optionsPanel = document.querySelector(".panel.options");

  titleCard = document.querySelector(".title");
  menuDiv = document.querySelector(".menu");
  answerDiv = document.querySelector(".answer");

  promptCard = document.querySelector(".prompt");
  counter = document.querySelector(".counter");
  maintext = document.querySelector(".prompt .maintext");
  subtext = document.querySelector(".prompt .subtext");

  scoreCard = document.querySelector(".score");
  scoreText = document.querySelector(".score .maintext");
  resetDiv = document.querySelector(".reset");

  csvInput = document.querySelector(".csv.input");
  csvInput.value = localStorage.getItem("csv");

  answerInput = document.querySelector(".answer .input");

  answerInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      document.querySelector(".answer .btn").click();
    }
  }); 
}

function loadCSV(){
  
  subtextToggleOn = document.querySelector(".subtextControl .checkbox").checked;
  if(subtextToggleOn){
    document.querySelector(".prompt .subtext").classList.toggle("hide");
  }

  const csv = csvInput.value;
  localStorage.setItem("csv", csv);

  list = csv.split("\n");
  score = 0;
  initialLength = list.length;

  titleCard.classList.toggle("hide");
  promptCard.classList.toggle("hide");
  answerDiv.classList.toggle("hide");
  menuDiv.classList.toggle("hide");

  nextItem();
}

function nextItem() {
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
  scoreText.innerHTML = `${score}/${initialLength}`

  promptCard.classList.toggle("hide");
  scoreCard.classList.toggle("hide");
  answerDiv.classList.toggle("hide");
  resetDiv.classList.toggle("hide");
}

function toggleOptions() {
  mainPanel.classList.toggle("hide");
  optionsPanel.classList.toggle("hide");
}

function restart() {
  scoreCard.classList.toggle("hide");
  titleCard.classList.toggle("hide");
  menuDiv.classList.toggle("hide");
  resetDiv.classList.toggle("hide");
}