// ====================================
// AI CHATBOT JAVASCRIPT
// ====================================

const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

// Predefined responses
const chatbotResponses = {
    greetings: {
        patterns: ['hello', 'hi', 'hey', 'greetings'],
        response: 'Hello! 👋 Welcome to ICOGON. How can I assist you today? You can ask about our services, pricing, or get a quote!'
    },
    services: {
        patterns: ['services', 'what do you offer', 'what can you do', 'offerings'],
        response: 'We offer a range of services including:\n• Website Development\n• Mobile App Development\n• AI/ML Solutions\n• E-commerce Development\n• UI/UX Design\n• SEO & Digital Marketing\n\nWhich service interests you?'
    },
    pricing: {
        patterns: ['price', 'pricing', 'cost', 'how much', 'plans'],
        response: 'Our pricing plans are:\n💰 Basic: ₹15,000/month - Perfect for startups\n⭐ Standard: ₹35,000/month - Best for growing businesses\n💎 Premium: ₹75,000/month - For enterprises\n\nWould you like more details about any plan?'
    },
    contact: {
        patterns: ['contact', 'phone', 'email', 'reach out'],
        response: 'You can reach us at:\n📧 Email: info@icogon.com\n📱 Phone: +91 98765 43210\n💬 WhatsApp: +91 98765 43210\n📍 Address: 123, Tech Park, Bangalore\n\nOr fill out our contact form above!'
    },
    portfolio: {
        patterns: ['portfolio', 'projects', 'work', 'examples'],
        response: 'Check out our portfolio section above to see our recent projects including E-commerce Platforms, Business Websites, Mobile Apps, and AI Applications! Each project showcases our expertise and quality of work.'
    },
    team: {
        patterns: ['team', 'about us', 'who are you', 'company'],
        response: 'ICOGON is a fast-growing IT company with 15+ experienced team members including developers, designers, and AI specialists. We have delivered 50+ projects to 30+ happy clients. Learn more in our About Us section!'
    },
    default: 'Great question! 🤔 For more information, please visit our services page or contact us directly. Is there anything else I can help you with?'
};

// Toggle Chat
function toggleChat() {
    const chatBox = document.getElementById('chatBox');
    chatBox.classList.toggle('hidden');
    
    if (!chatBox.classList.contains('hidden')) {
        chatInput.focus();
    }
}

// Send Message
function sendMessage() {
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Simulate typing indicator
    setTimeout(() => {
        const response = generateResponse(message);
        addMessage(response, 'bot');
    }, 500);
}

// Add Message to Chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = text;
    
    messageDiv.appendChild(messageParagraph);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Generate Response
function generateResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, data] of Object.entries(chatbotResponses)) {
        if (key === 'default') continue;
        
        if (data.patterns.some(pattern => lowerMessage.includes(pattern))) {
            return data.response;
        }
    }
    
    return chatbotResponses.default;
}

// Enter key to send
chatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Quick replies suggestion
function addQuickReply(text, action) {
    const replyBtn = document.createElement('button');
    replyBtn.textContent = text;
    replyBtn.style.cssText = `
        background: linear-gradient(135deg, rgb(255, 107, 53), rgb(255, 140, 66));
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 20px;
        cursor: pointer;
        margin: 4px;
        font-size: 0.9rem;
        transition: all 0.3s ease;
    `;
    
    replyBtn.addEventListener('mouseenter', () => {
        replyBtn.style.transform = 'translateY(-2px)';
        replyBtn.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.3)';
    });
    
    replyBtn.addEventListener('mouseleave', () => {
        replyBtn.style.transform = 'translateY(0)';
        replyBtn.style.boxShadow = 'none';
    });
    
    replyBtn.addEventListener('click', () => {
        chatInput.value = action;
        sendMessage();
    });
    
    return replyBtn;
}

// AI Features
function analyzeUserIntent(message) {
    const intent = {
        type: 'general',
        confidence: 0,
        data: {}
    };
    
    const serviceKeywords = ['website', 'app', 'ai', 'ecommerce', 'design', 'seo'];
    const urgencyKeywords = ['urgent', 'asap', 'quickly', 'immediately'];
    
    serviceKeywords.forEach(keyword => {
        if (message.toLowerCase().includes(keyword)) {
            intent.type = 'service_inquiry';
            intent.data.service = keyword;
            intent.confidence = 0.8;
        }
    });
    
    urgencyKeywords.forEach(keyword => {
        if (message.toLowerCase().includes(keyword)) {
            intent.data.urgent = true;
        }
    });
    
    return intent;
}

// Personality responses
const personalityTraits = {
    friendly: true,
    professional: true,
    helpful: true,
    responsive: true
};

// Initialize chat
function initializeChat() {
    // Add welcome message
    setTimeout(() => {
        addMessage('Hi there! 👋 Welcome to ICOGON. I\'m your AI assistant. How can I help you today?', 'bot');
    }, 500);
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChat);
} else {
    initializeChat();
}

console.log('Chatbot initialized successfully!');
