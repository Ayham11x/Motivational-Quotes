document.addEventListener("DOMContentLoaded", function () {
  // Set random Unsplash background on load
  document.body.style.backgroundImage =
    `url('https://source.unsplash.com/1600x900/?inspiration,nature,light,space,colors&sig=${Math.random()}')`;

  const quotes = [
    "Believe you can and you're halfway there.",
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Sometimes later becomes never. Do it now.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn’t just find you. You have to go out and get it.",
    "Don't watch the clock; do what it does. Keep going.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
  ];

  const quoteElement = document.getElementById("quote");
  const newQuoteButton = document.getElementById("new-quote");

  function getRandomQuote() {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  }

  // Show a quote when page loads
  quoteElement.textContent = getRandomQuote();

  // Change quote on button click
  newQuoteButton.addEventListener("click", () => {
    quoteElement.textContent = getRandomQuote();
  });
});
