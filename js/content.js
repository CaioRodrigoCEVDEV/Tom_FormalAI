(() => {
if (window.__tomFormalInitialized) {
    return;
}

window.__tomFormalInitialized = true;

const INITIAL_RESULT_MESSAGE = "Texto formalizado aparecera aqui.";
const API_OFFLINE_MESSAGE = "API OFFLINE. Tente novamente mais tarde.";
const API_TIMEOUT_MS = 20000;
const STORAGE_KEYS = {
    button: "toggleButtonPosition",
    panel: "panelPosition"
};

const toggleButton = document.createElement("button");
const panel = document.createElement("div");
const textarea = document.createElement("textarea");
const formalizeButton = document.createElement("button");
const sendToWhatsAppButton = document.createElement("button");
const resultArea = document.createElement("div");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;
let toastTimeoutId = null;
let currentTheme = detectTheme();
let pendingReplacement = null;

toggleButton.textContent = "F";
toggleButton.type = "button";

panel.style.position = "fixed";
panel.style.bottom = "120px";
panel.style.right = "20px";
panel.style.width = "300px";
panel.style.border = "1px solid #ccc";
panel.style.borderRadius = "25px";
panel.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0)";
panel.style.padding = "15px";
panel.style.zIndex = "2147483647";
panel.style.fontFamily = "Arial, sans-serif";
panel.style.display = "none";

textarea.placeholder = "Digite seu texto aqui...";
textarea.style.fontFamily = "Arial, sans-serif";
textarea.style.zIndex = "2147483647";
textarea.style.width = "100%";
textarea.style.height = "100px";
textarea.style.marginBottom = "10px";
textarea.style.padding = "0px";
textarea.style.borderRadius = "5px";
textarea.style.border = "none";
textarea.style.resize = "vertical";
textarea.autocomplete = "off";

formalizeButton.type = "button";
formalizeButton.innerText = "Formalizar";
formalizeButton.style.width = "100%";
formalizeButton.style.padding = "10px";
formalizeButton.style.border = "1px solid #ccc";
formalizeButton.style.borderRadius = "25px";
formalizeButton.style.cursor = "pointer";
formalizeButton.style.marginBottom = "10px";

sendToWhatsAppButton.type = "button";
sendToWhatsAppButton.id = "sendToWhatsAppButton";
sendToWhatsAppButton.innerText = "Inserir no WhatsApp";
sendToWhatsAppButton.style.width = "100%";
sendToWhatsAppButton.style.padding = "10px";
sendToWhatsAppButton.style.border = "1px solid #ccc";
sendToWhatsAppButton.style.borderRadius = "25px";
sendToWhatsAppButton.style.cursor = "pointer";
sendToWhatsAppButton.style.marginBottom = "10px";

resultArea.style.marginTop = "10px";
resultArea.style.marginRight = "10px";
resultArea.style.width = "100%";
resultArea.style.padding = "0px";
resultArea.style.minHeight = "50px";
resultArea.style.maxHeight = "200px";
resultArea.style.overflowY = "auto";
resultArea.style.whiteSpace = "pre-wrap";
resultArea.style.opacity = "1";
resultArea.style.userSelect = "text";
resultArea.style.pointerEvents = "auto";
resultArea.innerText = INITIAL_RESULT_MESSAGE;

panel.appendChild(textarea);
panel.appendChild(formalizeButton);
panel.appendChild(sendToWhatsAppButton);
panel.appendChild(resultArea);

document.body.appendChild(toggleButton);
document.body.appendChild(panel);

applyTheme(currentTheme);
registerThemeListener();
registerHoverHandlers();
registerDragHandlers();
registerShortcutHandlers();

toggleButton.onclick = async () => {
    const shouldOpen = panel.style.display === "none";

    if (!shouldOpen) {
        resetPanel();
        return;
    }

    const chatInput = getChatInput();
    const selectionText = captureReplacementSelection(chatInput);

    if (selectionText) {
        textarea.value = selectionText;
    } else if (chatInput && !textarea.value.trim()) {
        textarea.value = getInputText(chatInput);
    }

    positionPanelNearButton();
    panel.style.display = "block";

    if (textarea.value.trim()) {
        await formalizeText();
    } else {
        textarea.focus();
    }
};

formalizeButton.onclick = async () => {
    await formalizeText();
};

sendToWhatsAppButton.onclick = () => {
    const outputText = resultArea.innerText.trim();

    if (
        outputText === INITIAL_RESULT_MESSAGE ||
        outputText === API_OFFLINE_MESSAGE ||
        sendToWhatsAppButton.disabled
    ) {
        showToast("Por favor, formalize o texto antes de enviar.", 4000);
        return;
    }

    const chatInput = getChatInput();

    if (!chatInput) {
        showToast("Campo de mensagem nao encontrado. Certifique-se de que esta na conversa certa!", 4000);
        return;
    }

    insertTextIntoChatInput(chatInput, outputText, pendingReplacement);
    resetPanel();
};

loadSavedPositions().catch((error) => {
    console.error("Erro ao carregar posicoes salvas:", error);
});

function detectTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function registerThemeListener() {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    if (typeof mediaQuery.addEventListener === "function") {
        mediaQuery.addEventListener("change", (event) => {
            currentTheme = event.matches ? "dark" : "light";
            applyTheme(currentTheme);
        });
    }
}

function applyTheme(theme) {
    const isDark = theme === "dark";

    toggleButton.style.fontWeight = "bold";
    toggleButton.style.fontSize = "12px";
    toggleButton.style.position = "fixed";
    toggleButton.style.zIndex = "9999";
    toggleButton.style.padding = "10px 20px";
    toggleButton.style.border = "none";
    toggleButton.style.borderRadius = "100px";
    toggleButton.style.cursor = "pointer";
    toggleButton.style.boxShadow = "0px 4px 8px rgba(0,0,0,0.2)";
    toggleButton.style.top = toggleButton.style.top || "70px";
    toggleButton.style.right = toggleButton.style.right || "20px";
    toggleButton.style.bottom = "auto";

    panel.style.backdropFilter = "blur(18px)";

    if (isDark) {
        toggleButton.style.color = "white";
        toggleButton.style.backgroundColor = "rgba(36, 38, 38, 0.77)";
        panel.style.backgroundColor = "rgba(36, 38, 38, 0.77)";
        panel.style.borderColor = "rgba(33, 192, 99, 0.0)";
        textarea.style.backgroundColor = "rgba(36, 38, 38, 0.0)";
        textarea.style.color = "white";
        formalizeButton.style.backgroundColor = "rgba(37, 37, 37, 0.5)";
        formalizeButton.style.color = "white";
        formalizeButton.style.borderColor = "rgba(33, 192, 99, 0.0)";
        sendToWhatsAppButton.style.backgroundColor = "rgba(37, 37, 37, 0.5)";
        sendToWhatsAppButton.style.color = "white";
        sendToWhatsAppButton.style.borderColor = "rgba(33, 192, 99, 0.0)";
        resultArea.style.color = "white";
    } else {
        toggleButton.style.color = "rgb(94, 94, 94)";
        toggleButton.style.backgroundColor = "rgba(255, 255, 255, 0.77)";
        panel.style.backgroundColor = "rgba(255, 255, 255, 0.33)";
        panel.style.borderColor = "rgba(0, 0, 0, 0.1)";
        textarea.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
        textarea.style.color = "black";
        formalizeButton.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
        formalizeButton.style.color = "black";
        formalizeButton.style.borderColor = "rgba(0, 0, 0, 0.1)";
        sendToWhatsAppButton.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
        sendToWhatsAppButton.style.color = "black";
        sendToWhatsAppButton.style.borderColor = "rgba(0, 0, 0, 0.1)";
        resultArea.style.color = "black";
    }
}

function registerHoverHandlers() {
    toggleButton.addEventListener("mouseenter", () => {
        toggleButton.style.backgroundColor = "rgb(33, 192, 99)";
        toggleButton.style.color = currentTheme === "dark" ? "black" : "white";

        if (panel.style.display === "none") {
            showToast("Clique ou pressione Ctrl + Q para abrir o painel.", 5000);
        }
    });

    toggleButton.addEventListener("mouseleave", () => {
        applyTheme(currentTheme);
        hideToast();
    });

    formalizeButton.addEventListener("mouseenter", () => {
        formalizeButton.style.backgroundColor = currentTheme === "dark" ? "rgba(33, 192, 99, 0.3)" : "rgba(33, 192, 99, 0.6)";
        formalizeButton.innerText = "Formalizar (Ctrl + Y)";
    });

    formalizeButton.addEventListener("mouseleave", () => {
        applyTheme(currentTheme);
        formalizeButton.innerText = "Formalizar";
    });

    sendToWhatsAppButton.addEventListener("mouseenter", () => {
        sendToWhatsAppButton.style.backgroundColor = currentTheme === "dark" ? "rgba(33, 192, 99, 0.3)" : "rgba(33, 192, 99, 0.6)";
        sendToWhatsAppButton.innerText = "Enviar para o WhatsApp (Ctrl + Q)";
    });

    sendToWhatsAppButton.addEventListener("mouseleave", () => {
        applyTheme(currentTheme);
        sendToWhatsAppButton.innerText = "Inserir no WhatsApp";
    });
}

function registerDragHandlers() {
    toggleButton.addEventListener("mousedown", (event) => {
        isDragging = true;
        toggleButton.style.bottom = "auto";
        offsetX = event.clientX - toggleButton.getBoundingClientRect().left;
        offsetY = event.clientY - toggleButton.getBoundingClientRect().top;
        toggleButton.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (event) => {
        if (!isDragging) {
            return;
        }

        const buttonWidth = toggleButton.offsetWidth;
        const buttonHeight = toggleButton.offsetHeight;
        const maxX = Math.max(0, window.innerWidth - buttonWidth);
        const maxY = Math.max(0, window.innerHeight - buttonHeight);
        const x = clamp(event.clientX - offsetX, 0, maxX);
        const y = clamp(event.clientY - offsetY, 0, maxY);

        toggleButton.style.left = `${x}px`;
        toggleButton.style.top = `${y}px`;
        toggleButton.style.right = "auto";
        toggleButton.style.bottom = "auto";

        if (panel.style.display === "block") {
            positionPanelNearButton();
        }
    });

    document.addEventListener("mouseup", async () => {
        if (!isDragging) {
            return;
        }

        isDragging = false;
        toggleButton.style.cursor = "pointer";
        await savePositions();
    });
}

function registerShortcutHandlers() {
    document.addEventListener("keydown", (event) => {
        if (!event.ctrlKey || event.repeat) {
            return;
        }

        const key = event.key.toLowerCase();

        if (key === "q") {
            event.preventDefault();

            if (panel.style.display === "block") {
                sendToWhatsAppButton.click();
            } else {
                toggleButton.click();
            }
        }

        if (key === "y" && panel.style.display === "block") {
            event.preventDefault();
            formalizeButton.click();
        }
    });
}

function positionPanelNearButton() {
    const buttonRect = toggleButton.getBoundingClientRect();
    const panelWidth = panel.offsetWidth || 300;
    const panelHeight = panel.offsetHeight || 260;
    const x = clamp(buttonRect.left + 52, 0, Math.max(0, window.innerWidth - panelWidth - 16));
    const y = clamp(buttonRect.top - panelHeight, 0, Math.max(0, window.innerHeight - panelHeight - 16));

    panel.style.left = `${x}px`;
    panel.style.top = `${y}px`;
    panel.style.right = "auto";
    panel.style.bottom = "auto";
}

function getChatInput() {
    const selectors = [
        '[contenteditable="true"][data-tab="10"]',
        '[contenteditable="true"][data-tab="6"]',
        'footer [contenteditable="true"]',
        'div[contenteditable="true"][role="textbox"]',
        'div[contenteditable="true"][aria-placeholder]',
        'input.w-full.rounded-full.bg-gray-100',
        '[placeholder="Digite uma mensagem"]'
    ];

    for (const selector of selectors) {
        const elements = document.querySelectorAll(selector);

        for (const element of elements) {
            if (!panel.contains(element) && element !== textarea) {
                return element;
            }
        }
    }

    return null;
}

function getInputText(inputElement) {
    if (!inputElement) {
        return "";
    }

    if (typeof inputElement.value === "string") {
        return inputElement.value.trim();
    }

    return inputElement.textContent?.trim() || "";
}

function captureReplacementSelection(inputElement) {
    pendingReplacement = null;

    if (!inputElement) {
        return window.getSelection()?.toString().trim() || "";
    }

    if (typeof inputElement.value === "string") {
        const start = inputElement.selectionStart;
        const end = inputElement.selectionEnd;

        if (typeof start === "number" && typeof end === "number" && end > start) {
            pendingReplacement = { type: "input", start, end };
            return inputElement.value.slice(start, end).trim();
        }

        return window.getSelection()?.toString().trim() || "";
    }

    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
        return "";
    }

    const range = selection.getRangeAt(0);

    if (!inputElement.contains(range.commonAncestorContainer)) {
        return selection.toString().trim();
    }

    pendingReplacement = {
        type: "contenteditable",
        range: range.cloneRange()
    };

    return selection.toString().trim();
}

function insertTextIntoChatInput(inputElement, text, replacement) {
    inputElement.focus();

    if (typeof inputElement.value === "string") {
        if (replacement?.type === "input") {
            inputElement.setSelectionRange(replacement.start, replacement.end);
            inputElement.setRangeText(text, replacement.start, replacement.end, "end");
        } else {
            inputElement.value = text;
        }

        inputElement.dispatchEvent(new Event("input", { bubbles: true }));
        return;
    }

    const selection = window.getSelection();
    const range = replacement?.type === "contenteditable" ? replacement.range.cloneRange() : document.createRange();

    if (replacement?.type !== "contenteditable") {
        range.selectNodeContents(inputElement);
        range.collapse(false);
    }

    selection.removeAllRanges();
    selection.addRange(range);

    const inserted = document.execCommand("insertText", false, text);

    if (!inserted) {
        inputElement.textContent = text;
        inputElement.dispatchEvent(new InputEvent("input", {
            bubbles: true,
            data: text,
            inputType: "insertText"
        }));
    }
}

async function formalizeText() {
    const inputText = textarea.value.trim();

    if (!inputText) {
        showToast("Por favor, digite um texto.", 4000);
        resultArea.innerText = INITIAL_RESULT_MESSAGE;
        textarea.focus();
        return;
    }

    resultArea.innerText = "";
    formalizeButton.innerText = "Formalizando, aguarde...";
    toggleButton.disabled = true;
    formalizeButton.disabled = true;
    sendToWhatsAppButton.disabled = true;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        const formalizedText = await sendToOpenAI(`"${inputText}"`);
        resultArea.innerText = formalizedText.replace(/^"|"$/g, "");
        sendToWhatsAppButton.disabled = false;
    } catch (error) {
        console.error("Erro ao formalizar:", error);
        resultArea.innerText = API_OFFLINE_MESSAGE;
        showToast(error.message || API_OFFLINE_MESSAGE, 4000);
        sendToWhatsAppButton.disabled = false;
    } finally {
        toggleButton.disabled = false;
        formalizeButton.disabled = false;
        formalizeButton.innerText = "Formalizar";
    }
}

