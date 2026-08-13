let titlePanel;
let titleCard;
let menuDiv;
let csvInput;

let mainPanel;
let promptCard;
let counter;
let maintext;
let subtext;
let answerDiv;

let correctCard;
let wrongCard;
let wrongTxt;

let scorePanel;
let scoreCard;
let scoreText;
let resetDiv;

let optionsPanel;
let optionsSampleMain;
let optionsSampleSub;
let fontSelect;
let subtextToggle;

let list = [];
let prompt;
let wrongs;
let answerKey;
let score;
let initialLength;
let answerInput;
let answerDisabled;

function loadApp(){
  titlePanel = document.querySelector(".panel.title");

  titleCard = document.querySelector(".title");
  menuDiv = document.querySelector(".main-menu");
  answerDiv = document.querySelector(".answer");

  mainPanel = document.querySelector(".panel.main");
  promptCard = document.querySelector(".prompt");
  counter = document.querySelector(".counter");
  maintext = document.querySelector(".prompt .maintext");
  subtext = document.querySelector(".prompt .subtext");
  answerInput = document.querySelector(".answer .input");

  correctCard = document.querySelector(".correct");
  wrongCard = document.querySelector(".wrong");
  wrongTxt = document.querySelector(".wrong .maintext");

  scorePanel = document.querySelector(".panel.score");
  scoreCard = document.querySelector(".card.score");
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
  wrongs = '';
  answerDisabled = true;
  initialLength = list.length;

  titlePanel.classList.toggle("flip");
  mainPanel.classList.toggle("flip");

  nextItem();
}

function nextItem() {
  const curLength = list.length;
  const itemNum = Math.floor(Math.random() * curLength);

  if (curLength == 0) {
    showScore();
    return;
  }
  const curCount = initialLength - curLength + 1;

  counter.innerHTML = `${curCount}/${initialLength}`
  
  const item = list.splice(itemNum,1)[0];
  const itemArr = item.split(",");
  prompt = normalizeStr(itemArr[0]);
  maintext.innerHTML  = prompt;
  subtext.innerHTML   = itemArr[1];
  answerKey           = itemArr[2];
  answerInput.value = '';
  answerInput.focus()
  answerDisabled = false;
}

function answer(){
  if(answerDisabled){
    return;
  }
  answerDisabled = true;
  
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
    wrongTxt.innerHTML = normalizeStr(answerKey);
    wrongs += `\n${prompt} - ${normalizeStr(answerKey)}`;

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

  mainPanel.classList.toggle("flip");
  scorePanel.classList.toggle("flip");
}

function copyScore(){
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  };
  const date = new Date().toLocaleString("default", options);

  const mistakes  = initialLength-score;

  navigator.clipboard.writeText(
`${date}
✅ ${score}/${initialLength}
${ mistakes
?`❌ ${mistakes} mistake${mistakes>1?'s':''}:${wrongs}`
: 'NO MISTAKES💯' 
}
https://brianjso.github.io/FLARDS/`);
}

function toggleOptions() {
  titlePanel.classList.toggle("flip");
  optionsPanel.classList.toggle("flip");
}

function restart() {
  scorePanel.classList.toggle("flip");
  titlePanel.classList.toggle("flip");
}

// ---------------UTILS----------------

function normalizeStr(str) {
  return str.toLowerCase().trim();
}