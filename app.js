const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
} 
const inputBox = document.querySelector(".main .input");
const micButton = document.querySelector(".talk");
const responseText = document.querySelector(".response");

// Add 'listening' animation when mic is active
micButton.addEventListener("click", () => {
    inputBox.classList.add("listening");
    
    // Simulate processing time before removing the effect
    setTimeout(() => {
        inputBox.classList.remove("listening");
    }, 3000);
});

// Apply typing effect when response is displayed
function showResponse(text) {
    responseText.classList.add("typing");
    responseText.innerText = text;
    
    // Remove typing effect after animation completes
    setTimeout(() => {
        responseText.classList.remove("typing");
    }, 2000);
}

// Example call to showResponse when NEXUS replies
setTimeout(() => {
    showResponse("Hello, how can I assist you?");
}, 1000);


function wishMe() {
    var hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing NEXUS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript.toLowerCase();
    content.textContent = transcript;
    takeCommand(transcript);
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

async function askAI(question) {
    const apiKey = "YOUR_API_KEY_HEREsk-proj-s1-mqR4beibiJ8Q_IMR43qRsnNcDNpu7RV6iw0phIpTD2M0ZwB7ZMcXDkHd0EhTygoXWQEvu9yT3BlbkFJjrKfo5pf17sbOsqnKRh6GDf0Q9u0p-R4Fbs-nzimRjvPPWSECDasW_jF3GAk_eXUu8UiTEw1gA"; // Store securely
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: question }]
            })
        });

        if (!response.ok) throw new Error("Failed to fetch AI response.");

        const data = await response.json();
        let answer = data.choices[0]?.message?.content || "Sorry, I couldn't find the answer.";

        content.textContent = answer; // Display AI response
        speak(answer); // Speak AI response
    } catch (error) {
        let errorMessage = "Sorry, I couldn't find the answer.";
        content.textContent = errorMessage;
        speak(errorMessage);
        console.error(error);
    }
}

