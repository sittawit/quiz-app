let currentQuestionIndex = 0;
let score = 0;
let questions = [];


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

      // ซ่อนปุ่ม "ถัดไป" ก่อน
      const nextButton = document.getElementById("nextButton");
      nextButton.style.display = "none";

      // แสดงรูปภาพที่เกี่ยวข้องกับคำถาม
      const iconContainer = document.getElementById("icon-container");
      iconContainer.innerHTML = `<img src="${questionData.image}" alt="Question Image" class="w-1/2 max-h-60 rounded-md mx-auto mb-4">`;

      questionData.choices.forEach((choice, index) => {
          const choiceDiv = document.createElement("div");
          choiceDiv.textContent = choice;
          choiceDiv.className = "choice bg-yellow-100 p-4 rounded-md mb-2 cursor-pointer hover:bg-yellow-200";

          choiceDiv.addEventListener("click", () => {
              // ลบ highlight จากตัวเลือกอื่น
              document.querySelectorAll(".choice").forEach(c => c.classList.remove("bg-yellow-300"));
              // เพิ่ม highlight ให้ตัวเลือกที่เลือก
              choiceDiv.classList.add("bg-yellow-300");
              // แสดงปุ่ม "ถัดไป"
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

