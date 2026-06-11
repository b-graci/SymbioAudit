function mudarEtapa(numeroEtapa, botaoClicado) {
    document.querySelectorAll('#metodologia .botao').forEach(btn => {
        btn.classList.remove('ativa');
    });
    botaoClicado.classList.add('ativa'); 
const todosOsPaineis = document.querySelectorAll('.painel-etapa');
todosOsPaineis.forEach(painel => {
    painel.classList.remove('ativa')
});
// 3. MOSTRA SÓ O TEXTO CERTO!
    // Se o numeroEtapa for 2, ele vira 'etapa-2' e coloca a classe 'ativa' nele
    document.getElementById(`etapa-${numeroEtapa}`).classList.add('ativa')
};

// Aguarda o HTML carregar para aplicar os eventos nos links do rodapé
document.addEventListener("DOMContentLoaded", () => {
    const linksRodape = document.querySelectorAll(".link-item");

    linksRodape.forEach(link => {
        link.addEventListener("click", (evento) => {
            evento.preventDefault(); // Impede o navegador de tentar rolar a página

            // Pega o ID da seção pelo href do link (ex: "#quem-somos")
            const alvoId = link.getAttribute("href");
            const telaAlvo = document.querySelector(alvoId);

            if (telaAlvo) {
                // 1. Remove a classe 'ativa' de todas as telas
                document.querySelectorAll(".section-conteudo").forEach(tela => {
                    tela.classList.remove("ativa");
                });

                // 2. Adiciona a classe 'ativa' apenas na tela clicada
                telaAlvo.classList.add("ativa");
            }
        });
    });
});