let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// SVG Icon List
const animalIcons = [
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" class="icon">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" class="icon">
      <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
    </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" class="icon">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082" />
    </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" class="icon">
      <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
    </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" class="icon">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
    </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" class="icon">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" class="icon">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
    </svg>`,


];


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
              // กำหนดค่าที่เลือก
              choiceDiv.dataset.selected = true;
          });

          choiceDiv.dataset.value = index;
          quizForm.appendChild(choiceDiv);
      });

      // แสดงไอคอนแบบสุ่ม
      const randomIcon = animalIcons[Math.floor(Math.random() * animalIcons.length)];
      const iconContainer = document.getElementById("icon-container");
      iconContainer.innerHTML = randomIcon;
      iconContainer.style.display = "block";
  } else {
      // เมื่อคำถามจบ
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
