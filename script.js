let currentQuestionIndex = 0;
let score = 0;
let questions = [];

const backgroundColors = [
  "#FFD700", "#FF6F61", "#FCE38A", "#FFABAB", "#D4A5FF"
];

let usedColors = []; // เก็บสีที่ถูกใช้ไปแล้ว

function getRandomColor() {
    // หากใช้สีครบทั้งหมดแล้ว ให้รีเซ็ต
    if (usedColors.length === backgroundColors.length) {
        usedColors = [];
    }

    let color;
    do {
        color = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    } while (usedColors.includes(color)); // สุ่มจนกว่าจะเจอสีที่ยังไม่ถูกใช้

    usedColors.push(color); // บันทึกสีที่ถูกใช้แล้ว
    return color;
}

// สุ่มลำดับคำถาม
function shuffleQuestions(array) {
  return array.sort(() => Math.random() - 0.5);
}

// ดึงคำถามจากไฟล์ JSON และสุ่มลำดับคำถาม
fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    questions = shuffleQuestions(data);
    loadQuestion();
  });

// โหลดคำถามและสุ่มแสดงไอคอน
function loadQuestion() {
  if (currentQuestionIndex < questions.length) {
      const questionData = questions[currentQuestionIndex];
      document.getElementById("question-number").textContent = `คำถามที่ ${currentQuestionIndex + 1}`;
      document.getElementById("question-text").textContent = questionData.question;

      const quizForm = document.getElementById("quizForm");
      quizForm.innerHTML = "";

      const nextButton = document.getElementById("nextButton");
      nextButton.style.display = "none";

      const quizContainer = document.querySelector(".quiz-container");
      quizContainer.style.backgroundColor = getRandomColor(); // เปลี่ยนสีพื้นหลัง

      const iconContainer = document.getElementById("icon-container");
      document.getElementById("icon-container").style.display = "block";
      iconContainer.innerHTML = `<img src="${questionData.image}" alt="Question Image" class="image-container img">`;

      questionData.choices.forEach((choice, index) => {
          const choiceDiv = document.createElement("div");
          choiceDiv.textContent = choice;
          choiceDiv.className = "choice";

          choiceDiv.addEventListener("click", () => {
              document.querySelectorAll(".choice").forEach(c => c.classList.remove("bg-yellow-300"));
              choiceDiv.classList.add("bg-yellow-300");
              nextButton.style.display = "block";
          });

          choiceDiv.dataset.value = index;
          quizForm.appendChild(choiceDiv);
      });
  } else {
      document.getElementById("quizForm").innerHTML = "";
      document.getElementById("question-number").textContent = "แบบทดสอบเสร็จสิ้น!";
      document.getElementById("question-text").textContent = `คะแนนของคุณ: ${score}/${questions.length}`;
      document.getElementById("nextButton").style.display = "none";
      document.getElementById("icon-container").style.display = "none";
  }
}


// ตรวจคำตอบและโหลดคำถามถัดไป
document.getElementById("nextButton").addEventListener("click", () => {
  const selectedChoice = document.querySelector(".choice.bg-yellow-300");
  if (selectedChoice) {
      const selectedValue = parseInt(selectedChoice.dataset.value);
      if (selectedValue === questions[currentQuestionIndex].correct) {
          score++;
      }
      currentQuestionIndex++;
      loadQuestion();
  } else {
      alert("กรุณาเลือกคำตอบก่อน!");
  }
});

// เริ่มโหลดคำถามแรก
loadQuestion();
console.log("Script loaded");

