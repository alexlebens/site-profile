const animateContent = () => {
  const smoothReveal = document.querySelectorAll('.smooth-reveal');
  smoothReveal.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('animate-reveal');
    }, 50 + index * 100);
  });

  const smoothReveal2 = document.querySelectorAll('.smooth-reveal-2');
  smoothReveal2.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('animate-reveal');
    }, 200 + index * 250);
  });

  const smoothRevealCards = document.querySelectorAll('.smooth-reveal-cards');
  smoothRevealCards.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('animate-reveal');
    }, 400 + index * 250);
  });

  const smoothRevealFade = document.querySelectorAll('.smooth-reveal-fade');
  smoothRevealFade.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('animate-reveal-fade');
    }, 100 + index * 250);
  });
};

export { animateContent  };
