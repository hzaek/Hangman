let wordForm = document.querySelector(".wordForm");
let formType = ["Games", "Programming", "Anime", "Countries"];
let games = ["Mine Craft", "DBD", "FIFA"];
let anime = ["naruto", "black clover", "jojo"];
let programming = ["php", "css", "js", "go", "laravel", "react"];
let countries = ["oman", "yamen", "USA"];

function rand(arr) {
  let rand = new Set();
  while (rand.size < arr.length) {
    rand.add(Math.ceil(Math.random(arr.length) * arr.length) - 1);
  }
  let randForm = [];
  for (let i = 0; i < arr.length; i++) {
    randForm[i] = arr[[...rand][i]];
  }
  return randForm;
}

let storeForm = rand(formType);
let storeGames = rand(games);
let storeAnime = rand(anime);
let storeProgramming = rand(programming);
let storeCountries = rand(countries);
wordForm.textContent = `Word Form: ${storeForm[0]}`;

function main() {
  let mistakes = genMistakes();
  let chosenForm = storeForm[0];
  let chosenWord;
  switch (chosenForm) {
    case "Games":
      chosenWord = storeGames[0];
      break;
    case "Programming":
      chosenWord = storeProgramming[0];
      break;
    case "Anime":
      chosenWord = storeAnime[0];
      break;
    case "Countries":
      chosenWord = storeCountries[0];
      break;
    default:
      console.error("chekc arrays");
  }
  console.log(chosenWord);

  function createWordBoxes() {
    let userInput = document.querySelector(".userInput");
    for (let i in chosenWord) {
      if (chosenWord[i] == " ") {
        let div = document.createElement("div");
        div.style.position = "relative";
        let span = document.createElement("span");
        span.style.cssText =
          "background-color:black;width:80%;height:3px; position:absolute; bottom:50%;transform:translatey(50%)";
        div.append(span);
        userInput.append(div);
        div.className = `box${i}`;
        continue;
      }

      let div = document.createElement("div");
      div.className = `box${i}`;
      userInput.append(div);
    }
  }

  createWordBoxes();

  let letters = document.querySelectorAll(".letters > div");
  letters.forEach(function (el) {
    el.addEventListener("click", function a(e) {
      el.style.cursor = "default";
      let chosenUpper = chosenWord.toUpperCase();
      let textUpper = e.target.textContent.toUpperCase();
      if (chosenUpper.indexOf(textUpper) !== -1) {
        
        let positions = [];
        [...chosenUpper].forEach(function (el, index) {
          if (el === textUpper) {
            positions.push(index);
          }
        });
        for (let i of positions) {
          let div = document.querySelector(`.box${i}`);
          div.append(textUpper);
        }
        
        let points = 0;
        for (let i in chosenWord){
           if (document.querySelector(`.box${i}`).textContent){
            points+=1
           }
           if(points === chosenWord.length){
            end.style.cssText = "visibility: visible;opacity:1;";
            theWord.textContent = `The Word is ${chosenWord.toUpperCase()}`
            
           }
        }

        el.style.backgroundColor = "#eee";
        el.removeEventListener("click", a);
      } else {
        if (mistakes.next().done === true) {
          end.style.cssText = "visibility: visible;opacity:1;";
          winLose.textContent = "You Lose";
          winLose.style.cssText = "background-color:var(--red-color)";
          theWord.textContent = `The Word is ${chosenWord.toUpperCase()}`
        }
        el.style.backgroundColor = "var(--red-color)";
        el.removeEventListener("click", a);
      }
    });
  });
}
function* genMistakes() {
  let tries = document.querySelector(".tries");
  let div = document.createElement("div");
  div.className = "firstMistake";
  tries.append(div);
  yield 1;
  let div1 = document.createElement("div");
  div1.className = "secondMistake";
  tries.append(div1);
  yield 2;
  let div2 = document.createElement("div");
  div2.className = "thirdMistake";
  div1.append(div2);
  yield 3;
  let div3 = document.createElement("div");
  div3.className = "fourthMistake";
  div2.append(div3);
  yield 4;
  let div4 = document.createElement("div");
  div4.className = "fifthMistake";
  div3.append(div4);
  yield 5;
}
let end = document.querySelector(".end");
let winLose = document.querySelector(".win-lose");
let reset = document.querySelector(".reset");
let theWord = document.querySelector('.word')
reset.onclick = function () {
  window.location.reload();
};
main();
// function* levels() {
//   yield* storeForm;
//   storeForm = randForm()
//   yield 2;
// }


