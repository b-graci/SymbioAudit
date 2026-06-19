/**
 * ==========================================================================
 * CONTROLE DE INTERFACE, ANIMAÇÕES E CABEÇALHO
 * ==========================================================================
 */

// Controle do menu responsivo móvel
function toggleMenu() {
    const menu = document.getElementById("menuLinks");
    if (menu) menu.classList.toggle("active");
}

// Efeito de scroll no cabeçalho
window.addEventListener('scroll', () => {
    const header = document.getElementById('cabecalho');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
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


/**
 * ==========================================================================
 * BANCO DE DADOS DINÂMICO E CONTROLE DOS MODAIS
 * ==========================================================================
 */

// Banco de dados dinâmico do Modal (Metodologia)
const modalData = {
    coleta: {
        title: "01. Coleta de Dados",
        content: "<p>Os dados utilizados pela plataforma são consolidados automaticamente a partir de documentos corporativos, indicadores públicos, registros regulatórios (como CVM) e métricas operacionais auditáveis.</p><br><p>Todas as informações passam por processos de padronização estrutural para eliminar ruídos e permitir comparabilidade imediata entre indústrias.</p>"
    },
    esg: {
        title: "02. Ponderação ESG",
        content: "<p>Indicadores processados são classificados em três pilares estratégicos com pesos definidos pelo potencal de impacto financeiro no longo prazo:</p><br><ul><li><strong>Ambiental (Environmental)</strong> — Peso: 40%</li><li><strong>Governança (Governance)</strong> — Peso: 35%</li><li><strong>Social (Social)</strong> — Peso: 25%</li></ul><br><p style='background:#f4f7fa; padding:15px; border-radius:8px; font-family:monospace; font-weight:bold; text-align:center;'>Equação de Risco:<br>ESG Score = (0.40 * E) + (0.35 * G) + (0.25 * S)</p>"
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


/**
 * ==========================================================================
 * VALIDAÇÃO EM TEMPO REAL E MÁSCARAS (Formulário de Contato)
 * ==========================================================================
 */

/**
 * ==========================================================================
 * VALIDAÇÃO EM TEMPO REAL E MÁSCARAS (Formulário de Contato)
 * ==========================================================================
 */

// 1. Máscara dinâmica para o Telefone/WhatsApp
function aplicarMascaraTelefone(input) {
    let valor = input.value.replace(/\D/g, ""); 
    
    if (valor.length <= 10) {
        valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
        valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
    } else {
        valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
    }
    input.value = valor;
}

// 2. Função auxiliar de validação por campo
function validarCampoIndividual(idCampo, idErro, tipoValidacao) {
    const campo = document.getElementById(idCampo);
    const erroElemento = document.getElementById(idErro);
    
    if (!campo || !erroElemento) return false;

    let valido = true;
    const valor = campo.value.trim();

    if (tipoValidacao === 'nome') {
        const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{8,}$/;
        valido = regexNome.test(valor);
    } 
    else if (tipoValidacao === 'email') {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        valido = regexEmail.test(valor);
    } 
    else if (tipoValidacao === 'telefone') {
        const telLimpo = campo.value.replace(/\D/g, "");
        const sequenciaRepetida = /^(\d)\1+$/;
        valido = (telLimpo.length === 10 || telLimpo.length === 11) && !sequenciaRepetida.test(telLimpo);
    }

    if (!valido) {
        erroElemento.style.display = 'block';
        campo.style.borderColor = '#ef4444'; 
    } else {
        erroElemento.style.display = 'none';
        campo.style.borderColor = '#cbd5e1'; 
    }

    return valido;
}

// 3. FUNÇÃO DE FAXINA (Zera erros e bordas vermelhas)
function limparErrosEFormulario() {
    const form = document.getElementById("formContato");
    if (form) form.reset(); 

    const campos = ['campo-nome', 'campo-email', 'form-tel', 'campo-assunto'];
    campos.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) elemento.style.borderColor = '#cbd5e1'; 
    });

    const erros = ['erro-nome', 'erro-email', 'erro-tel'];
    erros.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) elemento.style.display = 'none'; 
    });
}

