import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

// Función para cargar PDF desde URL y convertir a bytes
export const loadPdfFromUrl = async (url: string): Promise<Uint8Array> => {
  try {
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    return new Uint8Array(arrayBuffer)
  } catch (error) {
    console.error('Error al cargar PDF desde URL:', error)
    throw new Error('No se pudo cargar el archivo PDF')
  }
}

// Función principal para generar PDF usando la plantilla exacta del Excel
export const generatePDF = async (
  formData: any,
  selectedData: any[],
  stats: any
): Promise<Uint8Array> => {
  try {
    // Cargar plantilla PDF desde la carpeta pública
    const pdfUrl = '/Templates/TABLA%20A%20-%20CONVENIO.pdf'
    const existingPdfBytes = await loadPdfFromUrl(pdfUrl)
    
    // Cargar el documento PDF existente
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    
    // Obtener la primera página
    const page = pdfDoc.getPage(0)
    
    // Cargar fuentes
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    
    // Función para escribir texto en coordenadas específicas
    const writeText = (text: string, x: number, y: number, size: number = 10, bold: boolean = false) => {
      page.drawText(text, {
        x,
        y,
        size,
        font: bold ? helveticaBoldFont : helveticaFont,
        color: rgb(0, 0, 0),
      })
    }
    
    // Función para resaltar celda (pintar) con rectángulo amarillo
    const highlightCell = (x: number, y: number, width: number, height: number) => {
      page.drawRectangle({
        x: x - 2,
        y: y - height + 2,
        width: width + 4,
        height: height + 4,
        color: rgb(1, 1, 0), // Amarillo
        opacity: 0.3, // 30% de transparencia para no ocultar el texto
      })
    }
    
    // Escribir datos del formulario en las posiciones exactas del Excel
    // Basado en el análisis: Fila 3-5 tienen los campos del formulario
    writeText(formData.asegurado || '', 150, 520, 10)      // ASEGURADO (fila 3)
    writeText(formData.vehiculo_dp || '', 150, 505, 10)    // VEHÍCULO D.P. (fila 4)
    writeText(formData.marca_dp || '', 350, 505, 10)        // MARCA (fila 4)
    writeText(formData.placa_dp || '', 150, 490, 10)        // PLACA (fila 5)
    
    // Mapeo exacto de la tabla basado en el análisis del Excel
    // La tabla empieza en la fila 6 del Excel y tiene las siguientes coordenadas aproximadas:
    const tableStartY = 475  // Posición Y inicial de la tabla
    const rowHeight = 15     // Altura de cada fila
    const colX = {
      no: 50,           // Columna No.
      pieza: 80,        // Columna PIEZA
      t1: 250,          // Columna TENTATIVA 1
      t2: 320,          // Columna TENTATIVA 2
      t3: 390,          // Columna TENTATIVA 3
      recon: 460        // Columna RECONSTRUCCIÓN
    }
    
    // Obtener todas las piezas del sistema (las mismas que en el Excel)
    const allPieces = [
      { no: 1, pieza: "CAPOT (ESTRUCTURA EXTERNA E INTERNA)", t1: 556.80, t2: 696.00, t3: 835.20, recon: 1670.40 },
      { no: 2, pieza: "GUARDABARROS DELANTEROS", t1: 348.00, t2: 487.20, t3: 626.40, recon: 1252.80 },
      { no: 3, pieza: "GUARDABARROS TRASEROS", t1: 348.00, t2: 487.20, t3: 696.00, recon: 1252.80 },
      { no: 4, pieza: "PUERTAS DELANTERAS", t1: 348.00, t2: 487.20, t3: 696.00, recon: 1252.80 },
      { no: 5, pieza: "PUERTAS TRASERAS", t1: 348.00, t2: 487.20, t3: 696.00, recon: 1252.80 },
      { no: 6, pieza: "LATERALES TRASEROS (VAGONETAS)", t1: 348.00, t2: 487.20, t3: 765.60, recon: 1531.20 },
      { no: 7, pieza: "LATERALES DE CARROCERÍA (CAMIONETA)", t1: 556.80, t2: 696.00, t3: 904.80, recon: 1531.20 },
      { no: 8, pieza: "TECHO", t1: 626.40, t2: 765.60, t3: 1113.60, recon: 1740.00 },
      { no: 9, pieza: "TAPA DE MALETERO (VGTA.-AUTO)", t1: 348.00, t2: 487.20, t3: 626.40, recon: 1252.80 },
      { no: 10, pieza: "COMPUERTA TRASERA DE CARROCERÍA (CMTA)", t1: 348.00, t2: 417.60, t3: 556.80, recon: 1252.80 },
      { no: 11, pieza: "PARACHOQUE DELANTERO", t1: 348.00, t2: 487.20, t3: 626.40, recon: 1252.80 },
      { no: 12, pieza: "PARACHOQUE TRASERO", t1: 348.00, t2: 487.20, t3: 626.40, recon: 1252.80 },
      { no: 13, pieza: "SPOILER DE PARACHOQUE", t1: 208.80, t2: 278.40, t3: 348.00, recon: 0 },
      { no: 14, pieza: "SOPORTES DE PARACHOQUE", t1: 174.00, t2: 278.40, t3: 348.00, recon: 0 },
      { no: 15, pieza: "PUNTERAS DELANTERAS", t1: 208.80, t2: 278.40, t3: 348.00, recon: 0 },
      { no: 16, pieza: "PUNTERAS TRASERAS", t1: 208.80, t2: 278.40, t3: 348.00, recon: 0 },
      { no: 17, pieza: "BUCHERAS DELANTERAS", t1: 174.00, t2: 257.52, t3: 348.00, recon: 0 },
      { no: 18, pieza: "BUCHERAS TRASERAS", t1: 174.00, t2: 257.52, t3: 348.00, recon: 0 },
      { no: 19, pieza: "MOLDURAS DE PUERTAS DELANTERAS", t1: 174.00, t2: 257.52, t3: 348.00, recon: 0 },
      { no: 20, pieza: "MOLDURAS DE PUERTAS TRASERAS", t1: 174.00, t2: 257.52, t3: 348.00, recon: 0 },
      { no: 21, pieza: "MARCO DE RADIADOR", t1: 208.80, t2: 313.20, t3: 417.60, recon: 0 },
      { no: 22, pieza: "MARCO INFERIOR DE MÁSCARA", t1: 208.80, t2: 313.20, t3: 417.60, recon: 0 },
      { no: 23, pieza: "PARANTES (DE PUERTA, PARABRISA, TRASERO)", t1: 208.80, t2: 313.20, t3: 417.60, recon: 0 },
      { no: 24, pieza: "REJILLA INFERIOR DE PARABRISAS", t1: 139.20, t2: 174.00, t3: 278.40, recon: 0 },
      { no: 25, pieza: "ZÓCALO", t1: 208.80, t2: 313.20, t3: 487.20, recon: 0 },
      { no: 26, pieza: "INTERIOR DE GUARDABARROS", t1: 208.80, t2: 278.40, t3: 417.60, recon: 0 },
      { no: 27, pieza: "TAPA DE TANQUE", t1: 69.60, t2: 104.40, t3: 139.20, recon: 0 },
      { no: 28, pieza: "PISADERAS", t1: 208.80, t2: 278.40, t3: 348.00, recon: 0 },
      { no: 29, pieza: "PISO DE CARROCERÍA", t1: 313.20, t2: 417.60, t3: 556.80, recon: 0 },
      { no: 30, pieza: "SERVICIO DE RAMPLA", t1: 696.00, t2: 1044.00, t3: 1392.00, recon: 0 },
      { no: 31, pieza: "PINTADO DE ESPEJOS", t1: 139.20, t2: 0, t3: 0, recon: 0 },
      { no: 32, pieza: "INSTALADO DE RADIO", t1: 69.60, t2: 0, t3: 0, recon: 0 },
      { no: 33, pieza: "INSTALADO DE ESPEJO ELÉCTRICO", t1: 69.60, t2: 0, t3: 0, recon: 0 },
      { no: 34, pieza: "INSTALADO DE PARABRISAS (CON GOMA)", t1: 208.80, t2: 0, t3: 0, recon: 0 },
      { no: 35, pieza: "INSTALADO DE PARABRISAS (CON SELLADOR)", t1: 487.20, t2: 0, t3: 0, recon: 0 },
      { no: 36, pieza: "INSTALADO DE VIDRIO DE PUERTAS", t1: 139.20, t2: 0, t3: 0, recon: 0 },
      { no: 37, pieza: "INSTALADO DE VIDRIO DE COMPUERTA TRASERA (CON GOMA)", t1: 348.00, t2: 0, t3: 0, recon: 0 },
      { no: 38, pieza: "INSTALADO DE VIDRIO LATERAL TRASERO (CON GOMA)", t1: 139.20, t2: 0, t3: 0, recon: 0 }
    ]
    
    // Procesar las piezas seleccionadas y escribirlas en la tabla
    selectedData.forEach(selectedItem => {
      const piece = allPieces.find(p => p.pieza === selectedItem.pieza)
      if (piece) {
        const rowIndex = piece.no - 1 // Índice basado en el número de pieza
        const currentY = tableStartY - (rowIndex * rowHeight)
        
        // Resaltar la celda seleccionada (pintar)
        let cellX = 0
        let cellWidth = 60
        
        if (selectedItem.tentativa === 'TENTATIVA 1') {
          cellX = colX.t1
          highlightCell(cellX, currentY, cellWidth, 12)
          writeText(formatCurrency(selectedItem.precio), colX.t1, currentY, 9)
        } else if (selectedItem.tentativa === 'TENTATIVA 2') {
          cellX = colX.t2
          highlightCell(cellX, currentY, cellWidth, 12)
          writeText(formatCurrency(selectedItem.precio), colX.t2, currentY, 9)
        } else if (selectedItem.tentativa === 'TENTATIVA 3') {
          cellX = colX.t3
          highlightCell(cellX, currentY, cellWidth, 12)
          writeText(formatCurrency(selectedItem.precio), colX.t3, currentY, 9)
        } else if (selectedItem.tentativa === 'RECONSTRUCCIÓN') {
          cellX = colX.recon
          highlightCell(cellX, currentY, cellWidth, 12)
          writeText(formatCurrency(selectedItem.precio), colX.recon, currentY, 9)
        }
      }
    })
    
    // Escribir el total en la posición donde está el "0,00" al lado de "TOTAL [BS]"
    writeText(formatCurrency(stats.sumatoria), 450, 120, 12, true) // Coordenada exacta para el 0,00
    
    // Guardar el PDF modificado
    const pdfBytes = await pdfDoc.save()
    return pdfBytes
    
  } catch (error) {
    console.error('Error generando PDF:', error)
    throw new Error('No se pudo generar el PDF')
  }
}

// Función para formatear moneda
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true
  }).format(amount)
}

// Función para descargar PDF en el navegador
export const downloadPDF = (pdfBytes: Uint8Array, filename: string = 'convenio-taller.pdf') => {
  const blob = new Blob([pdfBytes as any], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
