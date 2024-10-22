


document.getElementById('input-excel').addEventListener('change', function(e) {
  var reader = new FileReader();

  reader.onload = function(e) {
    var data = new Uint8Array(e.target.result);
    var workbook = XLSX.read(data, { type: 'array' });
    

    var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    var jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
    
    mostrarVistaPrevia(jsonData);

  
    generarGrafica(jsonData);
  };

  // Leer el archivo como       array buffer
  reader.readAsArrayBuffer(e.target.files[0]);
});


//Tabla y vista previa
function mostrarVistaPrevia(data) {
  var vistaPrevia = document.getElementById('vista-previa');
  vistaPrevia.innerHTML = ''; //Limpiar

  var table = document.createElement('table');
  
  
  data.forEach(function(row) {
    var tr = document.createElement('tr');
    
    row.forEach(function(cell) {
      var td = document.createElement('td');
      td.textContent = cell !== undefined ? cell : '';
      tr.appendChild(td);
    });

    table.appendChild(tr);
  });

  //Mostrar Tabla
  vistaPrevia.appendChild(table);
}





function generarGrafica(data) {
  
  
  var labels = data[0]; // Primera fila como etiquetas
  var valores = data.slice(1).map(row => row[1]); // Tomar la segunda columna como valores

  // Crear la gráfica
  var ctx = document.getElementById('excelChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar', 
    data: {
      labels: labels.slice(1), // Sin primera columna
      datasets: [{
        label: 'Gráfica con valores de mi Excel',
        data: valores,
        backgroundColor: 'rgba(254, 246, 225, 0.2)',
        borderColor: 'rgba(75, 192, 192, 0.7)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

//Boton de salir o regresar
document.getElementById('salir').addEventListener('click', function() {
  window.location.href = 'index.html';
});