// 4. A FUNÇÃO QUE SEU HTML PROCURA NO SUBMIT (Mata o erro de passar direto!)
function validarFormulario(event) {
    // Impede o envio imediato para fazer os testes lógicos
    event.preventDefault(); 

    const nomeValido = validarCampoIndividual('campo-nome', 'erro-nome', 'nome');
    const emailValido = validarCampoIndividual('campo-email', 'erro-email', 'email');
    const telValido = validarCampoIndividual('form-tel', 'erro-tel', 'telefone');

    // Se algo estiver errado, barra o envio e retorna false
    if (!nomeValido || !emailValido || !telValido) {
        return false;
    }

    // Se passar em tudo, exibe o sucesso!
    alert("Solicitação enviada com sucesso! Retornaremos em até 24 hrs.");
    
    limparErrosEFormulario(); // Limpa tudo para a próxima vez
    
    if (typeof closeModalForm === "function") {
        closeModalForm(); 
    }

    return true;
}

// 5. Ativação dos ouvintes em tempo real (input e blur)
document.addEventListener("DOMContentLoaded", () => {
    const campoNome = document.getElementById('campo-nome');
    const campoEmail = document.getElementById('campo-email');
    const campoTel = document.getElementById('form-tel');

    // --- EVENTOS PARA O NOME ---
    if (campoNome) {
        campoNome.addEventListener('input', () => {
            document.getElementById('erro-nome').style.display = 'none';
            campoNome.style.borderColor = '#cbd5e1';
        });
        campoNome.addEventListener('blur', () => validarCampoIndividual('campo-nome', 'erro-nome', 'nome'));
    }

    // --- EVENTOS PARA O E-MAIL ---
    if (campoEmail) {
        campoEmail.addEventListener('input', () => {
            document.getElementById('erro-email').style.display = 'none';
            campoEmail.style.borderColor = '#cbd5e1';
        });
        campoEmail.addEventListener('blur', () => validarCampoIndividual('campo-email', 'erro-email', 'email'));
    }

    // --- EVENTOS PARA O TELEFONE ---
    if (campoTel) {
        campoTel.addEventListener('input', () => {
            aplicarMascaraTelefone(campoTel);
            document.getElementById('erro-tel').style.display = 'none';
            campoTel.style.borderColor = '#cbd5e1';
        });
        campoTel.addEventListener('blur', () => validarCampoIndividual('form-tel', 'erro-tel', 'telefone'));
    }
});


// ==========================================================================
// CONTROLADORES DOS MODAIS (Metodologia e Formulário)
// ==========================================================================

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
    limparErrosEFormulario(); // Limpa erros antigos ao abrir
    document.getElementById("modalFormulario").classList.add("active");
}

function closeModalForm() {
    const modal = document.getElementById("modalFormulario");
    if (modal) {
        limparErrosEFormulario(); // Limpa erros antigos ao fechar para não acumular
        modal.classList.remove("active");
    }
}
/**
 * ==========================================================================
 * BANCO DE DADOS E EVENTOS DA CAIXINHA DETALHADA ESG (ArcelorMittal)
 * ==========================================================================
 */
