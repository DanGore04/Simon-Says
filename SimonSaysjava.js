//Code used for reference https://codingartistweb.com/2022/09/simon-game-with-javascript/
//Initial References
const countValue = document.getElementById("count2");
const highestValue = document.getElementById("count1");
const colorPart = document.querySelectorAll(".color-part");
const startButton = document.querySelector("#start");
const result = document.querySelector("#result");

//Mapping Colors By Creating Colors Object
const colors = {
  color1: {
    current: "#068e06",
    new: "#11e711",
  },
  color2: {
    current: "#950303",
    new: "#fd2a2a",
  },
  color3: {
    current: "#01018a",
    new: "#2062fc",
  },
  color4: {
    current: "#919102",
    new: "#fafa18",
  },
};

//variables
let highestcount = 0;
let i =0;
let randomColors = [];
let pathGeneratorBool = false;
let count, clickCount = 0;

//Function to start game
startButton.addEventListener("click", async () => {
  document.querySelectorAll(".middle")[0].style.backgroundColor ="green" ;
  await delay(3000);
  count = 0;
  clickCount = 0;
  randomColors = [];
  pathGeneratorBool = false;
  pathGenerate();
});

//Function to decide the sequence
const pathGenerate = () => {
  randomColors.push(generateRandomValue(colors));
  count = randomColors.length;
  pathGeneratorBool = true;
  pathDecide(count);
};

//Function to get a random value from object
const generateRandomValue = (obj) => {
  let arr = Object.keys(obj);
  return arr[Math.floor(Math.random() * arr.length)];
};

//Function to play the sequence
const pathDecide = async (count) => {
  countValue.innerText = count;
  for (let i of randomColors) {
    let currentColor = document.querySelector(`.${i}`);
    //Change delay on level
    if(count<5){
      await delay(600);
      currentColor.style.backgroundColor = `${colors[i]["new"]}`;
      await delay(600);
      currentColor.style.backgroundColor = `${colors[i]["current"]}`;
      await delay(600);
    }
    else if(count<9 & count>=5){
      await delay(400);
      currentColor.style.backgroundColor = `${colors[i]["new"]}`;
      await delay(400);
      currentColor.style.backgroundColor = `${colors[i]["current"]}`;
      await delay(400);
    }
    else if(count<13 & count>=9){
      await delay(300);
      currentColor.style.backgroundColor = `${colors[i]["new"]}`;
      await delay(300);
      currentColor.style.backgroundColor = `${colors[i]["current"]}`;
      await delay(300);
    }
    else{
      await delay(200);
      currentColor.style.backgroundColor = `${colors[i]["new"]}`;
      await delay(200);
      currentColor.style.backgroundColor = `${colors[i]["current"]}`;
      await delay(200);
    }
  }
  pathGeneratorBool = false;
};

//Delay for blink effect
async function delay(time) {
  return await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

//When user click on the colors
colorPart.forEach((element) => {
  element.addEventListener("click", async (e) => {
    //if user clicks the same color then next level
    if (pathGeneratorBool) {
      return false;
    }
    if (e.target.classList[0] == randomColors[clickCount]) {
      //Color blick effect on click
      e.target.style.backgroundColor = `${
        colors[randomColors[clickCount]]["new"]
      }`;
      await delay(500);

      e.target.style.backgroundColor = `${
        colors[randomColors[clickCount]]["current"]
      }`;

      //User click
      clickCount += 1;

      //Next level if number of valid clicks == count
      if (clickCount == count) {
        clickCount = 0;
        pathGenerate();
      }
    }
    //lose
    else {
      lose();
    }
  });
});

//Function when player executes wrong sequence
const lose = async () => {
  //Check with highest level
  if(highestcount<=count){
    highestcount=count;
    highestValue.innerText = highestcount;
  }
  document.querySelectorAll(".middle")[0].style.backgroundColor ="red" ;
  //5 blinks
  while(i<5){
    document.querySelectorAll(".color-part")[0].style.backgroundColor =`#068e06`;
    document.querySelectorAll(".color-part")[1].style.backgroundColor =`#950303`;
    document.querySelectorAll(".color-part")[2].style.backgroundColor =`#01018a`;
    document.querySelectorAll(".color-part")[3].style.backgroundColor =`#919102`;
  await delay(500);
    document.querySelectorAll(".color-part")[0].style.backgroundColor =`#11e711`;
    document.querySelectorAll(".color-part")[1].style.backgroundColor =`#fd2a2a`;
    document.querySelectorAll(".color-part")[2].style.backgroundColor =`#2062fc`;
    document.querySelectorAll(".color-part")[3].style.backgroundColor =`#fafa18`;
    await delay(500);
   i++;
  }
  //final color change
  document.querySelectorAll(".color-part")[0].style.backgroundColor =`#068e06`;
  document.querySelectorAll(".color-part")[1].style.backgroundColor =`#950303`;
  document.querySelectorAll(".color-part")[2].style.backgroundColor =`#01018a`;
  document.querySelectorAll(".color-part")[3].style.backgroundColor =`#919102`;
  i=0;
};