function processarNewsletter(event) {
  event.preventDefault(); // Evita o comportamento padrão do formulário

  const form = event.target;
  const email = form.email.value.trim();

  // Validar email no frontend primeiro
  if (!validarEmail(email)) {
    mostrarMensagem("error", "Por favor, insira um email válido.");
    return;
  }

  // Enviar para o PHP via AJAX
  enviarEmailParaServidor(email);
}

// Função para validar email
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Função para enviar email para servidor via AJAX
function enviarEmailParaServidor(email) {
  const button = document.querySelector(".btn-subscribe");
  const originalText = button.textContent;

  // Mostrar loading
  button.textContent = "A processar...";
  button.disabled = true;

  // Criar pedido AJAX
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "newsletter_ajax.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // Definir o que fazer quando receber resposta
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      // Restaurar botão
      button.textContent = originalText;
      button.disabled = false;

      if (xhr.status === 200) {
        try {
          // Converter resposta JSON do PHP
          const response = JSON.parse(xhr.responseText);

          // Mostrar mensagem baseada na resposta do PHP
          mostrarMensagem(response.status, response.message);

          // Se foi sucesso, limpar formulário
          if (response.status === "success") {
            document.querySelector('input[name="email"]').value = "";
          }
        } catch (e) {
          mostrarMensagem("error", "Erro ao processar resposta do servidor");
        }
      } else {
        mostrarMensagem("error", "Erro de conexão com o servidor");
      }
    }
  };

  // Enviar dados para o PHP
  xhr.send("email=" + encodeURIComponent(email));
}

// Função para mostrar mensagens (igual à anterior)
function mostrarMensagem(tipo, texto) {
  // Remover mensagem anterior se existir
  const mensagemAnterior = document.querySelector(".newsletter-mensagem");
  if (mensagemAnterior) {
    mensagemAnterior.remove();
  }

  // Criar nova mensagem
  const mensagem = document.createElement("div");
  mensagem.className = `newsletter-mensagem ${tipo}`;
  mensagem.innerHTML = `
        <span>${texto}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;

  // Definir estilos
  mensagem.style.cssText = `
        padding: 15px;
        margin: 15px 0;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        animation: slideDown 0.3s ease;
    `;

  // Cores baseadas no tipo
  if (tipo === "success") {
    mensagem.style.backgroundColor = "#d4edda";
    mensagem.style.color = "#155724";
    mensagem.style.border = "1px solid #c3e6cb";
  } else if (tipo === "warning") {
    mensagem.style.backgroundColor = "#fff3cd";
    mensagem.style.color = "#856404";
    mensagem.style.border = "1px solid #ffeaa7";
  } else if (tipo === "error") {
    mensagem.style.backgroundColor = "#f8d7da";
    mensagem.style.color = "#721c24";
    mensagem.style.border = "1px solid #f5c6cb";
  }

  // Adicionar após o formulário
  const form = document.querySelector(".newsletter-form");
  form.parentNode.insertBefore(mensagem, form.nextSibling);

  // Remover automaticamente após 5 segundos
  setTimeout(() => {
    if (mensagem.parentNode) {
      mensagem.style.animation = "slideUp 0.3s ease";
      setTimeout(() => mensagem.remove(), 300);
    }
  }, 5000);
}

// Inicializar quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", function () {
  // Encontrar formulário da newsletter
  const form = document.querySelector(".newsletter-form");

  if (form) {
    // Adicionar event listener
    form.addEventListener("submit", processarNewsletter);

    // Adicionar estilos CSS para animações
    const style = document.createElement("style");
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