const dadosCaixinhaESG = {
    ambiental: {
        titulo: "01 • Pilar Ambiental (E) — Impacto e Alta Tecnologia",
        descricao: "A SymbioAudit monitora e audita os indicadores ecológicos mais críticos e disruptivos das plantas industriais da ArcelorMittal.<br><br>" +
                   "<strong>Casos de Alto Impacto Monitorados:</strong><br>" +
                   "• <strong>Florestas Renováveis e Biocarvão:</strong> Auditoria de rastreabilidade do uso de carvão vegetal (biocarvão) produzido pela <i>ArcelorMittal BioFlorestas</i> a partir de florestas 100% cultivadas. Essa inovação substitui o carvão mineral nos altos-fornos, sendo o pilar central para a produção do 'Aço Verde' de baixo carbono.<br>" +
                   "• <strong>Megaprojeto de Dessalinização e Gestão Hídrica:</strong> Monitoramento da maior planta de dessalinização de água do mar do Brasil instalada na unidade de Tubarão (investimento de R$ 50 milhões). O sistema checa as metas de redução de captação de água doce de rios superficiais, protegendo os recursos hídricos locais.<br>" +
                   "• <strong>Economia Circular (Meta >90%):</strong> Rastreamento do reaproveitamento de coprodutos industriais. O algoritmo monitora a transformação da escória de aciaria em subprodutos para a indústria de cimento e pavimentação de rodovias, evitando o descarte em aterros."
    },
    social: {
        titulo: "02 • Pilar Social (S) — Projetos e Impacto",
        descricao: "Centralização e auditoria digital de projetos sociais, desenvolvimento humano e metas de diversidade corporativa.<br><br>" +
                   "<strong>Casos Reais Monitorados:</strong><br>" +
                   "• <strong>Aplicações Fundacionais (R$ 45,4 Milhões):</strong> Auditoria e rastreio de recursos destinados a projetos executados via Fundação ArcelorMittal, como a <i>Liga STEAM</i> (foco em educação técnica), o circuito cultural <i>Diversão em Cena</i> e o projeto de capacitação <i>Forma e Transforma</i>.<br>" +
                   "• <strong>Evolução de Liderança Feminina:</strong> Rastreamento em tempo real do programa de DE&I (Diversidade, Equidade e Inclusão), que validou a marca de 23% de mulheres em cargos de alta liderança em 2024, auditando o cumprimento da meta de atingir 25% até 2030.<br>" +
                   "• <strong>Cultura Zero Acidentes:</strong> Auditoria preventiva de treinamentos e segurança integrada, tratando a proteção humana como valor inegociável."
    },
    governanca: {
        titulo: "03 • Governança, Risco e Integridade (G) — Prêmios e Padrões",
        descricao: "O coração do compliance e controle de riscos operacionais da cadeia de suprimentos e processos industriais.<br><br>" +
                   "<strong>Casos Reais Monitorados:</strong><br>" +
                   "• <strong>Melhor Compliance do Ano:</strong> Monitoramento de integridade ancorado no Programa de Integridade da ArcelorMittal, que foi eleito oficialmente o <i>'Melhor do Ano em Compliance'</i> no Leaders League Compliance Summit & Awards Brasil.<br>" +
                   "• <strong>Padrão Internacional Steel:</strong> Auditoria interna dos critérios rígidos de governança que permitiram a mais 6 unidades operacionais brasileiras conquistarem em 2024 o selo máximo global <i>ResponsibleSteel Core Site</i>.<br>" +
                   "• <strong>Homologação de 12,3 Mil Forcedores:</strong> Controle de riscos da malha de parceiros (sendo 10,3 mil de suprimentos), garantindo que 100% passem por checagens éticas e de direitos humanos."
    }
};

function abrirCaixinhaESG(pilar) {
    var info = dadosCaixinhaESG[pilar];
    var modal = document.getElementById('caixinha-esg');
    
    if (info && modal) {
        document.getElementById('caixinha-esg-titulo').innerHTML = info.titulo;
        document.getElementById('caixinha-esg-descricao').innerHTML = info.descricao;
        
        modal.style.setProperty('display', 'flex', 'important');
        modal.classList.add('mostrar-caixinha');
    }
}

function fecharCaixinhaESG() {
    var modal = document.getElementById('caixinha-esg');
    if (modal) {
        modal.classList.remove('mostrar-caixinha');
        modal.style.setProperty('display', 'none', 'important');
    }
}

function fecharCaixinhaFora(event) {
    if (event.target.id === 'caixinha-esg') {
        fecharCaixinhaESG();
    }
}