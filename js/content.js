
const toggleButton = document.createElement("button");
toggleButton.textContent = "F";
document.body.appendChild(toggleButton);

//painel oculto inicialmente
const panel = document.createElement('div');
    panel.style.position = 'fixed';
    panel.style.bottom = '120px';
    panel.style.right = '20px';
    panel.style.width = '300px';
    panel.style.backgroundColor = "rgb(36, 38, 38)"; 
    panel.style.border = '1px solid #ccc';
    panel.style.borderColor = "rgb(33, 192, 99)";
    panel.style.borderRadius = '25px';
    panel.style.boxShadow = '0px 4px 8px rgba(0,0,0,0.2)';
    panel.style.padding = '15px';
    panel.style.zIndex = '2147483647'; // valor máximo para garantir que fique acima de outros elementos
    panel.style.fontFamily = 'Arial, sans-serif';
    panel.style.display = 'none';

//textarea para digitar
const textarea = document.createElement('textarea');
textarea.style.zIndex = '2147483647'; // valor máximo para garantir que fique acima de outros elementos
textarea.placeholder = 'Digite seu texto aqui...';
textarea.style.width = '100%';
textarea.style.height = '100px';
textarea.style.marginBottom = '10px';
textarea.style.padding = '0px';
textarea.style.borderRadius = '5px';
textarea.style.color = 'white';
textarea.style.backgroundColor = "rgb(36, 38, 38)"; 
textarea.style.border = 'none';

//botão de formalizar
const formalizeButton = document.createElement('button');
formalizeButton.innerText = "Formalizar";
formalizeButton.style.width = '100%';
formalizeButton.style.padding = '10px';
formalizeButton.style.backgroundColor = "";
formalizeButton.style.color = 'white';
formalizeButton.style.border = '1px solid #ccc';
formalizeButton.style.borderColor = "rgb(33, 192, 99)";
formalizeButton.style.borderRadius = '25px';
formalizeButton.style.cursor = 'pointer';
formalizeButton.style.marginBottom = '10px';

//area de resultado
const resultArea = document.createElement('div');
resultArea.style.marginTop = '10px';
resultArea.style.marginRight = '10px';
resultArea.style.width = '100%';
resultArea.style.padding = '0px';
resultArea.style.backgroundColor = 'rgb(82, 82, 82);';
resultArea.style.minHeight = '50px';
resultArea.style.maxHeight = '200px';
resultArea.style.overflowY = 'auto';
resultArea.style.whiteSpace = 'pre-wrap'; // Mantém quebras de linha
resultArea.style.color = 'white'; 
resultArea.style.opacity = '1'; // Totalmente visível
resultArea.style.userSelect = 'text'; // Permite selecionar o texto
resultArea.style.pointerEvents = 'auto'; // Permite interação
resultArea.innerText = 'Texto formalizado aparecerá aqui.';

// Botão para enviar para o WhatsApp
const sendToWhatsAppButton = document.createElement('button');
sendToWhatsAppButton.id = 'sendToWhatsAppButton';
sendToWhatsAppButton.innerText = "Inserir no WhatsApp";
sendToWhatsAppButton.style.width = '100%';
sendToWhatsAppButton.style.padding = '10px';
sendToWhatsAppButton.style.color = 'white';
sendToWhatsAppButton.style.border = '1px solid #ccc';
sendToWhatsAppButton.style.borderColor = "rgb(33, 192, 99)";
sendToWhatsAppButton.style.borderRadius = '25px';
sendToWhatsAppButton.style.cursor = 'pointer';
sendToWhatsAppButton.style.marginBottom = '10px';
//sendToWhatsAppButton.disabled = true; 

