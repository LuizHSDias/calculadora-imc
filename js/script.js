const formulario = document.getElementById('formulario');
const cancelar = document.getElementById('cancelar');
const tema = document.getElementById('tema');

const historicoLista = document.getElementById('historico');
const limparHistorico = document.getElementById('limparHistorico');

function carregarHistorico() {

    historicoLista.innerHTML = '';

    const historico =
        JSON.parse(localStorage.getItem('historicoIMC')) || [];

    historico.reverse().forEach(item => {

        historicoLista.innerHTML += `

            <li class="list-group-item">

                <strong>${item.nome}</strong>

                <br>

                📏 IMC: ${item.imc}

                <br>

                🏆 ${item.classificacao}

                <br>

                <small class="text-muted">
                    ${item.data}
                </small>

            </li>

        `;
    });
}

function salvarHistorico(nome, imc, classificacao) {

    const historico =
        JSON.parse(localStorage.getItem('historicoIMC')) || [];

    historico.push({
        nome,
        imc,
        classificacao,
        data: new Date().toLocaleString('pt-BR')
    });

    localStorage.setItem(
        'historicoIMC',
        JSON.stringify(historico)
    );
}

function imc(event) {

    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    const resultado = document.getElementById('resultado');

    if (nome && !isNaN(peso) && !isNaN(altura)) {

        const valorIMC = peso / (altura * altura);

        let classificacao = '';
        let classeBootstrap = '';

        if (valorIMC < 18.5) {
            classificacao = 'Abaixo do peso';
            classeBootstrap = 'alert-warning';
        }
        else if (valorIMC < 25) {
            classificacao = 'Peso normal';
            classeBootstrap = 'alert-success';
        }
        else if (valorIMC < 30) {
            classificacao = 'Sobrepeso';
            classeBootstrap = 'alert-warning';
        }
        else if (valorIMC < 35) {
            classificacao = 'Obesidade Grau I';
            classeBootstrap = 'alert-danger';
        }
        else if (valorIMC < 40) {
            classificacao = 'Obesidade Grau II';
            classeBootstrap = 'alert-danger';
        }
        else {
            classificacao = 'Obesidade Grau III';
            classeBootstrap = 'alert-danger';
        }

        resultado.className = `alert ${classeBootstrap}`;

        resultado.innerHTML = `
            <h3 class="mb-4">
                👋 Olá, ${nome}!
            </h3>

            <div class="mb-3">
                <strong>📏 IMC:</strong>
                ${valorIMC.toFixed(2)}
            </div>

            <div>
                <strong>🏆 Classificação:</strong>
                ${classificacao}
            </div>
        `;

        salvarHistorico(
            nome,
            valorIMC.toFixed(2),
            classificacao
        );

        carregarHistorico();

    } else {

        resultado.className = 'alert alert-danger';

        resultado.innerHTML = `
            <strong>⚠️ Erro:</strong>
            Preencha todos os campos corretamente.
        `;
    }
}

formulario.addEventListener('submit', imc);

cancelar.addEventListener('click', () => {

    document.getElementById('resultado').innerHTML = '';
    document.getElementById('resultado').className = '';

});

tema.addEventListener('click', () => {

    document.body.classList.toggle('dark-mode');

});

limparHistorico.addEventListener('click', () => {

    localStorage.removeItem('historicoIMC');

    carregarHistorico();

});

carregarHistorico();