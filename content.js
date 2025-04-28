console.log("Content script carregado!");

// Cria o botão flutuante inicial
const toggleButton = document.createElement('button');
toggleButton.innerText = "F";
toggleButton.style.position = "fixed";
toggleButton.style.bottom = "70px";
toggleButton.style.right = "20px";
toggleButton.style.zIndex = "9999";
toggleButton.style.padding = "10px 20px";
toggleButton.style.backgroundColor = "rgb(33 192 99)"; // Cor verde do WhatsApp

//toggleButton.style.color = "white";
toggleButton.style.border = "none";
toggleButton.style.borderRadius = "100px";
toggleButton.style.cursor = "pointer";
toggleButton.style.boxShadow = "0px 4px 8px rgba(0,0,0,0.2)";

// Cria o painel oculto inicialmente
const panel = document.createElement('div');
panel.style.position = 'fixed';
panel.style.bottom = '110px'; // um pouco acima do botão
panel.style.right = '20px';
panel.style.width = '300px';
panel.style.backgroundColor = "rgb(33 192 99)"; // Cor verde do WhatsApp
panel.style.border = '1px solid #ccc';
panel.style.borderRadius = '25px';
panel.style.boxShadow = '0px 4px 8px rgba(0,0,0,0.2)';
panel.style.padding = '15px';
panel.style.zIndex = '2147483647'; // valor máximo para garantir que fique acima de outros elementos
panel.style.fontFamily = 'Arial, sans-serif';
panel.style.display = 'none'; // começa oculto

// Cria o textarea para digitar
const textarea = document.createElement('textarea');
textarea.placeholder = 'Digite seu texto aqui...';
textarea.style.width = '100%';
textarea.style.height = '100px';
textarea.style.marginBottom = '10px';
textarea.style.padding = '0px';
textarea.style.borderRadius = '4px';
textarea.style.border = '1px solid #ccc';
textarea.style.resize = 'none';

// Cria o botão de formalizar

const formalizeButton = document.createElement('button');
formalizeButton.innerText = "Formalizar";
formalizeButton.style.width = '100%';
formalizeButton.style.padding = '10px';
formalizeButton.style.backgroundColor = '#2196F3';
formalizeButton.style.color = 'white';
formalizeButton.style.border = 'none';
formalizeButton.style.borderRadius = '25px';
formalizeButton.style.cursor = 'pointer';
formalizeButton.style.marginBottom = '10px';

// Cria a área de resultado
const resultArea = document.createElement('div');
resultArea.style.marginTop = '10px';
resultArea.style.marginRight = '10px';
resultArea.style.width = '100%';
resultArea.style.padding = '0px';
resultArea.style.border = '1px solid #eee';
resultArea.style.backgroundColor = '#f9f9f9';
resultArea.style.borderRadius = '4px';
resultArea.style.minHeight = '50px';
resultArea.style.maxHeight = '200px';
resultArea.style.overflowY = 'auto';
resultArea.style.whiteSpace = 'pre-wrap'; // Mantém quebras de linha
resultArea.style.color = '#000'; // Texto preto
resultArea.style.opacity = '1'; // Totalmente visível
resultArea.style.userSelect = 'text'; // Permite selecionar o texto
resultArea.style.pointerEvents = 'auto'; // Permite interação
resultArea.innerText = 'Texto formalizado aparecerá aqui.';

// Botão para enviar para o WhatsApp
const sendToWhatsAppButton = document.createElement('button');
sendToWhatsAppButton.innerText = "";
sendToWhatsAppButton.style.width = '100%';
sendToWhatsAppButton.style.padding = '0px';
sendToWhatsAppButton.style.backgroundColor = '#2196F3';
sendToWhatsAppButton.style.color = 'white';
sendToWhatsAppButton.style.border = 'none';
sendToWhatsAppButton.style.borderRadius = '25px';
sendToWhatsAppButton.style.cursor = 'pointer';
sendToWhatsAppButton.style.marginBottom = '10px';
sendToWhatsAppButton.disabled = true; // Começa desabilitado
//sendToWhatsAppButton.style.visibility = 'hidden'; // Começa invisível



