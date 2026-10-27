const toast = document.querySelector(".toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2800);
}

document.querySelector(".copy-button").addEventListener("click", async () => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText("VETE10");
    } else {
      const input = document.createElement("textarea");
      input.value = "VETE10";
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      const copied = document.execCommand("copy");
      input.remove();
      if (!copied) throw new Error("Não foi possível copiar");
    }
    showToast("Cupom VETE10 copiado!");
  } catch {
    showToast("Cupom: VETE10");
  }
});

const burgerCarousel = document.querySelector(".burger-carousel");
const burgerTrack = document.querySelector(".burger-track");
const burgerCards = [...burgerTrack.children];
const burgerDots = [...document.querySelectorAll(".burger-dot")];
const reducedBurgerMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const firstBurgerClone = burgerCards[0].cloneNode(true);
const lastBurgerClone = burgerCards[burgerCards.length - 1].cloneNode(true);
firstBurgerClone.setAttribute("aria-hidden", "true");
lastBurgerClone.setAttribute("aria-hidden", "true");
firstBurgerClone.querySelector("img").alt = "";
lastBurgerClone.querySelector("img").alt = "";
burgerTrack.prepend(lastBurgerClone);
burgerTrack.append(firstBurgerClone);

let burgerPosition = 1;
let burgerMoving = false;
let burgerTimer;
let burgerHovered = false;
let burgerTouchStart = null;

function positionBurger(index) {
  burgerTrack.style.transform = `translate3d(${-burgerTrack.children[index].offsetLeft}px, 0, 0)`;
}

function markBurger(index) {
  const active = (index - 1 + burgerCards.length) % burgerCards.length;
  [...burgerTrack.children].forEach((card, cardIndex) => {
    card.classList.toggle("is-active", cardIndex === index);
  });
  burgerCards.forEach((card, cardIndex) => {
    if (cardIndex === active) card.removeAttribute("aria-hidden");
    else card.setAttribute("aria-hidden", "true");
  });
  burgerDots.forEach((dot, dotIndex) => {
    const selected = dotIndex === active;
    dot.classList.toggle("is-active", selected);
    if (selected) dot.setAttribute("aria-current", "true");
    else dot.removeAttribute("aria-current");
  });
}

function snapBurger(index) {
  burgerTrack.style.transition = "none";
  burgerPosition = index === 0 ? burgerCards.length : index === burgerCards.length + 1 ? 1 : index;
  positionBurger(burgerPosition);
  markBurger(burgerPosition);
  burgerTrack.offsetWidth;
  requestAnimationFrame(() => {
    burgerTrack.style.transition = "";
    burgerMoving = false;
  });
}

function moveBurger(index) {
  if (burgerMoving || index === burgerPosition) return;
  burgerMoving = true;
  burgerPosition = index;
  markBurger(index);
  positionBurger(index);
  if (reducedBurgerMotion.matches) {
    snapBurger(index);
  }
}

burgerTrack.addEventListener("transitionend", (event) => {
  if (event.target !== burgerTrack || event.propertyName !== "transform") return;
  if (burgerPosition === 0) snapBurger(burgerCards.length);
  else if (burgerPosition === burgerCards.length + 1) snapBurger(1);
  else burgerMoving = false;
});

function scheduleBurger() {
  clearTimeout(burgerTimer);
  if (document.hidden || burgerHovered || reducedBurgerMotion.matches) return;
  burgerTimer = setTimeout(() => {
    moveBurger(burgerPosition + 1);
    scheduleBurger();
  }, 4400);
}

burgerDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    const target = index === 0 && burgerPosition === burgerCards.length
      ? burgerCards.length + 1
      : index + 1;
    moveBurger(target);
    scheduleBurger();
  });
});

burgerCarousel.addEventListener("keydown", (event) => {
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
  event.preventDefault();
  moveBurger(burgerPosition + (event.key === "ArrowRight" ? 1 : -1));
  scheduleBurger();
});

burgerCarousel.addEventListener("pointerdown", (event) => {
  burgerTouchStart = event.clientX;
});
burgerCarousel.addEventListener("pointerup", (event) => {
  if (burgerTouchStart === null) return;
  const distance = event.clientX - burgerTouchStart;
  burgerTouchStart = null;
  if (Math.abs(distance) < 45) return;
  moveBurger(burgerPosition + (distance < 0 ? 1 : -1));
  scheduleBurger();
});
burgerCarousel.addEventListener("pointercancel", () => { burgerTouchStart = null; });
burgerCarousel.addEventListener("mouseenter", () => { burgerHovered = true; scheduleBurger(); });
burgerCarousel.addEventListener("mouseleave", () => { burgerHovered = false; scheduleBurger(); });
document.addEventListener("visibilitychange", scheduleBurger);
reducedBurgerMotion.addEventListener("change", scheduleBurger);
window.addEventListener("resize", () => snapBurger(burgerPosition));

burgerTrack.style.transition = "none";
positionBurger(burgerPosition);
markBurger(burgerPosition);
burgerTrack.offsetWidth;
burgerTrack.style.transition = "";
scheduleBurger();