async function sendToOpenAI(text) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

    try {
        const response = await fetch("https://openai.caiorodrigocev.com.br/rewrite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text }),
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error(`Erro ao chamar API (${response.status})`);
        }

        const data = await response.json();

        if (!data || !data.rewrittenText) {
            throw new Error("Resposta invalida da API");
        }

        return data.rewrittenText;
    } catch (error) {
        if (error.name === "AbortError") {
            throw new Error("Tempo limite excedido ao chamar a API.");
        }

        throw new Error(API_OFFLINE_MESSAGE);
    } finally {
        clearTimeout(timeoutId);
    }
}

function showToast(message, time) {
    let toast = document.getElementById("alertPersonalizado");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "alertPersonalizado";
        toast.style.position = "fixed";
        toast.style.bottom = "30px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.backgroundColor = "#333";
        toast.style.color = "#fff";
        toast.style.padding = "16px 24px";
        toast.style.borderRadius = "8px";
        toast.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
        toast.style.zIndex = "2147483647";
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.3s";
        document.body.appendChild(toast);
    }

    if (toastTimeoutId) {
        clearTimeout(toastTimeoutId);
    }

    toast.textContent = message;
    toast.style.opacity = "1";

    toastTimeoutId = window.setTimeout(() => {
        hideToast();
    }, time);
}