window.addEventListener("load", () => {
    const bgColor = window.getComputedStyle(document.body).backgroundColor;
    console.log(bgColor);
        // Função para verificar se a cor é escura
        function isDark(color) {
            const rgb = bgColor.match(/\d+/g).map(Number);
            const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
            return luminance < 128; // valor de corte, pode ajustar conforme necessário
        }

        if (isDark(bgColor)) { 
    // Se a tag dark estiver presente, aplique o estilo escuro
    console.log("Tema escuro ativado");

    toggleButton.style.fontWeight = "bold";
    toggleButton.style.fontSize = "12px";
    toggleButton.style.color = "white";
    toggleButton.style.position = "fixed";
    toggleButton.style.bottom = "70px";
    toggleButton.style.right = "20px";
    toggleButton.style.zIndex = "9999";
    toggleButton.style.padding = "10px 20px";
    toggleButton.style.border = "none";
    toggleButton.style.borderRadius = "100px";
    toggleButton.style.cursor = "pointer";
    toggleButton.style.boxShadow = "0px 4px 8px rgba(0,0,0,0.2)";
    toggleButton.style.color = "white";
    toggleButton.style.backgroundColor = "#242626";
    panel.style.backgroundColor = "rgb(36, 38, 38)"; 

    // hover
    toggleButton.addEventListener("mouseenter", () => {
        toggleButton.style.backgroundColor = "rgb(33, 192, 99)";
        toggleButton.style.color = "black";
        if (panel.style.display === 'none') {
            alertPersonalizado("Clique ou Pressione Ctrl + Q para enviar o texto para o WhatsApp.");
        }
    });
    toggleButton.addEventListener("mouseleave", () => {
        toggleButton.style.backgroundColor = "#242626";
        toggleButton.style.color = "white";
    });
    
    formalizeButton.addEventListener("mouseenter", () => {
        formalizeButton.style.backgroundColor = "rgb(28, 161, 83)";
        formalizeButton.style.color = "black";
        formalizeButton.innerText = "Formalizar (Ctrl + Y)";
    });
    formalizeButton.addEventListener("mouseleave", () => {
        formalizeButton.style.backgroundColor = "";
        formalizeButton.style.color = "white";
        formalizeButton.innerText = "Formalizar";
    });

    sendToWhatsAppButton.addEventListener("mouseenter", () => {
        sendToWhatsAppButton.style.backgroundColor = "rgb(28, 161, 83)";
        sendToWhatsAppButton.style.color = "black";
        sendToWhatsAppButton.innerText = "Enviar para o WhatsApp (Ctrl + Q)";
    });
    sendToWhatsAppButton.addEventListener("mouseleave", () => {
        sendToWhatsAppButton.style.backgroundColor = "";
        sendToWhatsAppButton.style.color = "white";
        sendToWhatsAppButton.innerText = "Enviar para o WhatsApp";
    });

} else {
    // Se a tag dark não estiver presente, aplique o estilo claro
    console.log("Tema claro ativado");

    toggleButton.style.fontWeight = "bold";
    toggleButton.style.fontSize = "12px";
    toggleButton.style.color = "white";
    toggleButton.style.position = "fixed";
    toggleButton.style.bottom = "70px";
    toggleButton.style.right = "20px";
    toggleButton.style.zIndex = "9999";
    toggleButton.style.padding = "10px 20px";
    toggleButton.style.border = "none";
    toggleButton.style.borderRadius = "100px";
    toggleButton.style.cursor = "pointer";
    toggleButton.style.boxShadow = "0px 4px 8px rgba(0,0,0,0.2)";
    toggleButton.style.color = "rgb(94, 94, 94)";
    toggleButton.style.backgroundColor = "rgb(255, 255, 255)";
    panel.style.backgroundColor = "rgb(255, 255, 255)"; 
    sendToWhatsAppButton.style.backgroundColor = "rgb(255, 255, 255)";
    sendToWhatsAppButton.style.color = "black";
    formalizeButton.style.backgroundColor = "rgb(255, 255, 255)";
    formalizeButton.style.color = "black";
    textarea.style.backgroundColor = "rgb(255, 255, 255)";
    textarea.style.color = "black";
    resultArea.style.color = "black";

    // hover
    toggleButton.addEventListener("mouseenter", () => {
        toggleButton.style.backgroundColor = "rgb(33, 192, 99)";
        toggleButton.style.color = "white";
        if (panel.style.display === 'none') {
            alertPersonalizado("Clique ou Pressione Ctrl + Q para enviar o texto para o WhatsApp.");
        }
    });
    toggleButton.addEventListener("mouseleave", () => {
        toggleButton.style.backgroundColor = "rgb(255, 255, 255)";
        toggleButton.style.color = "rgb(94, 94, 94)";
    });

    formalizeButton.addEventListener("mouseenter", () => {
        formalizeButton.style.backgroundColor = "rgb(28, 161, 83)";
        formalizeButton.style.color = "white";
        formalizeButton.innerText = "Formalizar (Ctrl + Y)";
    });
    formalizeButton.addEventListener("mouseleave", () => {
        formalizeButton.style.backgroundColor = "white";
        formalizeButton.style.color = "black";
        formalizeButton.innerText = "Formalizar";
    });

    sendToWhatsAppButton.addEventListener("mouseenter", () => {
        sendToWhatsAppButton.style.backgroundColor = "rgb(28, 161, 83)";
        sendToWhatsAppButton.style.color = "white";
        sendToWhatsAppButton.innerText = "Enviar para o WhatsApp (Ctrl + Q)";
    });
    sendToWhatsAppButton.addEventListener("mouseleave", () => {
        sendToWhatsAppButton.style.backgroundColor = "white";
        sendToWhatsAppButton.style.color = "black";
        sendToWhatsAppButton.innerText = "Enviar para o WhatsApp";
    });

}});

