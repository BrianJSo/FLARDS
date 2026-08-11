let mainPanel;
let titleCard;
let menuDiv;
let csvInput;

let promptCard;
let counter;
let maintext;
let subtext;
let answerDiv;

let correctCard;
let wrongCard;
let wrongTxt;

let scoreCard;
let scoreText;
let resetDiv;

let optionsPanel;
let optionsSampleMain;
let optionsSampleSub;
let fontSelect;
let subtextToggle;

let list = [];
let answerKey;
let score;
let initialLength;
let answerInput;

function loadApp(){
  mainPanel = document.querySelector(".panel.main");

  titleCard = document.querySelector(".title");
  menuDiv = document.querySelector(".main-menu");
  answerDiv = document.querySelector(".answer");

  promptCard = document.querySelector(".prompt");
  counter = document.querySelector(".counter");
  maintext = document.querySelector(".prompt .maintext");
  subtext = document.querySelector(".prompt .subtext");
  answerInput = document.querySelector(".answer .input");

  correctCard = document.querySelector(".correct");
  wrongCard = document.querySelector(".wrong");
  wrongTxt = document.querySelector(".wrong .maintext");

  scoreCard = document.querySelector(".score");
  scoreText = document.querySelector(".score .maintext");
  resetDiv = document.querySelector(".reset");

  optionsPanel = document.querySelector(".panel.options");
  subtextToggle = document.querySelector(".subtextControl .checkbox");
  optionsSampleMain = document.querySelector(".sample .maintext");
  optionsSampleSub = document.querySelector(".sample .subtext");
  fontSelect = document.querySelector(".options .fonts");

  csvInput = document.querySelector(".csv.input");

  loadPreferences();

  answerInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      document.querySelector(".answer .btn").click();
    }
  }); 
}

function loadPreferences() {
  csvInput.value = localStorage.getItem("csv");
  fontSelect.value = localStorage.getItem("font");
  subtextToggle.checked = JSON.parse(localStorage.getItem("hideSubtext"));

  setFont();
}

function setFont() {
  const font = fontSelect.value;
  
  optionsSampleMain.setAttribute('class', `maintext ${font}`);
  optionsSampleSub.setAttribute('class', `subtext ${font}`);
  maintext.setAttribute('class', `maintext ${font}`);
  subtext.setAttribute('class', `subtext ${font}`);
  fontSelect.setAttribute('class', `fonts ${font}`)

  localStorage.setItem("font", font);

  toggleSubtext();
}

function toggleSubtext() {
  const hideSubtext = subtextToggle.checked;
  if (hideSubtext) {
    subtext.classList.add("hide");
    optionsSampleSub.classList.add("hide");
  } else {
    subtext.classList.remove("hide");
    optionsSampleSub.classList.remove("hide");
  }
  localStorage.setItem("hideSubtext", hideSubtext);
}

function loadCSV(){
  const csv = csvInput.value;
  localStorage.setItem("csv", csv);

  list = csv.split("\n");
  score = 0;
  initialLength = list.length;

  titleCard.classList.toggle("flip");
  promptCard.classList.toggle("flip");
  answerDiv.classList.toggle("hide");
  menuDiv.classList.toggle("hide");

  nextItem();
}

function nextItem() {
  const curLength = list.length;
  const itemNum = Math.floor(Math.random() * curLength);

  if (curLength == 0) {
    showScore();
    return;
  }
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

  if (normalizeStr(answerKey) == normalizeStr(answer)){
    score++;
      
    promptCard.classList.toggle('flip');
    correctCard.classList.toggle('flip');
  
    setTimeout(() => {
      promptCard.classList.toggle('flip');
      correctCard.classList.toggle('flip');
      nextItem()
    }, 500);
  }
  else {
    wrongTxt.innerHTML = normalizeStr(answerKey)

    promptCard.classList.toggle('flip');
    wrongCard.classList.toggle('flip');
  
    setTimeout(() => {
      promptCard.classList.toggle('flip');
      wrongCard.classList.toggle('flip');
      nextItem()
    }, 2000);
  }
}

function showScore() {
  scoreText.innerHTML = `${score}/${initialLength}`

  promptCard.classList.toggle("flip");
  scoreCard.classList.toggle("flip");
  answerDiv.classList.toggle("hide");
  resetDiv.classList.toggle("hide");
}

function toggleOptions() {
  mainPanel.classList.toggle("hide");
  optionsPanel.classList.toggle("hide");
}

function restart() {
  scoreCard.classList.toggle("flip");
  titleCard.classList.toggle("flip");
  menuDiv.classList.toggle("hide");
  resetDiv.classList.toggle("hide");
}

// ---------------UTILS----------------

function normalizeStr(str) {
  return str.toLowerCase().trim();
}