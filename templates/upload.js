function handleUpload(inputId, tableId) {
  const input = document.getElementById(inputId);
  input.addEventListener('change', function () {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const lines = e.target.result.split('\n');
      const tbody = document.querySelector(`#${tableId} tbody`);
      tbody.innerHTML = '';

      lines.forEach((line, index) => {
        if (index === 0) return; // skip header
        const cells = line.split(',');
        const tr = document.createElement('tr');
        cells.forEach(cell => {
          const td = document.createElement('td');
          td.textContent = cell.trim();
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    };
    reader.readAsText(file);
  });
}