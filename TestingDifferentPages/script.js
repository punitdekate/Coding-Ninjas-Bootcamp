// script.js
console.log("hello")

function goToAnotherPage() {
    const data = "Hello";
    localStorage.setItem("dataFromHomePage", data);
    window.location.href = "anotherPage.html";
}

document.addEventListener("DOMContentLoaded", function() {
    const dataFromHomePage = localStorage.getItem("dataFromHomePage");
    if (dataFromHomePage) {
        document.getElementById("dataDisplay").textContent = `Data from Homepage: ${dataFromHomePage}`;
        // Clear the data from localStorage if needed
        localStorage.removeItem("dataFromHomePage");
    }
});