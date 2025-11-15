(function () {
  const words = ["Airport Transfer", "Comfort", "VIP Ride", "Family Friendly"];
  let wordIndex = 0;
  let charIndex = 0;
  let textEl = null;

  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  function type() {
    if (!textEl) {
      textEl = document.getElementById("wcTypingText");
      if (!textEl) {
        setTimeout(type, 200);
        return;
      }
    }
    const word = words[wordIndex];
    if (charIndex < word.length) {
      textEl.textContent = word.slice(0, ++charIndex);
      setTimeout(type, 90);
    } else {
      setTimeout(erase, 1300);
    }
  }

  function erase() {
    const word = words[wordIndex];
    if (charIndex > 0) {
      textEl.textContent = word.slice(0, --charIndex);
      setTimeout(erase, 50);
    } else {
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 300);
    }
  }

  ready(function () {
    setTimeout(type, 400);
  });
})();
