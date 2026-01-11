// script.js

// 1. Elementos do HTML que vamos manipular
const spinButton = document.getElementById('spin-button');
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const balanceDisplay = document.getElementById('balance');
const messageDisplay = document.getElementById('message');

// 2. Configurações do Jogo
const symbols = ['🐯', '💎', '🍊', '🔔', '🍀', ' BAR']; // Símbolos do jogo
let balance = 100; // Saldo inicial
const costPerSpin = 10; // Custo por giro

// 3. Adicionar o "ouvinte de evento" para o clique no botão
spinButton.addEventListener('click', handleSpin);

// 4. Função principal que executa quando o botão é clicado
function handleSpin() {
    // Verifica se o jogador tem saldo suficiente
    if (balance < costPerSpin) {
        messageDisplay.textContent = "Saldo insuficiente!";
        return; // Para a execução se não tiver dinheiro
    }

    // Deduz o custo do giro e atualiza a tela
    balance -= costPerSpin;
    balanceDisplay.textContent = balance;
    messageDisplay.textContent = "Girando...";

    // Desabilita o botão enquanto os rolos giram para evitar cliques duplos
    spinButton.disabled = true;

    // Sorteia os símbolos para cada rolo
    const result1 = symbols[Math.floor(Math.random() * symbols.length)];
    const result2 = symbols[Math.floor(Math.random() * symbols.length)];
    const result3 = symbols[Math.floor(Math.random() * symbols.length)];

    // Exibe os resultados nos rolos
    reel1.textContent = result1;
    reel2.textContent = result2;
    reel3.textContent = result3;

    // Simula um tempo de "giro" de 1 segundo antes de verificar o resultado
    setTimeout(() => {
        checkWin(result1, result2, result3);
        // Reabilita o botão após o giro terminar
        spinButton.disabled = false;
    }, 1000);
}

// 5. Função para verificar se houve uma combinação vencedora
function checkWin(r1, r2, r3) {
    if (r1 === r2 && r2 === r3) {
        // Se todos os três símbolos são iguais
        const prize = getPrize(r1);
        balance += prize;
        balanceDisplay.textContent = balance;
        messageDisplay.textContent = `Você ganhou ${prize} moedas!`;
    } else {
        // Se não houver combinação
        messageDisplay.textContent = "Tente novamente!";
    }
}

// 6. Função para determinar o prêmio com base no símbolo
function getPrize(symbol) {
    switch (symbol) {
        case '🐯':
            return 500; // Prêmio máximo para o tigre
        case '💎':
            return 250;
        case 'BAR':
            return 100;
        case '🔔':
            return 75;
        case '🍀':
            return 50;
        case '🍊':
            return 25;
        default:
            return 0;
    }
}
