// Solución para usar la PLANTILLA PDF EXISTENTE sin modificar estilos
// Solo pinta celdas y coloca sumatoria

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

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

// Cargar plantilla PDF desde URL
export const loadPlantillaPdf = async (): Promise<Uint8Array> => {
  try {
    const response = await fetch('/Templates/TABLA%20A%20-%20CONVENIO.pdf')
    const arrayBuffer = await response.arrayBuffer()
    return new Uint8Array(arrayBuffer)
  } catch (error) {
    console.error('Error al cargar plantilla PDF:', error)
    throw new Error('No se pudo cargar la plantilla PDF')
  }
}

// Generar PDF usando la plantilla existente
export const generatePdfFromPlantilla = async (
  formData: FormData,
  selectedItems: SelectedItem[]
): Promise<void> => {
  try {
    // 1. Cargar la plantilla PDF existente
    const plantillaBytes = await loadPlantillaPdf()
    const pdfDoc = await PDFDocument.load(plantillaBytes)
    
    // 2. Obtener la primera página (donde está el formulario)
    const page = pdfDoc.getPage(0)
    
    // 3. Cargar fuentes
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    
    // 4. Función para escribir texto sin modificar estilos
    const writeText = (text: string, x: number, y: number, size: number = 10) => {
      page.drawText(text, {
        x,
        y,
        size,
        font: helveticaFont,
        color: rgb(0, 0, 0), // Negro para mantener consistencia
      })
    }
    
    // 5. Función para pintar celda (resaltar amarillo)
    const paintCell = (x: number, y: number, width: number, height: number) => {
      page.drawRectangle({
        x: x - 2,
        y: y - height + 2,
        width: width + 4,
        height: height + 4,
        color: rgb(1, 1, 0), // Amarillo
        opacity: 0.3, // Transparencia para no ocultar texto
      })
    }
    
    // 6. Escribir datos del formulario en posiciones exactas
    // (estas coordenadas deben ajustarse según tu plantilla)
    writeText(formData.asegurado || '', 150, 520, 10)
    writeText(formData.vehiculo_dp || '', 150, 505, 10)
    writeText(formData.marca_dp || '', 350, 505, 10)
    writeText(formData.placa_dp || '', 150, 490, 10)
    
    // 7. Mapeo de piezas exactamente igual a TablaPrecios.tsx para sincronización perfecta
    const piezasExcel = [
      {no: 1, pieza: "CAPOT (ESTRUCTURA EXTERNA E INTERNA)", t1: 556.80, t2: 696.00, t3: 835.20, reconstrucción: 1670.40},
      {no: 2, pieza: "GUARDABARROS DELANTEROS", t1: 348.00, t2: 487.20, t3: 626.40, reconstrucción: 1252.80},
      {no: 3, pieza: "GUARDABARROS TRASEROS", t1: 348.00, t2: 487.20, t3: 696.00, reconstrucción: 1252.80},
      {no: 4, pieza: "PUERTAS DELANTERAS", t1: 348.00, t2: 487.20, t3: 696.00, reconstrucción: 1252.80},
      {no: 5, pieza: "PUERTAS TRASERAS", t1: 348.00, t2: 487.20, t3: 696.00, reconstrucción: 1252.80},
      {no: 6, pieza: "LATERALES TRASEROS (VAGONETAS)", t1: 348.00, t2: 487.20, t3: 765.60, reconstrucción: 1531.20},
      {no: 7, pieza: "LATERALES DE CARROCERÍA (CAMIONETA)", t1: 556.80, t2: 696.00, t3: 904.80, reconstrucción: 1531.20},
      {no: 8, pieza: "TECHO", t1: 626.40, t2: 765.60, t3: 1113.60, reconstrucción: 1740.00},
      {no: 9, pieza: "TAPA DE MALETERO (VGTA.-AUTO)", t1: 348.00, t2: 487.20, t3: 626.40, reconstrucción: 1252.80},
      {no: 10, pieza: "COMPUERTA TRASERA DE CARROCERÍA (CMTA)", t1: 348.00, t2: 417.60, t3: 556.80, reconstrucción: 1252.80},
      {no: 11, pieza: "PARACHOQUE DELANTERO", t1: 348.00, t2: 487.20, t3: 626.40, reconstrucción: 1252.80},
      {no: 12, pieza: "PARACHOQUE TRASERO", t1: 348.00, t2: 487.20, t3: 626.40, reconstrucción: 1252.80},
      {no: 13, pieza: "SPOILER DE PARACHOQUE", t1: 208.80, t2: 278.40, t3: 348.00, reconstrucción: 0},
      {no: 14, pieza: "SOPORTES DE PARACHOQUE", t1: 174.00, t2: 278.40, t3: 348.00, reconstrucción: 0},
      {no: 15, pieza: "PUNTERAS DELANTERAS", t1: 208.80, t2: 278.40, t3: 348.00, reconstrucción: 0},
      {no: 16, pieza: "PUNTERAS TRASERAS", t1: 208.80, t2: 278.40, t3: 348.00, reconstrucción: 0},
      {no: 17, pieza: "BUCHERAS DELANTERAS", t1: 174.00, t2: 257.52, t3: 348.00, reconstrucción: 0},
      {no: 18, pieza: "BUCHERAS TRASERAS", t1: 174.00, t2: 257.52, t3: 348.00, reconstrucción: 0},
      {no: 19, pieza: "MOLDURAS DE PUERTAS DELANTERAS", t1: 174.00, t2: 257.52, t3: 348.00, reconstrucción: 0},
      {no: 20, pieza: "MOLDURAS DE PUERTAS TRASERAS", t1: 174.00, t2: 257.52, t3: 348.00, reconstrucción: 0},
      {no: 21, pieza: "MARCO DE RADIADOR", t1: 208.80, t2: 313.20, t3: 417.60, reconstrucción: 0},
      {no: 22, pieza: "MARCO INFERIOR DE MÁSCARA", t1: 208.80, t2: 313.20, t3: 417.60, reconstrucción: 0},
      {no: 23, pieza: "PARANTES (DE PUERTA, PARABRISA, TRASERO)", t1: 208.80, t2: 313.20, t3: 417.60, reconstrucción: 0},
      {no: 24, pieza: "REJILLA INFERIOR DE PARABRISAS", t1: 139.20, t2: 174.00, t3: 278.40, reconstrucción: 0},
      {no: 25, pieza: "ZÓCALO", t1: 208.80, t2: 313.20, t3: 487.20, reconstrucción: 0},
      {no: 26, pieza: "INTERIOR DE GUARDABARROS", t1: 208.80, t2: 278.40, t3: 417.60, reconstrucción: 0},
      {no: 27, pieza: "TAPA DE TANQUE", t1: 69.60, t2: 104.40, t3: 139.20, reconstrucción: 0},
      {no: 28, pieza: "PISADERAS", t1: 208.80, t2: 278.40, t3: 348.00, reconstrucción: 0},
      {no: 29, pieza: "PISO DE CARROCERÍA", t1: 313.20, t2: 417.60, t3: 556.80, reconstrucción: 0},
      {no: 30, pieza: "SERVICIO DE RAMPLA", t1: 696.00, t2: 1044.00, t3: 1392.00, reconstrucción: 0},
      {no: 31, pieza: "PINTADO DE ESPEJOS", t1: 139.20, t2: 0, t3: 0, reconstrucción: 0},
      {no: 32, pieza: "INSTALADO DE RADIO", t1: 69.60, t2: 0, t3: 0, reconstrucción: 0},
      {no: 33, pieza: "INSTALADO DE ESPEJO ELÉCTRICO", t1: 69.60, t2: 0, t3: 0, reconstrucción: 0},
      {no: 34, pieza: "INSTALADO DE PARABRISAS (CON GOMA)", t1: 208.80, t2: 0, t3: 0, reconstrucción: 0},
      {no: 35, pieza: "INSTALADO DE PARABRISAS (CON SELLADOR)", t1: 487.20, t2: 0, t3: 0, reconstrucción: 0},
      {no: 36, pieza: "INSTALADO DE VIDRIO DE PUERTAS", t1: 139.20, t2: 0, t3: 0, reconstrucción: 0},
      {no: 37, pieza: "INSTALADO DE VIDRIO DE COMPUERTA TRASERA (CON GOMA)", t1: 348.00, t2: 0, t3: 0, reconstrucción: 0},
      {no: 38, pieza: "INSTALADO DE VIDRIO LATERAL TRASERO (CON GOMA)", t1: 139.20, t2: 0, t3: 0, reconstrucción: 0}
    ]
    
    // 8. Coordenadas de la tabla (ajustar según tu plantilla)
    const tableStartY = 475
    const rowHeight = 11.5  // Ajustado para mejor espaciado
    const colX = { t1: 250, t2: 320, t3: 390, recon: 460 }
    
    // 9. Procesar celdas seleccionadas y pintarlas
    let totalSum = 0
    
    selectedItems.forEach(selectedItem => {
      const pieza = piezasExcel.find(p => p.pieza === selectedItem.pieza)
      if (pieza) {
        // Ajuste preciso para filas inferiores
        let rowIndex = pieza.no - 1
        let currentY = tableStartY - (rowIndex * rowHeight)
        
        // Corrección especial para filas inferiores (30+)
        if (pieza.no >= 30) {
          currentY = tableStartY - (rowIndex * rowHeight) - 5  // Ajuste extra para filas inferiores
        }
        
        // Corrección adicional para filas muy inferiores (35+)
        if (pieza.no >= 35) {
          currentY = currentY - 3  // Más ajuste para filas 35-38
        }
        
        let cellX = 0
        let cellWidth = 60
        
        // Determinar columna y pintar celda
        if (selectedItem.tentativa === 'TENTATIVA 1') {
          cellX = colX.t1
          paintCell(cellX, currentY, cellWidth, 10)
          writeText(formatCurrency(selectedItem.precio), cellX, currentY, 9)
        } else if (selectedItem.tentativa === 'TENTATIVA 2') {
          cellX = colX.t2
          paintCell(cellX, currentY, cellWidth, 10)
          writeText(formatCurrency(selectedItem.precio), cellX, currentY, 9)
        } else if (selectedItem.tentativa === 'TENTATIVA 3') {
          cellX = colX.t3
          paintCell(cellX, currentY, cellWidth, 10)
          writeText(formatCurrency(selectedItem.precio), cellX, currentY, 9)
        } else if (selectedItem.tentativa === 'RECONSTRUCCIÓN') {
          cellX = colX.recon
          paintCell(cellX, currentY, cellWidth, 10)
          writeText(formatCurrency(selectedItem.precio), cellX, currentY, 9)
        }
        
        totalSum += selectedItem.precio
      }
    })
    
    // 10. Escribir sumatoria total donde está el "0,00"
    writeText(formatCurrency(totalSum), 450, 120, 12)
    
    // 11. Guardar y descargar
    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `convenio-${formData.placa_dp || 'sin-placa'}-${new Date().toISOString().split('T')[0]}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
  } catch (error) {
    console.error('Error generando PDF:', error)
    alert('Error al generar PDF. Por favor intente nuevamente.')
  }
}

// Formatear moneda
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true
  }).format(amount)
}
