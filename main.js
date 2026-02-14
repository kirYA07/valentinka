var starCount = 400;
var maxTime = 30;
var universe = document.getElementById("universe");
var width = window.innerWidth;
var height = window.innerHeight;

// --- ЗІРКИ ---
for (var i = 0; i < starCount; ++i) {
  var ypos = Math.round(Math.random() * height);
  var star = document.createElement("div");
  var speed = 1000 * (Math.random() * maxTime + 1);
  star.setAttribute("class", "star" + (3 - Math.floor(speed / 1000 / 8)));
  universe.appendChild(star);
  star.animate(
    [
      { transform: "translate3d(" + width + "px, " + ypos + "px, 0)" },
      { transform: "translate3d(-256px, " + ypos + "px, 0)" }
    ],
    { delay: Math.random() * -speed, duration: speed, iterations: Infinity }
  );
}

// --- СЕРЦЯ ---
var central = document.querySelector(".central");
if (central) {
  central.animate(
    [
      { transform: "rotate(-45deg) scale(0.98)", opacity: 0.9 },
      { transform: "rotate(-45deg) scale(1.02)", opacity: 1 }
    ],
    { direction: "alternate", duration: 1500, iterations: Infinity, easing: "ease-in-out" }
  );
}

var smallHearts = document.querySelectorAll(".heart-small");
smallHearts.forEach((el, i) => {
    const animation = el.animate(
      [
        { transform: "rotate(-45deg) scale(0.95)", opacity: 0.9 },
        { transform: "rotate(-45deg) scale(1.05)", opacity: 1 }
      ],
      { direction: "alternate", duration: 1200, delay: i * 300, iterations: Infinity, easing: "ease-in-out" }
    );
    el.addEventListener("mouseenter", () => animation.pause());
    el.addEventListener("mouseleave", () => animation.play());
});

// --- ЛОГІКА ДЛЯ ТЕКСТУ (Fixed Speed & Infinite Loop) ---
const track = document.getElementById('track');
const originalText = document.getElementById('original-text');

if (track && originalText) {
    // 1. Клонуємо текст, щоб заповнити простір без дірок
    const clone = originalText.cloneNode(true);
    track.appendChild(clone);

    // 2. Налаштування швидкості (Пікселів за секунду)
    // Чим менше число, тим повільніше. Спробуй 30 або 50.
    const pixelsPerSecond = 100; 

    // 3. Вираховуємо ширину тексту
    // Беремо scrollWidth, оскільки текст може бути широким
    const textWidth = originalText.scrollWidth;

    // 4. Розраховуємо час анімації: Час = Відстань / Швидкість
    // Оскільки ми рухаємо обидва блоки (оригінал + клон), дистанція = textWidth * 2
    // Але анімація CSS рухає на -50% (тобто на один блок), тому duration базуємо на одному блоці
    const animationDuration = textWidth / pixelsPerSecond;

    // 5. Запускаємо анімацію
    track.style.animation = `scroll-infinite ${animationDuration}s linear infinite`;
}