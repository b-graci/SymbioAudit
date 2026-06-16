// Controle do menu responsivo móvel
function toggleMenu() {
    const menu = document.getElementById("menuLinks");
    menu.classList.toggle("active");
}

// Efeito de scroll no cabeçalho
window.addEventListener('scroll', () => {
    const header = document.getElementById('cabecalho');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animação de fade-up usando IntersectionObserver
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));

// Interceptação e simulação de envio do formulário de contato
const form = document.getElementById("formContato");
if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Solicitação enviada com sucesso! Nossa equipe retornará o contato em até 24h.");
        form.reset();
    });
}

// Banco de dados dinâmico do Modal (Metodologia)
const modalData = {
    coleta: {
        title: "01. Coleta de Dados",
        content: "<p>Os dados utilizados pela plataforma são consolidados automaticamente a partir de documentos corporativos, indicadores públicos, registros regulatórios (como CVM) e métricas operacionais auditáveis.</p><br><p>Todas as informações passam por processos de padronização estrutural para eliminar ruídos e permitir comparabilidade imediata entre indústrias.</p>"
    },
    esg: {
        title: "02. Ponderação ESG",
        content: "<p>Indicadores processados são classificados em três pilares estratégicos com pesos definidos pelo potencial de impacto financeiro no longo prazo:</p><br><ul><li><strong>Ambiental (Environmental)</strong> — Peso: 40%</li><li><strong>Governança (Governance)</strong> — Peso: 35%</li><li><strong>Social (Social)</strong> — Peso: 25%</li></ul><br><p style='background:#f4f7fa; padding:15px; border-radius:8px; font-family:monospace; font-weight:bold; text-align:center;'>Equação de Risco:<br>ESG Score = (0.40 * E) + (0.35 * G) + (0.25 * S)</p>"
    },
    simulacao: {
        title: "03. Simulação de Impacto",
        content: "<p>A plataforma executa modelos matemáticos capazes de medir a exposição a riscos operacionais críticos, oscilações regulatórias repentinas e potenciais passivos financeiros antes que eles se concretizem.</p><br><p>As simulações permitem ao usuário alterar variáveis de estresse e visualizar a mudança do risco em tempo real.</p>"
    },
    rastreabilidade: {
        title: "04. Rastreabilidade Absoluta",
        content: "<p>Eficiência absoluta como pilar de credibilidade. Cada score ou indicador apresentado no painel mantém um vínculo indexado e direto com a sua respectiva fonte documental de origem.</p><br><p>Isso garante auditoria de ponta a ponta, dupla verificação de dados e total validação independente.</p>"
    }
};

// Funções para controle de abertura e fechamento do Modal
function openModal(key) {
    const data = modalData[key];
    if (data) {
        document.getElementById("modalTitle").innerText = data.title;
        document.getElementById("modalContent").innerHTML = data.content;
        document.getElementById("modalOverlay").classList.add("active");
    }
}

function closeModal() {
    document.getElementById("modalOverlay").classList.remove("active");
}

function abrirFormulario() {
    // Procura o elemento pelo ID e adiciona a classe que o torna visível
    document.getElementById("modalFormulario").classList.add("active");
}

// Função para fechar o modal do formulário
function closeModalForm() {
    const modal = document.getElementById("modalFormulario");
    if (modal) {
        modal.classList.remove("active");
    }
}