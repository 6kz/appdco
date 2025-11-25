let newsletterData = {
    subscribers: [],
    messages: []
};

// Quando o utilizador submete o formulário da newsletter
function processarNewsletter(event) {
    event.preventDefault(); // Travar o comportamento normal do formulário (tipo recarregar a página)

    const form = event.target;
    const email = form.email.value.trim();

    // Verificar se o email é válido (ninguém quer emails manhosos)
    if (!validarEmail(email)) {
        mostrarMensagem('error', 'Por favor, insira um email válido.');
        return;
    }

    // Ver se o email já está inscrito (isto é só simulado, na vida real era no back-end)
    if (emailJaExiste(email)) {
        mostrarMensagem('warning', 'Este email já está subscrito na nossa newsletter.');
        return;
    }

    // Tudo ok? Então bora “enviar” para o servidor (é só a fingir)
    enviarEmailParaServidor(email);
}

// Função básica para validar emails com regex (nada de espaços ou coisas malucas)
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Verificar se o email já existe na base de dados (simulação)
function emailJaExiste(email) {
    return newsletterData.subscribers.includes(email.toLowerCase());
}

// Enviar o email (a brincar) para o "servidor" e mostrar feedback ao user
function enviarEmailParaServidor(email) {
    const button = document.querySelector('.btn-subscribe');
    const originalText = button.textContent;

    // Mostrar que está a processar e bloquear o botão
    button.textContent = 'A processar...';
    button.disabled = true;

    // Simular um atraso como se o servidor estivesse a responder
    setTimeout(() => {
        // Adicionar o email à lista (simulação de guardar na base de dados)
        newsletterData.subscribers.push(email.toLowerCase());

        // Restaurar o botão
        button.textContent = originalText;
        button.disabled = false;

        // Limpar o campo de email
        document.querySelector('input[name="email"]').value = '';

        // Mostrar mensagem de sucesso
        mostrarMensagem('success', 'Subscrição realizada com sucesso! Obrigado por te juntares à nossa newsletter.');
    }, 1500);
}

// Mostrar mensagens tipo alerta (sucesso, aviso, erro)
function mostrarMensagem(tipo, texto) {
    // Se já houver uma mensagem antiga, apagá-la primeiro
    const mensagemAnterior = document.querySelector('.newsletter-mensagem');
    if (mensagemAnterior) {
        mensagemAnterior.remove();
    }

    // Criar a nova mensagem
    const mensagem = document.createElement('div');
    mensagem.className = `newsletter-mensagem ${tipo}`;
    mensagem.innerHTML = `
        <span>${texto}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;

    // Estilo base da mensagem
    mensagem.style.cssText = `
        padding: 15px;
        margin: 15px 0;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        animation: slideDown 0.3s ease;
    `;

    // Cores dependendo do tipo de mensagem
    if (tipo === 'success') {
        mensagem.style.backgroundColor = '#d4edda';
        mensagem.style.color = '#155724';
        mensagem.style.border = '1px solid #c3e6cb';
    } else if (tipo === 'warning') {
        mensagem.style.backgroundColor = '#fff3cd';
        mensagem.style.color = '#856404';
        mensagem.style.border = '1px solid #ffeaa7';
    } else if (tipo === 'error') {
        mensagem.style.backgroundColor = '#f8d7da';
        mensagem.style.color = '#721c24';
        mensagem.style.border = '1px solid #f5c6cb';
    }

    // Meter a mensagem logo a seguir ao formulário
    const form = document.querySelector('.newsletter-form');
    form.parentNode.insertBefore(mensagem, form.nextSibling);

    // Remover automaticamente ao fim de 5 segundos
    setTimeout(() => {
        if (mensagem.parentNode) {
            mensagem.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => mensagem.remove(), 300);
        }
    }, 5000);
}

// Quando o site estiver carregado, preparar o formulário
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.newsletter-form');

    if (form) {
        // Ligar o evento de submit ao formulário
        form.addEventListener('submit', processarNewsletter);

        // Adicionar os estilos para animações de entrada/saída
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes slideUp {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(-20px);
                }
            }

            .newsletter-mensagem button {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                margin-left: 15px;
                opacity: 0.7;
            }

            .newsletter-mensagem button:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
});
