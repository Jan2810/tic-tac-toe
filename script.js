let fields = [
    null, null, null,
    null, null, null,
    null, null, null
];
let gameOver = false;

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
        table += `<td onclick="handleClick(this, ${i})">${cellValue}</td>`;
        if (i % 3 === 2) {
            table += '</tr>';
        }
    }
    table += '</table>';
    content.innerHTML = table;
}

let currentPlayer = 'circle';

function handleClick(tdElement, index) {
    if (!gameOver && fields[index] === null) {
        fields[index] = currentPlayer;
        tdElement.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        tdElement.removeAttribute('onclick');
        if (checkGameOver(index)) {
            setTimeout(() => {
                // alert(`${currentPlayer === 'circle' ? 'Circle' : 'Cross'} wins!`);
                document.getElementById('restart').style.display = 'block';
            }, 1000);
            gameOver = true;
            return;
        }
        if (fields.every(field => field !== null)) {
            setTimeout(() => {
                alert(`It's a draw!`);
                document.getElementById('restart').style.display = 'block';
            }, 1000);
            gameOver = true;
            return;
        }
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
    }
}

function checkGameOver(index) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            drawWinningLine(combination);
            return true;
        }
    }
    return false;
}

function drawWinningLine(combination) {
    const [a, b, c] = combination;
    const table = document.querySelector('table');
    const tdA = table.getElementsByTagName('td')[a];
    const tdC = table.getElementsByTagName('td')[c];

    const rectA = tdA.getBoundingClientRect();
    const rectC = tdC.getBoundingClientRect();

    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.backgroundColor = 'white';
    line.style.height = '6px';
    line.style.zIndex = '10';
    line.style.width = `${Math.sqrt(Math.pow(rectC.left - rectA.left, 2) + Math.pow(rectC.top - rectA.top, 2))}px`;
    line.style.transformOrigin = '0 0';
    line.style.transform = `rotate(${Math.atan2(rectC.top - rectA.top, rectC.left - rectA.left) * 180 / Math.PI}deg)`;
    line.style.left = `${rectA.left + rectA.width / 2}px`;
    line.style.top = `${rectA.top + rectA.height / 2}px`;

    document.body.appendChild(line);
}

function restartGame() {
    fields = [
        null, null, null,
        null, null, null,
        null, null, null
    ];
    gameOver = false;
    currentPlayer = 'circle';
    document.getElementById('restart').style.display = 'none';
    document.querySelectorAll('div[style*="position: absolute"]').forEach(line => line.remove());
    render();
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
