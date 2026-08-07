function loadApp(){
  const csv = document.querySelector(".csv .input");
  csv.value = localStorage.getItem("csv");

  localStorage.setItem("itemNum", 0);
  localStorage.setItem("score", 0);
}

function loadCSV(){
  const answerDiv = document.querySelector(".answer");
  const csvDiv = document.querySelector(".csv");
  const csv = document.querySelector(".csv .input").value;

  answerDiv.classList.toggle("hide");
  csvDiv.classList.toggle("hide");

  localStorage.setItem("csv", csv);
  
  nextItem();
}

function nextItem() {
  const itemNum =  localStorage.getItem("itemNum");
  const csv = document.querySelector(".csv .input").value;
  const maintext = document.querySelector(".div1 .maintext");
  const subtext = document.querySelector(".div1 .subtext");

  const list = csv.split("\n");

  const main = list[itemNum].split(",");
  maintext.innerHTML = main[0];
  subtext.innerHTML = main[1];
  
  localStorage.setItem("answerKey", main[2]);
}

function answer(){
  const itemNum =  parseInt(localStorage.getItem("itemNum"));
  const answerKey = localStorage.getItem("answerKey");
  const answer = document.querySelector(".answer .input").value;

  if (answerKey == answer){
    const curScore = parseInt(localStorage.getItem("score"));
    localStorage.setItem("score", curScore+1);
  }
  else {
    console.log("wrong");
  }
  
  localStorage.setItem("itemNum", itemNum+1);
  nextItem()
}