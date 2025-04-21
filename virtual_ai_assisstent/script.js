let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let speak = new SpeechSynthesisUtterance(text);
    speak.rate = 1;
    speak.pitch = 1;
    speak.volume = 1;
    speak.lang = "en-US"; // Set default language to English
    window.speechSynthesis.speak(speak);
}

function wishMe() {
    let today = new Date();
    let hour = today.getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning!");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon!");
    } else {
        speak("Good Evening!");
    }
}

window.addEventListener("load", () => {
    wishMe();
});

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.lang = "en-US"; // Set recognition language to English

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase()); // Ensure consistent lowercase conversion
};

recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    btn.style.display = "flex";
    voice.style.display = "none";
};

recognition.onend = () => {
    console.log("Speech recognition ended.");
    btn.style.display = "flex";
    voice.style.display = "none";
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(command) {
    console.log("Recognized Command:", command);  // ✅ Add this

    btn.style.display = "flex";
    voice.style.display = "none";

    if (!command.trim()) {
        speak("Sorry, I didn't understand that.");
        return;
    }

    if (command.includes("hello") || command.includes("hey")) {
        speak("Hello sir, how can I help you?");
    } else if (command.includes("what is your name") || command.includes("what's your name")) {
        speak("My name is Artificial User Responsive Assistant, also known as AURA.");
    } else if (command.includes("open portfolio")) {
        window.open("https://portfolio-2-278q.onrender.com/", "_blank");
        speak("Opening portfolio.");
    } else if (command.includes("open github")) {
        window.open("https://github.com/Shashankhuilgol", "_blank");
        speak("Opening GitHub.");
    } else if (command.includes("open google")) {
        window.open("https://www.google.com", "_blank");
        speak("Opening Google.");
    } else if (command.includes("open youtube")) {
        window.open("https://www.youtube.com", "_blank");
        speak("Opening YouTube.");
    } else if (command.includes("time")) {
        let time = new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" });
        speak(`The time is ${time}`);
    } else if (command.includes("date")) {
        let date = new Date().toLocaleDateString();
        speak(`Today's date is ${date}`);
    } else {
        const query = encodeURIComponent(command);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
        speak(`Here's what I found on the internet about ${command}`);
    }
}