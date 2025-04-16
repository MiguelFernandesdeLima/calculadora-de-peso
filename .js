// Elementos do DOM
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const calculateBtn = document.getElementById('calculate-btn');
const resultContainer = document.getElementById('result-container');
const imcValue = document.getElementById('imc-value');
const classificationText = document.getElementById('classification-text');
const classificationRange = document.getElementById('classification-range');
const tableRows = document.querySelectorAll('tbody tr');

// Classificações de IMC
const imcClassifications = [
    { range: 'underweight', max: 18.5, text: 'Magreza', rangeText: 'Abaixo do peso ideal' },
    { range: 'normal', max: 24.9, text: 'Normal', rangeText: 'Peso ideal' },
    { range: 'overweight', max: 29.9, text: 'Sobrepeso', rangeText: 'Acima do peso ideal' },
    { range: 'obesity1', max: 34.9, text: 'Obesidade Grau I', rangeText: 'Obesidade moderada' },
    { range: 'obesity2', max: 39.9, text: 'Obesidade Grau II', rangeText: 'Obesidade severa' },
    { range: 'obesity3', max: Infinity, text: 'Obesidade Grau III', rangeText: 'Obesidade mórbida' }
];

// Função para calcular o IMC
function calculateIMC(weight, height) {
    // Converter altura de cm para m
    const heightInMeters = height / 100;
    // Calcular IMC (peso / altura²)
    return weight / (heightInMeters * heightInMeters);
}

// Função para classificar o IMC
function classifyIMC(imc) {
    // Encontrar a classificação correspondente
    const classification = imcClassifications.find(item => imc <= item.max);
    
    return {
        range: classification.range,
        text: classification.text,
        rangeText: classification.rangeText
    };
}

// Função para atualizar a tabela de classificação
function updateTableHighlight(range) {
    // Remover destaque de todas as linhas
    tableRows.forEach(row => {
        row.classList.remove('highlight');
    });
    
    // Adicionar destaque à linha correspondente
    const selectedRow = document.querySelector(`tr[data-range="${range}"]`);
    if (selectedRow) {
        selectedRow.classList.add('highlight');
    }
}

// Função para mostrar o resultado
function showResult(imc, classification) {
    // Atualizar valores no DOM
    imcValue.textContent = imc.toFixed(1);
    classificationText.textContent = classification.text;
    classificationRange.textContent = classification.rangeText;
    
    // Adicionar classe de cor com base na classificação
    classificationText.className = classification.range;
    
    // Atualizar destaque na tabela
    updateTableHighlight(classification.range);
    
    // Mostrar container de resultados
    resultContainer.classList.remove('hidden');
    
    // Rolar suavemente para o resultado
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Função para validar inputs
function validateInputs() {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    
    if (isNaN(weight)) {
        alert('Por favor, insira um peso válido.');
        weightInput.focus();
        return false;
    }
    
    if (isNaN(height)) {
        alert('Por favor, insira uma altura válida.');
        heightInput.focus();
        return false;
    }
    
    if (weight < 30 || weight > 300) {
        alert('Por favor, insira um peso entre 30kg e 300kg.');
        weightInput.focus();
        return false;
    }
    
    if (height < 100 || height > 250) {
        alert('Por favor, insira uma altura entre 100cm e 250cm.');
        heightInput.focus();
        return false;
    }
    
    return true;
}

// Evento de clique no botão calcular
calculateBtn.addEventListener('click', () => {
    // Validar inputs
    if (!validateInputs()) return;
    
    // Obter valores
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    
    // Calcular IMC
    const imc = calculateIMC(weight, height);
    
    // Classificar IMC
    const classification = classifyIMC(imc);
    
    // Mostrar resultado
    showResult(imc, classification);
});

// Evento para permitir calcular pressionando Enter
heightInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calculateBtn.click();
    }
});

// Inicialização - Focar no input de peso ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    weightInput.focus();
});