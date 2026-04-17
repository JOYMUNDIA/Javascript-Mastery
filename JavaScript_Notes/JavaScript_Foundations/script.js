// ============ Hamburger Menu and Sidebar ========== //
const menuButton = document.getElementById("menuButton");
const sideMenu = document.getElementById("sideMenu");

// ===== MENU DRAW ANIMATION =====
const lines = document.querySelectorAll(".line");
const chalk = document.getElementById("chalk");

function drawLine(line, chalkMove, delay){
  setTimeout(() => {

    line.style.animation = `drawLine 0.6s forwards`;
    chalk.style.animation = `${chalkMove} 0.6s forwards`;

  }, delay);
}

// Sequence each line
drawLine(lines[0], "chalkMove1", 0);
drawLine(lines[1], "chalkMove2", 700);
drawLine(lines[2], "chalkMove3", 1400);

setTimeout(() => {
  chalk.style.animation = "chalkReturn 0.5s forwards";
}, 2100);

// ===== ONLY TOGGLE SIDEBAR ON HAMBURGER CLICK =====
menuButton.addEventListener("click", () => {
  // Toggle sidebar
  sideMenu.classList.toggle("active");

  // Toggle hamburger X
  const hamburger = menuButton.querySelector(".hamburger");
  hamburger.classList.toggle("active");

  // move chalkboard outward
  menuButton.classList.toggle("shifted");
});
