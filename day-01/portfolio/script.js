let button = document.getElementById("contactButton");

button.addEventListener("click", function() {
    alert("Thank you visiting my portfolio!");
});

let aboutText = document.getElementById("aboutText");
let aboutButton = document.getElementById("aboutButton");

aboutButton.addEventListener("click", function() {
    aboutText.textContent = "I'm working every day to improve my coding skills. My goal is to become a professional developer and build useful products in the future.";
});

