const screens = document.querySelectorAll(".screen");
const start_btn = document.getElementById("start-btn");
const game_container = document.getElementById("game-container");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const message = document.getElementById("message");

let seconds = 0;
let score = 0;

// Default insect image
const selected_image = {
  src: "./../images/Bishwash_Head.png",
  alt: "Bishwash",
};

// Start game when clicking "Play Game"
start_btn.addEventListener("click", () => {
  screens[0].classList.add("up"); // Hide start screen
  game_container.classList.add("active"); // Make game container visible
  setTimeout(createImage, 1000);
  startGame();
});

// Start Timer
function startGame() {
  setInterval(increaseTime, 1000);
}

function increaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time: ${m}:${s}`;
  seconds++;
}

// Create Insect Image
function createImage() {
  const image = document.createElement("div");
  image.classList.add("image");
  const { x, y } = getRandomLocation();
  image.style.top = `${y}px`;
  image.style.left = `${x}px`;
  image.innerHTML = `<img src="${selected_image.src}" alt="${
    selected_image.alt
  }"
    style="transform: rotate(${
      Math.random() * 360
    }deg); width: 60px; height: 60px;" />`;

  image.addEventListener("click", catchImage);

  game_container.appendChild(image);
}

// Generate Random Location
function getRandomLocation() {
  const width = game_container.clientWidth || window.innerWidth;
  const height = game_container.clientHeight || window.innerHeight;
  const x = Math.random() * (width - 100);
  const y = Math.random() * (height - 100);
  return { x, y };
}

// Catch Insect
function catchImage() {
  increaseScore();
  this.remove();
  addImages();
}

// Add More Insects After Catching
function addImages() {
  setTimeout(createImage, 1000);
  setTimeout(createImage, 1500);
}

// Increase Score
function increaseScore() {
  score++;
  if (score > 19) {
    message.classList.add("visible");
  }
  scoreEl.innerHTML = `Score: ${score}`;
}
