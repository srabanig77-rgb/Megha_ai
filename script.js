const API_KEY = AQ.Ab8RN6IhD3-alPphUSNTwm-O88O6vANfc2lkWwvXFTqMKzXOHQ

const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatBox = document.getElementById('chatBox');

async function getBotResponse(userMessage) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: userMessage }]
                }]
            })
        });

        const data = await response.json();
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            return data.candidates[0].content.parts[0].text;
        } else {
            return "Dukhito, kono uttor pawa jayni.";
        }
    } catch (error) {
        console.error("Error:", error);
        return "Kono ekta problem hochhe, abar chesta koro!";
    }
}

async function handleSendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // User message display
    appendMessage(text, 'user-message');
    userInput.value = '';

    // Loading message display
    const loadingDiv = appendMessage('Chinta korchhi...', 'bot-message');

    // Fetch response from Gemini API
    const botReply = await getBotResponse(text);
    
    // Update loading message with reply
    loadingDiv.innerText = botReply;
}

function appendMessage(text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', className);
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return msgDiv;
}

sendBtn.addEventListener('click', handleSendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendMessage();
});