// Toggle mostrar/esconder painel
toggleButton.onclick = () => {


    const chatInput = document.querySelector('[contenteditable="true"][data-tab="10"]');
    
    if (chatInput) {
        // Preenche o campo de entrada do painel flutuante com o texto do WhatsApp somente o que está selecionado
        const selection = window.getSelection();
        if (selection && selection.toString().trim()) {
            textarea.value = selection.toString().trim();
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            //document.getElementById('formalizarBtn').click();
        } else {
            alert("Nenhum texto selecionado. Selecione o texto que deseja formalizar.");
        } 
    } else {
        alert("Campo de mensagem do WhatsApp não encontrado. Certifique-se de que está na conversa certa!");
    } 
};

// Botão formalizar texto
formalizeButton.onclick = async () => {
    const inputText = textarea.value.trim();
    if (!inputText) {
        alert("Por favor, digite um texto.");
        return;
    }

    resultArea.innerText = "Formalizando, aguarde...";
    // Desabilita o botão enquanto processa
    formalizeButton.disabled = true;
    sendToWhatsAppButton.style.backgroundColor = '#2196F3'; // Cor cinza para indicar que está desabilitado 
    sendToWhatsAppButton.innerText = "Inserir no WhatsApp";
    sendToWhatsAppButton.style.padding = '10px';
    //formalizeButton.innerText = "Formalizando...";
    try {
        const formalizedText = await sendToOpenAI(inputText);
        resultArea.innerText = formalizedText;
        sendToWhatsAppButton.disabled = false; // Habilita o botão do WhatsApp
        //sendToWhatsAppButton.style.visibility = 'visible'; // Torna visível
    } catch (error) {
        console.error("Erro ao formalizar:", error);
        resultArea.innerText = "Erro ao formalizar o texto.";
    }finally {
        formalizeButton.disabled = false;
        formalizeButton.innerText = "Formalizar";}
};




// Adiciona elementos no painel
panel.appendChild(textarea);
panel.appendChild(formalizeButton);
panel.appendChild(sendToWhatsAppButton); 
panel.appendChild(resultArea);

// Adiciona tudo no body
document.body.appendChild(toggleButton);
document.body.appendChild(panel);

sendToWhatsAppButton.onclick = () => {
    const outputText = resultArea.innerText.trim();
    if (!outputText) {
        alert("Nenhum texto formalizado encontrado.");
        return;
    }

    // Tenta encontrar o campo de digitar no WhatsApp
    const chatInput = document.querySelector('[contenteditable="true"][data-tab="10"]');
        
    if (chatInput) {
        chatInput.focus();

        chatInput.innerText = "" // Limpa o campo de mensagem;
        chatInput.innerText = outputText; // Insere o texto formalizado no campo de mensagem
        
        // Cria um evento de inserção de texto
        const dataTransfer = new DataTransfer();
       

        // Insere o novo texto
        dataTransfer.setData('text', outputText);

        const pasteEvent = new ClipboardEvent('paste', {
            clipboardData: dataTransfer,
            bubbles: true
        });

        chatInput.dispatchEvent(pasteEvent);
    
        panel.style.display = 'none'; // Esconde o botão após o envio
        
    } else {
        alert("Campo de mensagem do WhatsApp não encontrado. Certifique-se de que está na conversa certa!");
    } 
};
// Adiciona o botão de enviar para WhatsApp ao painel

// Função que chama a OpenAI
async function sendToOpenAI(text) {
    const apiKey = "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"; // <-- SUA CHAVE AQUI
    const url = "https://api.openai.com/v1/chat/completions";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "realizar ajustes no tom do texto inserido, mantendo o conteúdo principal intacto e alterando apenas o estilo ou tom da frase" },
                { role: "user", content: text }
            ],
            max_tokens: 500
        })
    });

    if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
}
