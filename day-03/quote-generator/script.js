const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteButton = document.getElementById("newQuoteButton");

async function getRandomQuote() {
  quoteText.textContent = "Loading a quote...";
  quoteAuthor.textContent = "";
  newQuoteButton.disabled = true;

  try {
    const response = await fetch("https://dummyjson.com/quotes/random");

    if(!response.ok) {
      throw new Error("Could not get a quote.");
    }
    
    const data = await response.json();

    quoteText.textContent = '"' + data.quote + '"';
    quoteAuthor.textContent = "- " + data.author;
  } catch (error) {
    quoteText.textContent = "Could not load a quote. Please try again.";
  } finally {
    newQuoteButton.disabled = false;
  }
}

newQuoteButton.addEventListener("click", getRandomQuote);

getRandomQuote();