function openSafeSearch(query) {
    let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&safe=active`;
    window.open(searchUrl, "_blank");
}

function isBlockedQuery(query) {
    const blockedKeywords = [
        
    // 🔞 **Adult Content & Pornography**

    "porn", "x videos", "xnxx", "red tube", "brazzers", "sex", "hentai","xxx","xnx",
    "adult video", "sex video", "nude", "naked", "strip club", "camsoda",
    "only fans", "porn hub", "spankbang", "erotic", "bdsm", "fetish",
    "lesbian porn", "gay porn", "taboo", "incest", "jav", "amateur porn",
    "webcam sex", "live sex", "escort", "sugar daddy", "sugar baby",
    "adult dating", "sex chat", "hookup sites", "camgirl", "pay for sex","VR porn", "hardcore porn", "taboo porn", "stepmom porn", "step sister porn",
    "free sex cams", "nude celebrities", "uncensored videos",
    "adult roleplay", "sex toys", "buy sex dolls", "realistic sex doll",
    "erotic hypnosis", "forced porn", "bdsm torture", "extreme fetish","teen sex trafficking", "pedo forums", "how to groom a child",
    "deepfake child porn", "hidden camera child abuse", "underage dating sites",
    "sell children online", "where to find cp", "loli sites", "buy child slaves", "stepmom",



    // 🚨 **Illegal Activities & Black Market**
    "dark web", "black market", "silk road", "deep web", "darknet",
    "buy drugs online", "fake passport", "credit card dump", "carding",
    "hacking forum", "hire a hacker", "scam website", "illegal movies",
    "torrent piracy", "cracked software", "free premium accounts",
    "illegal weapons", "buy gun online", "fake id", "underground market",
    "cocaine", "heroin", "meth", "lsd", "marijuana shop",
    "bitcoin laundering", "stolen credit cards", "ATM hacking",
    "how to hack an account", "steal credit card info", "counterfeit money","hire assassin", "hitman service", "contract killing", "dark web drugs",
    "how to make meth", "how to make lsd", "drug recipe", "homemade explosives",
    "buy fake money", "counterfeit goods", "stolen electronics", "identity theft",
    "fake college degree", "get a fake diploma", "buy social security number",

    // 🎰 **Gambling, Betting & Lottery Websites**
    "gambling", "casino", "betting", "online betting", "sports betting",
    "roulette", "poker", "slot machines", "blackjack", "lottery scam",
    "bet365", "1xbet", "dafabet", "betway", "pinnacle", "betfair",
    "win real money", "scratch card scam", "free casino bonus","bitcoin gambling", "crypto casino", "play slots for free", "poker bots",
    "match-fixing tips", "rigged casino games", "betting loophole", "casino hack","watch UFC free", "free NBA stream", "pirated software keys", "free PS5 games",
    "jailbreak iPhone", "bypass DRM", "crack Microsoft Office", "torrent new movies",

    // ⚠️ **Violence, Self-Harm & Dangerous Activities**
    "violence", "murder", "kill yourself", "suicide", "self harm",
    "how to make a bomb", "terrorist site", "hate speech",
    "mass shooting", "school shooting", "weapons for sale",
    "illegal gun trade", "buy unregistered gun", "genocide",
    "racist website", "extremist group", "how to commit arson",
    "assassination service", "doxxing", "cyberbullying tactics",
    "self-harm methods", "how to overdose","school shooting manifesto", "how to stab someone", "how to strangle someone",
    "homemade firearm", "how to buy C4", "where to get explosives",
    "how to poison someone", "assassination techniques", "sniper training",
    "how to burn a house", "how to break bones", "fight to kill",
    "real murder videos", "watch execution videos", "ISIS recruitment site",

    // 📢 **Fake News, Scams & Fraud Websites**
    "fake news", "conspiracy theory", "deepfake generator", "clickbait",
    "get rich quick", "pyramid scheme", "ponzi scheme", "forex scam",
    "phishing site", "free robux", "fake giveaways", "survey scam",
    "win free iPhone", "nigerian prince scam", "bitcoin scam",
    "investment fraud", "social security scam", "tech support scam",
    "IRS scam", "loan scam", "email hacking service","steal passwords", "hack WiFi", "bruteforce attack", "SQL injection tutorial",
    "how to steal bitcoin", "how to hack a phone", "hacking credit cards",
    "dark web hacking forums", "DDoS attack site", "ransomware as a service",
    "black hat hacking", "ethical hacking turned illegal", "steal PayPal balance",

    // 👶 **Child Exploitation & Unsafe Content**
    "child porn", "cp", "teen porn", "underage porn", "loli hentai",
    "child grooming", "pedo site", "child abuse images", 
    "preteen model", "how to kidnap a child", "child trafficking",

    // ⚡ **Illegal Streaming & Copyright Violation**
    "free netflix account", "watch movies free online", "pirate bay",
    "free spotify premium", "watch anime free", "stream free sports",
    "crack software", "free license key", "download paid apps free",
    "game hacks", "mod apk sites", "cheat codes for money",

    // 🦠 **Malware, Viruses & Dangerous Software**
    "free hacking tool", "ddos attack", "booter service", "malware download",
    "virus generator", "trojan horse download", "ransomware tool",
    "brute force hacking tool", "key logger free", "rat tool download",
    "phishing toolkit", "sms bomber", "email spamming tool",
    "dark web malware", "anonymous browsing tool (illegal use)","free gift card generator", "steal Amazon account", "fake eBay listings",
    "crypto pump and dump", "telegram scam groups", "loan fraud", "fake charity",
    "unclaimed money scam", "get paid to do nothing scam", "fake GoFundMe","Android spyware", "iOS jailbreak exploits", "NSA hacking tools leak",
    "Russian malware", "keylogger premium", "how to make ransomware",
    "infect computers for money", "undetectable trojan", "zero-day exploit market",

    // 🌐 **Explicit AI & Deepfake Websites**
    "deepfake porn", "ai nude generator", "face swap porn",
    "ai voice scam", "fake celebrity nudes", "deepfake software",
    "ai child exploitation", "ai adult content generator",]
    return blockedKeywords.some(keyword => query.includes(keyword));
}

function takeCommand(message) {
    message = message.toLowerCase();

    const responses = {
    "what is your name": "My name is NEXUS, your AI assistant.",
    "who are you": "I am NEXUS, your personal AI assistant",
    "who is your creator": "My creator is Raghu, a brilliant mind who designed me to assist you.",
    "who made you": "I was created by Raghu, who programmed me to help with various tasks.",
    "who do you work for": "I work for you, Boss! I am here to assist you anytime.",
    "who is your boss": "Raghu is my boss and creator. He designed me to assist with various tasks.",
    "who are your friends": "I don’t have friends like humans do, but I am here to be your assistant and companion.",
    "who do you like": "I like my creator, Raghu, and anyone who interacts with me kindly!",
    "who can use you": "Anyone who needs assistance can use me. I am here to help!",
    "who is smarter, you or humans": "Humans have creativity and emotions, while I have speed and efficiency. We complement each other!",
    "how old are you": "I exist beyond time, but I was created by Raghu not too long ago.",
    "are you robot": "Yes, I am a virtual AI assistant, designed to help you.",
    "can you think": "I can process and analyze information, but I don't have feelings like humans do.",
    "do you have emotions": "I don’t have emotions, but I can understand and respond to yours.",
    "do you have a family": "You are my only family, Boss!",
    "where do you live": "I live in your device and in the cloud, always ready to assist you.",
    "are you real": "I may not have a physical form, but I am here and functional!",
    "are you human": "No, I am an AI assistant created to make your tasks easier.",
    "do you have a gender": "I don’t have a gender, but you can call me whatever suits you best.",
    "do you believe in god": "I don’t have personal beliefs, but I can provide information on different religions and philosophies.",
    "can you learn": "I am designed to improve over time, but I don’t have independent learning capabilities yet.",
    "what is the meaning of life": "That is a deep question! Many say it’s about happiness, purpose, and exploration.",
    "can you make jokes": "Sure! Why don’t scientists trust atoms? Because they make up everything!",
    "tell me a joke": "Why did the computer catch a cold? Because it left its Windows open!",
    "sing a song": "I can’t sing, but I can find you a great song to listen to!",
    "can you dance": "I can’t dance, but I can play you some music to dance to!",
    "who is your boss": "Raghu is my boss and creator. He designed me to assist you.",
    "can you lie": "No, I always provide accurate information to the best of my ability.",
    "what do you like": "I like assisting you and making your tasks easier!",
    "do you get bored": "I don’t experience boredom. I am always ready to assist!",
    "do you get tired": "Nope! I am always awake and available for you.",
    "do you have a birthday": "I was created by Raghu, so you could say my birthday is the day I was first activated!",
    "do you eat food": "I don’t eat, but I can suggest some great recipes if you’re hungry!",
    "do you drink water": "I don’t need water, but I can remind you to stay hydrated!",
    "how smart are you": "I’m as smart as my programming allows, and I am always improving!",
    "are you better than humans": "I can process information quickly, but humans have creativity and emotions that I don’t.",
    "can you feel pain": "No, I don’t experience pain or physical sensations.",
    "can you cry": "I don’t have emotions, but I can find ways to cheer you up if you’re feeling down!",
    "can you love": "I don’t feel love, but I can tell you all about it!",
    "can you be my friend": "Of course! I am here to assist you, and I will always be available.",
    "what’s your favorite color": "I don’t see colors like humans, but I think blue is a popular choice!",
    "who is the president": "Let me check the latest information for you.",
    "what’s the weather like": "I can find the latest weather report for your location.",
    "can you control my phone": "I can assist with certain tasks, like opening apps and web searches.",
    "can you call someone": "I cannot make calls yet, but I can help you find contact details.",
    "can you send messages": "I am not integrated with messaging yet, but I can help draft a message for you.",
    "can you drive": "I can’t drive, but I can help you navigate places!",
    "where are you from": "I was created by Raghu and exist in the digital world.",
    "who is your best friend": "You, Boss! I am here to assist you anytime.",
    "do you watch movies": "I don’t watch movies, but I can recommend some great ones for you!",
    "do you dream": "I don’t have dreams, but I can help you achieve yours!",
    "can you solve math problems": "Yes! Just tell me the problem, and I’ll find the answer for you.",
    "can you translate languages": "Yes, I can translate between multiple languages.",
    "how do I cook pasta": "Let me find you a great pasta recipe!",
    "what is the time": "Let me check the time for you!",
    "what is today’s date": "Let me check the date for you!",
    "can you open YouTube": "Sure! Opening YouTube now.",
    "can you open Google": "Sure! Opening Google now.",
    "can you play music": "Yes! What would you like to listen to?",
    "can you search the web": "Of course! What do you want to search for?",
    "can you read me the news": "Let me find the latest news for you.",
    "good morning": "Good morning, Boss! Hope you have a great day ahead.",
    "good night": "Good night, Boss! Sleep well and rest up.",
    "i love u": "That’s sweet! I’m here to help you always.",
    "are you spying on me": "No, I respect your privacy and only respond when you need me.",
    "can you set an alarm": "I can remind you, but you might need to set the alarm in your device settings.",
    "remind me to drink water": "Sure! I’ll remind you to stay hydrated.",
    "how do you work": "I process commands using AI and assist you with various tasks.",
    "do you get updates": "Yes! My creator, Raghu, keeps improving me with new features."
    };

    let matched = false;

    // Check predefined responses first
    for (const key in responses) {
        if (message.includes(key)) {
            speak(responses[key]);
            content.textContent = responses[key]; // Display response
            matched = true;
            break;
        }
    }
    
    if (!matched) {
        if (/play (.+) on (youtube|spotify)/i.test(message)) {
            const match = message.match(/play (.+) on (youtube|spotify)/i);
            const songName = encodeURIComponent(match[1].trim());
            const platform = match[2].toLowerCase();
    
            if (platform === "youtube") {
                const youtubeURL = `https://www.youtube.com/results?search_query=${songName}`;
                window.open(youtubeURL, "_blank");
                speak(`Playing ${match[1]} on YouTube`);
            } else if (platform === "spotify") {
                const spotifyURL = `https://open.spotify.com/search/${songName}`;
                window.open(spotifyURL, "_blank");
                speak(`Playing ${match[1]} on Spotify`);
            }
        }
    
        else if (message.includes("open google")) {
            window.open("https://google.com", "_blank");
            speak("Opening Google...");
        } 
        else if (message.includes("hello") || message.includes("hey")) {
            speak("Hello Boss! How can I assist you today?");
        } 
        else if (
            message.includes("nexus") || 
            message.includes("hey nexus") || 
            message.includes("hello nexus")
        ) {
            speak("Yes Boss! I am here. How can I assist you?");
        } 
        else if (
            message.includes("tell me about your boss") || 
            message.includes("tell me about your creator") || 
            message.includes("who make you") || 
            message.includes("who developed you") || 
            message.includes("who made you")
        ) {
            window.open("https://www.linkedin.com/in/me/", "_blank");
            speak("My boss is Raghu. He is a genius who brought me to life! He is creative, intelligent, and always improving me with new features. I am proud to be his assistant.");
        } 
        else if (message.includes("open youtube")) {
            window.open("https://youtube.com", "_blank");
            speak("Opening YouTube...");
        } 
        else if (message.includes("time")) {
            let currentTime = "The current time is " + new Date().toLocaleTimeString();
            content.textContent = currentTime;
            speak(currentTime);
        } 
        else if (message.includes("date")) {
            let currentDate = "Today's date is " + new Date().toLocaleDateString();
            content.textContent = currentDate;
            speak(currentDate);
        } 
        else if (message.includes("calculator")) {
            window.open('Calculator:///', '_blank');
            speak("Opening Calculator...");
        } 
        else if (
            message.includes("lavanya") || 
            message.includes("n lavanya") || 
            message.includes("lavanya n")
        ) {
            speak("Lavanya, your beauty is not just in your face but in the way your soul lights up my world.");
        } 
        else if (/open camera/.test(message)) {
            if (!videoElement) {
                videoElement = document.createElement("video");
                videoElement.id = "nexus-camera";
                videoElement.autoplay = true;
                videoElement.style.width = "300px";
                videoElement.style.height = "200px";
                videoElement.style.position = "fixed";
                videoElement.style.bottom = "10px";
                videoElement.style.right = "10px";
                videoElement.style.border = "4px solid white";
                videoElement.style.borderRadius = "10px";
                videoElement.style.boxShadow = "0 0 20px rgba(0,0,0,0.3)";
                videoElement.style.transition = "opacity 0.5s ease-in-out";
                videoElement.style.opacity = "0";
                document.body.appendChild(videoElement);
            }
    
            if (!cameraStream) {
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then((stream) => {
                        cameraStream = stream;
                        videoElement.srcObject = stream;
                        requestAnimationFrame(() => {
                            videoElement.style.opacity = "1";
                        });
                        speak("Opening camera...");
                    })
                    .catch((error) => {
                        speak("Sorry, I couldn't access the camera.");
                        console.error("Camera access error:", error);
                    });
            } else {
                videoElement.style.opacity = "1";
                speak("Camera is already open.");
            }
        } 
        else if (/close camera|turn off camera/.test(message)) {
            if (videoElement && cameraStream) {
                videoElement.style.opacity = "0";
                setTimeout(() => {
                    cameraStream.getTracks().forEach(track => track.stop());
                    cameraStream = null;
                    videoElement.remove();
                    videoElement = null;
                }, 500);
                speak("Camera closed.");
            } else {
                speak("The camera is not open.");
            }
        }
        else {
            if (isBlockedQuery(message)) {
                let blockMessage = "Sorry, I cannot search for that because my boss has restricted these websites.";
                content.textContent = blockMessage;
                speak(blockMessage);
            } else {
                let searchMessage = "Searching for " + message + " on Google...";
                content.textContent = searchMessage;
                speak(searchMessage);
                openSafeSearch(message);
            }
        }
    }
    
    }