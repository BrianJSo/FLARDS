function loadCSV(){
  const answerDiv = document.querySelector(".answer");
  const csvDiv = document.querySelector(".csv");
  const csv = document.querySelector(".csv .input").value;

  answerDiv.classList.toggle("hide");
  csvDiv.classList.toggle("hide");

  localStorage.setItem("csv", csv);
  
  alert(localStorage.getItem("csv"));
}