// Toggle mostrar/esconder painel
toggleButton.onclick = () => {

    const chatInput = document.querySelector('[contenteditable="true"][data-tab="10"], input.w-full.rounded-full.bg-gray-100,textarea');
    
    if (chatInput) {
        // Preenche o campo de entrada do painel flutuante com o texto do WhatsApp somente o que está selecionado
        const selection = window.getSelection();
        if (panel.style.display === 'none') {
            // Verifica se há texto selecionado
            if (selection && selection.toString().trim()) {
            textarea.value = selection.toString().trim();
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            formalizeButton.click();
            toggleButton.disabled = true;
            
            }  else {
            alertPersonalizado("Nenhum texto selecionado. Selecione o texto que deseja formalizar.");
            }
        } 
        else {
            // Se o painel já estiver visível, apenas o esconde
            panel.style.display = 'none'
            resultArea.innerText = 'Texto formalizado aparecerá aqui.'; // Limpa o resultado
            textarea.value = ''; // Limpa o textarea
            //sendToWhatsAppButton.disabled = true; // desabilita o botão do WhatsApp
            
        }
    } else {
            if (panel.style.display === 'block') {
                // Se o painel já estiver visível, apenas o esconde
                panel.style.display = 'none'
                }
            else {
                //alert("Campo de mensagem do WhatsApp não encontrado. Certifique-se de que está na conversa certa!");
                alertPersonalizado("Campo de mensagem do WhatsApp não encontrado. Certifique-se de que está na conversa certa!");
            }
        
    }
};

