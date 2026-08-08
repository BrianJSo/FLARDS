let list = [];
let answerKey;
let score;

function loadApp(){
  const csv = document.querySelector(".csv .input");
  csv.value = localStorage.getItem("csv");
}

function loadCSV(){
  const answerDiv = document.querySelector(".answer");
  const csvDiv = document.querySelector(".csv");
  const csv = document.querySelector(".csv .input").value;

  localStorage.setItem("csv", csv);

  list = csv.split("\n");
  score = 0;

  answerDiv.classList.toggle("hide");
  csvDiv.classList.toggle("hide");

  nextItem();
}

function nextItem() {
  const maintext = document.querySelector(".div1 .maintext");
  const subtext = document.querySelector(".div1 .subtext");

  const itemNum = Math.floor(Math.random() * list.length);
  
  const item = list.splice(itemNum,1)[0];
  const itemArr = item.split(",");
  maintext.innerHTML  = itemArr[0];
  subtext.innerHTML   = itemArr[1];
  answerKey           = itemArr[2];
}

function answer(){
  const answer = document.querySelector(".answer .input").value;

  if (answerKey == answer){
    score++;
  }
  else {
    console.log("wrong");
  }
  nextItem()
}