const reviews = [
  {
    author: "Eduardo Muniz",
    age: "7 meses atrás",
    quote: "Hambúrguer muito gostoso. A carne e o molho no ponto. Atendimento rápido e bem atenciosos. Entrega super rápido. Entre o preparo e a entrega, não passou de 30min. Recomendo, galera!",
    avatar: "./assets/b25db.png",
    url: "https://share.google/FW8Y2EhdIZOvWX90m"
  },
  {
    author: "Roberta Rocha",
    age: "3 meses atrás",
    quote: "Hambúrgueres muito bem elaborados, saborosos. A entrega foi no tempo hábil e os produtos chegaram quentes. Parabéns!!",
    avatar: "./assets/cdeb4.png",
    url: "https://share.google/E7ZVUR8I2eZ2QacHR"
  },
  {
    author: "Warllene OFICIAL",
    age: "3 meses atrás",
    quote: "Eu amo o Hambúrguer de Frango 😋 Não peço mais em outro lugar.",
    avatar: "./assets/be85d.png",
    url: "https://share.google/XZ5OlpW2sRBI4KI6b"
  },
  {
    author: "Juliana Oliveira",
    age: "7 meses atrás",
    quote: "Perfeito, nunca decepciona, o hambúrguer sempre chega quentinho e a carne no ponto certo!",
    avatar: "./assets/d28cf.png",
    url: "https://share.google/HLbByv4951ZFiZp6H"
  },
  {
    author: "Gabriel Marques",
    age: "5 meses atrás",
    quote: "Hambúrguer muito bem montado, equipe atenciosa, entregador pontual. Ótima opção pra zona sul de Teresina",
    avatar: "./assets/45784.png",
    url: "https://share.google/uaLcKqojp7l56yY4i"
  }
];

const reviewTrack = document.querySelector(".review-track");
const reviewTemplate = reviewTrack.querySelector(".review-card");
const reviewDots = [...document.querySelectorAll(".review-dot")];
const reviewCards = reviews.map((review, index) => {
  const card = index === 0 ? reviewTemplate : reviewTemplate.cloneNode(true);
  const source = card.querySelector(".review-source");
  source.textContent = review.author.toUpperCase();
  source.href = review.url;
  card.querySelector(".review-age").textContent = review.age;
  card.querySelector(".review-quote").textContent = review.quote;
  card.querySelector(".review-avatar").src = review.avatar;
  if (index > 0) reviewTrack.append(card);
  return card;
});
const firstReviewClone = reviewCards[0].cloneNode(true);
const lastReviewClone = reviewCards[reviewCards.length - 1].cloneNode(true);
firstReviewClone.setAttribute("aria-hidden", "true");
lastReviewClone.setAttribute("aria-hidden", "true");
firstReviewClone.querySelector(".review-source").tabIndex = -1;
lastReviewClone.querySelector(".review-source").tabIndex = -1;
reviewTrack.prepend(lastReviewClone);
reviewTrack.append(firstReviewClone);

let reviewPosition = 1;
let reviewMoving = false;

function positionReview(index) {
  reviewTrack.style.transform = `translate3d(${-reviewTrack.children[index].offsetLeft}px, 0, 0)`;
}

function markReview(index) {
  const active = (index - 1 + reviewCards.length) % reviewCards.length;
  [...reviewTrack.children].forEach((card, cardIndex) => {
    card.classList.toggle("is-active", cardIndex === index);
  });
  reviewCards.forEach((card, cardIndex) => {
    const selected = cardIndex === active;
    if (selected) card.removeAttribute("aria-hidden");
    else card.setAttribute("aria-hidden", "true");
    card.querySelector(".review-source").tabIndex = selected ? 0 : -1;
  });
  reviewDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === active);
  });
}

function snapReview(index) {
  reviewTrack.style.transition = "none";
  reviewPosition = index === 0 ? reviewCards.length : index === reviewCards.length + 1 ? 1 : index;
  positionReview(reviewPosition);
  markReview(reviewPosition);
  reviewTrack.offsetWidth;
  requestAnimationFrame(() => {
    reviewTrack.style.transition = "";
    reviewMoving = false;
  });
}

function moveReview(index) {
  if (reviewMoving || index === reviewPosition) return;
  reviewMoving = true;
  reviewPosition = index;
  markReview(index);
  positionReview(index);
  if (reducedBurgerMotion.matches) snapReview(index);
}

reviewTrack.addEventListener("transitionend", (event) => {
  if (event.target !== reviewTrack || event.propertyName !== "transform") return;
  if (reviewPosition === 0) snapReview(reviewCards.length);
  else if (reviewPosition === reviewCards.length + 1) snapReview(1);
  else reviewMoving = false;
});

document.querySelectorAll(".review-arrow").forEach((button) => {
  button.addEventListener("click", () => {
    moveReview(reviewPosition + (button.dataset.direction === "next" ? 1 : -1));
  });
});

window.addEventListener("resize", () => snapReview(reviewPosition));

reviewTrack.style.transition = "none";
positionReview(reviewPosition);
markReview(reviewPosition);
reviewTrack.offsetWidth;
reviewTrack.style.transition = "";
