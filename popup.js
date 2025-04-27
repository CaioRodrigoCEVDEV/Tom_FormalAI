document.getElementById("formalizarBtn").addEventListener("click", async () => {
    const inputText = document.getElementById('inputText').value;
    
    if (!inputText.trim()) {
        alert("digite o texto");
        return;
    }
    
    const respostaFormal = await gerarTextoFormal(inputText);
    
    document.getElementById("output").value = respostaFormal;


});

const apiKey = "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";
// 3.5-turbo";
async function gerarTextoFormal(texto) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "system",content: "Você é um assistente que ajuda a formalizar textos. Você deve transformar o texto de entrada em um texto mais formal e profissional."},
                {role: "user", content: `Texto a ser formalizado: ${texto}`}
            ],
            temperature: 0.5,
            max_tokens: 500,
        })
    });
       if (!response.ok) {
        console.error("Erro na resposta da API:", response.status, response.statusText);
        //console.error("Erro na resposta da API:", response.statusText);
        return "Erro ao gerar texto formal.";
    }
    const data = await response.json();
    return data.choices[0].message.content.trim();
}

