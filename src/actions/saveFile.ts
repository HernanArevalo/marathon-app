import XLSX from 'xlsx';

// Función para cargar el archivo Excel existente
const loadExistingExcelFile = (filePath) => {
  const workbook = XLSX.readFile(filePath);
  return workbook;
};

// Función para actualizar los datos en el archivo Excel
const updateExcelData = (workbook, newData) => {
  // Actualiza los datos en el archivo Excel según sea necesario
  // Por ejemplo, podrías actualizar los valores de las celdas o añadir nuevas hojas de cálculo
};

// Función para guardar los cambios en el archivo Excel existente
const saveExcelFile = (workbook, filePath) => {
  XLSX.writeFile(workbook, filePath);
};

// Ejemplo de uso
const existingFilePath = 'libro1.xlsx';
const newData = [{
  "Tiempo": 0.123,
  "Clave": 1234,
  "Nombre": "Nombre Ejemplo",
  "Apellido": "Apellido Ejemplo"
}];

// Cargar el archivo Excel existente
const existingWorkbook = loadExistingExcelFile(existingFilePath);

// Actualizar los datos en el archivo Excel
updateExcelData(existingWorkbook, newData);

// Guardar los cambios en el archivo Excel
saveExcelFile(existingWorkbook, existingFilePath);
