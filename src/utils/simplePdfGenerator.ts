// Solución SIMPLE y DIRECTA para generar PDF
// Sin dependencias complejas, solo lo básico y funcional

export interface FormData {
  asegurado: string
  vehiculo_dp: string
  marca_dp: string
  placa_dp: string
}

export interface SelectedItem {
  pieza: string
  tentativa: string
  precio: number
}

// Función simple para generar PDF con datos
export const generateSimplePDF = async (
  formData: FormData,
  selectedItems: SelectedItem[]
): Promise<void> => {
  try {
    // 1. Crear un PDF simple con jsPDF
    const jsPDF = (await import('jspdf')).default
    const doc = new jsPDF()
    
    // 2. Configurar página
    doc.setFont('helvetica')
    doc.setFontSize(16)
    
    // 3. Título
    doc.text('TABLA DE PRECIOS PARA TALLERES AUTORIZADOS', 105, 20, { align: 'center' })
    doc.setFontSize(12)
    doc.text('CATEGORIA A | 2014 - 2021', 105, 30, { align: 'center' })
    
    // 4. Datos del formulario
    doc.setFontSize(10)
    doc.text(`Asegurado: ${formData.asegurado || 'N/A'}`, 20, 50)
    doc.text(`Vehiculo D.P.: ${formData.vehiculo_dp || 'N/A'}`, 20, 60)
    doc.text(`Marca: ${formData.marca_dp || 'N/A'}`, 20, 70)
    doc.text(`Placa: ${formData.placa_dp || 'N/A'}`, 20, 80)
    
    // 5. Tabla de piezas seleccionadas
    let yPosition = 100
    doc.text('PIEZAS SELECCIONADAS:', 20, yPosition)
    yPosition += 10
    
    let total = 0
    selectedItems.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.pieza}`, 20, yPosition)
      doc.text(`${item.tentativa}: ${formatCurrency(item.precio)}`, 30, yPosition + 5)
      total += item.precio
      yPosition += 15
    })
    
    // 6. Total
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text(`TOTAL [BS]: ${formatCurrency(total)}`, 20, yPosition + 10)
    
    // 7. Descargar
    doc.save(`convenio-${formData.placa_dp || 'sin-placa'}-${new Date().toISOString().split('T')[0]}.pdf`)
    
  } catch (error) {
    console.error('Error generando PDF:', error)
    alert('Error al generar PDF. Por favor intente nuevamente.')
  }
}

// Función simple para formatear moneda
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true
  }).format(amount)
}
