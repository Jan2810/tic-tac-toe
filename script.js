let fields = [
    null, null, null,
    null, 'cross', null,
    'circle', null, null
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
            cellValue = 'X';
        } else if (fields[i] === 'circle') {
            cellValue = 'O';
        }
        table += `<td>${cellValue}</td>`;
        if (i % 3 === 2) {
            table += '</tr>';
        }
    }
    table += '</table>';
    content.innerHTML = table;
}