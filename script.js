let fields = [
    null, null, null,
    null, null, null,
    null, null, null
];

function init() {
    render();
}

function render() {
    let content = document.getElementById('content');
    let table = '<table>';
    for (let i = 0; i < 9; i++) {
        if (i % 3 === 0) {
            table += '<tr>';
        }
        let cellValue = '';
        if (fields[i] === 'cross') {
            cellValue = generateCrossSVG();
        } else if (fields[i] === 'circle') {
            cellValue = generateCircleSVG();
        }
        table += `<td onclick="makeMove(this, ${i})">${cellValue}</td>`;
        if (i % 3 === 2) {
            table += '</tr>';
        }
    }
    table += '</table>';
    content.innerHTML = table;
}

let currentPlayer = 'circle';

function makeMove(tdElement, index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        tdElement.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        tdElement.removeAttribute('onclick');
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
    }
}

function generateCircleSVG() {
    const svgCircleHtml = `
        <svg width="70" height="70" viewBox="0 0 70 70">
            <circle cx="35" cy="35" r="30" fill="none" stroke="#00B0EF" stroke-width="6"></circle>
        </svg>
        <style>
            @keyframes fillCircle {
                from {
                    stroke-dashoffset: 188.4; // Der Umfang des Kreises
                }
                to {
                    stroke-dashoffset: 0;
                }
            }

            svg circle {
                stroke-dasharray: 188.4;
                stroke-dashoffset: 188.4;
                animation: fillCircle 1s ease-out forwards;
            }
        </style>
    `;
    return svgCircleHtml;
}

function generateCrossSVG() {
    const svgCrossHtml = `
        <svg width="70" height="70" viewBox="0 0 70 70">
            <line x1="10" y1="10" x2="60" y2="60" stroke="#FFC000" stroke-width="6" stroke-linecap="round"></line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="#FFC000" stroke-width="6" stroke-linecap="round"></line>
        </svg>
        <style>
            @keyframes drawLine {
                from {
                    stroke-dashoffset: 70.71; // Länge einer Linie des Kreuzes (Wurzel aus 2 * 50)
                }
                to {
                    stroke-dashoffset: 0;
                }
            }

            svg line {
                stroke-dasharray: 70.71;
                stroke-dashoffset: 70.71;
                animation: drawLine 1s ease-out forwards;
            }
        </style>
    `;
    return svgCrossHtml;
}