// Botão formalizar texto
formalizeButton.onclick = async () => {
    formalizeButton.innerText = "Formalizando, aguarde...";
    resultArea.innerText = "";
    toggleButton.disabled = true;
    formalizeButton.disabled = true;
    sendToWhatsAppButton.disabled = true;
    // Aguarda 1.5 segundos para evitar chamadas excessivas
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    const inputText = textarea.value.trim();
    if (!inputText) {
        alertPersonalizado("Por favor, digite um texto.");
        return;
    }

    //resultArea.innerText = "Formalizando, aguarde...";
    formalizeButton.innerText = "Formalizando, aguarde...";
    
    // Desabilita o botão enquanto processa
    formalizeButton.disabled = true;
    sendToWhatsAppButton.disabled = true; 
    
    //formalizeButton.innerText = "Formalizando...";
    try {
        const formalizedText = await sendToOpenAI('"' + inputText + '"');
        // Remove as aspas do início e do fim do texto formalizado
        resultArea.innerText = formalizedText.replace(/^"|"$/g, '');
        formalizeButton.innerText = "Formalizar";
        toggleButton.disabled = false;
        formalizeButton.disabled = false;
        sendToWhatsAppButton.disabled = false; 
    } catch (error) {
        console.error("Erro ao formalizar:", error);
        resultArea.innerText = "Erro ao formalizar o texto.";
        formalizeButton.innerText = "Formalizar";
    } finally {
        formalizeButton.disabled = false;
        formalizeButton.innerText = "Formalizar";
    }
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
    if (outputText === "Texto formalizado aparecerá aqui.") {
        alertPersonalizado("Por favor, formalize o texto antes de enviar.");
        return;
    }

    const chatInput = document.querySelector('[contenteditable="true"][data-tab="10"],[placeholder="Digite uma mensagem"],textarea');

    if (chatInput) {
        chatInput.focus();
        chatInput.value = outputText;
        // Dispara o evento de input para que o sistema reconheça
        chatInput.dispatchEvent(new Event('input', { bubbles: true }));
        // Simula o evento de colar
        const dataTransfer = new DataTransfer();
        dataTransfer.setData('text/plain', outputText);
        const pasteEvent = new ClipboardEvent('paste', {
            clipboardData: dataTransfer,
            bubbles: true
        });
        chatInput.dispatchEvent(pasteEvent);
        resultArea.innerText = 'Texto formalizado aparecerá aqui.';
        textarea.value = '';
        //sendToWhatsAppButton.disabled = true;
        panel.style.display = 'none';
    } else {
        alertPersonalizado("Campo de mensagem do WhatsApp não encontrado. Certifique-se de que está na conversa certa!");
    }
};

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
                { role: "system", content: "Reescreva apenas a frase enviada pelo usuário, mudando apenas o tom (mais formal, informal, simpático etc.), sem adicionar ou remover informações. Apenas reformule, não comente." },
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
};
// alertPersonalizado personalizado

function alertPersonalizado(message) {
    let alertPersonalizado = document.getElementById("alertPersonalizado");
    if (!alertPersonalizado) {
        alertPersonalizado = document.createElement("div");
        alertPersonalizado.id = "alertPersonalizado";
        alertPersonalizado.style = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #333;
        color: #fff;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s;
      `;
      document.body.appendChild(alertPersonalizado);
    }
  
    alertPersonalizado.textContent = message;
    alertPersonalizado.style.opacity = "1";
  
    setTimeout(() => {
        alertPersonalizado.style.opacity = "0";
        alertPersonalizado.remove(); 
    }, 4000);
  };

  
// Adiciona as teclas de atalho
  const ctrla = new Set();
  document.addEventListener('keydown', (event) => {
  ctrla.add(event.key);
  if (panel.style.display === 'none' && ctrla.has('Control') && ctrla.has('q')) {
      event.preventDefault(); // evita o comportamento padrão (salvar página)
      toggleButton.click(); 
  }
  });
      document.addEventListener('keyup', (event) => {
      ctrla.delete(event.key);
  }); 

  const ctrlq = new Set();
  document.addEventListener('keydown', (event) => {
  ctrlq.add(event.key);
  if (panel.style.display === 'block' && ctrlq.has('Control') && ctrlq.has('q')) {
      event.preventDefault(); // evita o comportamento padrão (salvar página)
      sendToWhatsAppButton.click(); 
  }
  });
      document.addEventListener('keyup', (event) => {
      ctrlq.delete(event.key);
  }); 

  const ctrly = new Set();
  document.addEventListener('keydown', (event) => {
  ctrly.add(event.key);
  if (panel.style.display === 'block' && ctrly.has('Control') && ctrly.has('y')) {
      event.preventDefault(); // evita o comportamento padrão (salvar página)
      formalizeButton.click(); 
  }
  });
      document.addEventListener('keyup', (event) => {
      ctrly.delete(event.key);
  }); 