function hideToast() {
    const toast = document.getElementById("alertPersonalizado");

    if (!toast) {
        return;
    }

    toast.style.opacity = "0";

    window.setTimeout(() => {
        toast.remove();
    }, 300);
}

function resetPanel() {
    panel.style.display = "none";
    resultArea.innerText = INITIAL_RESULT_MESSAGE;
    textarea.value = "";
    formalizeButton.innerText = "Formalizar";
    pendingReplacement = null;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function getStorageArea() {
    return globalThis.chrome?.storage?.local || null;
}

async function savePositions() {
    const buttonPosition = {
        left: parseInt(toggleButton.style.left, 10),
        top: parseInt(toggleButton.style.top, 10)
    };
    const panelPosition = {
        left: parseInt(panel.style.left, 10),
        top: parseInt(panel.style.top, 10)
    };
    const storage = getStorageArea();

    if (storage) {
        await storage.set({
            [STORAGE_KEYS.button]: buttonPosition,
            [STORAGE_KEYS.panel]: panelPosition
        });
        return;
    }

    localStorage.setItem(STORAGE_KEYS.button, JSON.stringify(buttonPosition));
    localStorage.setItem(STORAGE_KEYS.panel, JSON.stringify(panelPosition));
}

async function loadSavedPositions() {
    const storage = getStorageArea();
    let savedButtonPosition = null;
    let savedPanelPosition = null;

    if (storage) {
        const savedPositions = await storage.get([STORAGE_KEYS.button, STORAGE_KEYS.panel]);
        savedButtonPosition = savedPositions[STORAGE_KEYS.button];
        savedPanelPosition = savedPositions[STORAGE_KEYS.panel];
    } else {
        savedButtonPosition = JSON.parse(localStorage.getItem(STORAGE_KEYS.button) || "null");
        savedPanelPosition = JSON.parse(localStorage.getItem(STORAGE_KEYS.panel) || "null");
    }

    if (savedButtonPosition?.left >= 0 && savedButtonPosition?.top >= 0) {
        toggleButton.style.left = `${savedButtonPosition.left}px`;
        toggleButton.style.top = `${savedButtonPosition.top}px`;
        toggleButton.style.right = "auto";
        toggleButton.style.bottom = "auto";
    }

    if (savedPanelPosition?.left >= 0 && savedPanelPosition?.top >= 0) {
        panel.style.left = `${savedPanelPosition.left}px`;
        panel.style.top = `${savedPanelPosition.top}px`;
        panel.style.right = "auto";
        panel.style.bottom = "auto";
    }
}
})();
