const cancelar = document.getElementById('cancelar');
const calcular = document.getElementById('calcular');

function imc(event) {

    event.preventDefault(); 
    
    const nome = document.getElementById('nome').value;
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const resultado = document.getElementById('resultado');

    if(nome != '' && altura != '' && peso != ''){
        
        const valorIMC = (peso / (altura * altura)).toFixed(2);
        
        let classificacao = ''; 

        if( valorIMC< 18.5){
            classificacao = 'Abaixo do peso';
        } else if (valorIMC < 25.0){
            classificacao = 'Peso normal';
        } else if (valorIMC < 30.0){
            classificacao = 'Sobrepeso';
        } else {
            classificacao = 'Obesidade';
        }
        resultado.className = 'alert alert-success';

        resultado.textContent = `${nome} seu IMC é ${valorIMC} , ou seja, ${classificacao}`;
        
    } else {
       resultado.textContent = 'Preencha todos os campos';
    }

}

calcular.addEventListener('click', imc);

cancelar.addEventListener('click', () => {
    const resultado = document.getElementById('resultado');
    resultado.textContent = '';
    resultado.className = '';
});