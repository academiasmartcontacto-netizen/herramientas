'use client'

import React, { useState, useRef } from 'react'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

interface FormData {
  asegurado: string
  vehiculo_dp: string
  marca_dp: string
  placa_dp: string
}

interface PiezaData {
  no: number
  pieza: string
  t1: number
  t2: number
  t3: number
  reconstrucción: number
}

export default function Test2Page() {
  const [formData, setFormData] = useState<FormData>({
    asegurado: '',
    vehiculo_dp: '',
    marca_dp: '',
    placa_dp: ''
  })
  
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set())
  const [dynamicItems, setDynamicItems] = useState<{ pieza: string, valor: number }[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newItem, setNewItem] = useState({ pieza: '', valor: '' })
  const tableRef = useRef<HTMLDivElement>(null)

  // Datos exactos del Excel
  const tablaDatos: PiezaData[] = [
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
    {no: 29, pieza: "PISO DE CARROCERÍA", t1: 313.20, t2: 417.60, t3: 556.80, reconstrucción: 0}
  ]

  const tabla3Datos = [
    {no: 31, pieza: "PINTADO DE ESPEJOS", t1: 139.20},
    {no: 32, pieza: "INSTALADO DE RADIO", t1: 69.60},
    {no: 33, pieza: "INSTALADO DE ESPEJO ELÉCTRICO", t1: 69.60},
    {no: 34, pieza: "INSTALADO DE PARABRISAS (CON GOMA)", t1: 208.80},
    {no: 35, pieza: "INSTALADO DE PARABRISAS (CON SELLADOR)", t1: 487.20},
    {no: 36, pieza: "INSTALADO DE VIDRIO DE PUERTAS", t1: 139.20},
    {no: 37, pieza: "INSTALADO DE VIDRIO DE COMPUERTA TRASERA (CON GOMA)", t1: 348.00},
    {no: 38, pieza: "INSTALADO DE VIDRIO LATERAL TRASERO (CON GOMA)", t1: 139.20}
  ]

  const handleAddItem = () => {
    if (newItem.pieza && newItem.valor) {
      setDynamicItems(prev => [...prev, { 
        pieza: newItem.pieza, 
        valor: parseFloat(newItem.valor.replace(',', '.')) 
      }])
      setNewItem({ pieza: '', valor: '' })
      setIsModalOpen(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    }).format(amount)
  }

  const calculateTotal = () => {
    let total = 0
    selectedCells.forEach(cellKey => {
      if (cellKey.startsWith('rampla-')) {
        if (cellKey === 'rampla-t1') total += 696.00
        else if (cellKey === 'rampla-t2') total += 1044.00
        else if (cellKey === 'rampla-t3') total += 1392.00
      } else if (cellKey.startsWith('t3-')) {
        const [_, rowIndex, column] = cellKey.split('-')
        const item = tabla3Datos[parseInt(rowIndex)]
        if (column === 't1' && item) total += item.t1
      } else if (cellKey.startsWith('dynamic-')) {
        const [_, rowIndex] = cellKey.split('-')
        const item = dynamicItems[parseInt(rowIndex)]
        if (item) total += item.valor
      } else {
        const [rowIndex, column] = cellKey.split('-')
        const item = tablaDatos[parseInt(rowIndex)]
        if (item) {
          if (column === 't1') total += item.t1
          else if (column === 't2') total += item.t2
          else if (column === 't3') total += item.t3
          else if (column === 'reconstrucción') total += item.reconstrucción
        }
      }
    })
    return total
  }

  const exportToPDF = () => {
    try {
      // Configuración de anchos de columna para alineación tipo Excel (Total: 205mm)
      const columnStyles = {
        0: { cellWidth: 10 }, // No.
        1: { cellWidth: 90 }, // PIEZA
        2: { cellWidth: 25 }, // T1
        3: { cellWidth: 25 }, // T2
        4: { cellWidth: 25 }, // T3
        5: { cellWidth: 30 }, // RECONSTRUCCIÓN
      }
      
      const totalTableWidth = 10 + 90 + 25 + 25 + 25 + 30 // 205mm
      const margin = 10
      const pageWidth = totalTableWidth + (margin * 2) // 225mm aprox.

      // Cálculo de altura dinámica para evitar saltos de página
      const estimatedHeight = 30 + (tablaDatos.length * 5) + 20 + (tabla3Datos.length * 5) + (dynamicItems.length * 5) + 60
      
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [pageWidth, Math.max(279.4, estimatedHeight)] // Ancho calculado, Altura Variable
      })

      const orangeHeader = [250, 191, 143] as [number, number, number]
      const yellowSelected = [255, 255, 0] as [number, number, number]

      // 1. Cabecera Principal
      autoTable(doc, {
        theme: 'grid',
        styles: { fontSize: 7, font: 'helvetica', cellPadding: 1, minCellHeight: 5, valign: 'middle', lineWidth: 0.1, lineColor: [156, 163, 175], textColor: [0, 0, 0] },
        columnStyles: columnStyles,
        margin: { top: margin, left: margin, right: margin },
        body: [
          [{ content: 'TABLA DE PRECIOS PARA TALLERES AUTORIZADOS', colSpan: 6, styles: { halign: 'center', fontStyle: 'bold', fillColor: orangeHeader } }],
          [{ content: 'ASEGURADO:', colSpan: 6, styles: { fillColor: orangeHeader, fontStyle: 'bold' } }],
          [
            { content: 'VEHÍCULO D.P.:', colSpan: 2, styles: { fillColor: orangeHeader, fontStyle: 'bold' } },
            { content: 'MARCA:', colSpan: 2, styles: { fillColor: orangeHeader, fontStyle: 'bold' } },
            { content: 'PLACA:', colSpan: 2, styles: { fillColor: orangeHeader, fontStyle: 'bold' } }
          ],
          [
            { content: 'VEHÍCULO R.C.:', colSpan: 2, styles: { fillColor: orangeHeader, fontStyle: 'bold' } },
            { content: 'MARCA:', colSpan: 2, styles: { fillColor: orangeHeader, fontStyle: 'bold' } },
            { content: 'PLACA:', colSpan: 2, styles: { fillColor: orangeHeader, fontStyle: 'bold' } }
          ]
        ]
      })

      // 2. Tabla 1 (Standard)
      const table1Rows = tablaDatos.map((item, index) => [
        { content: item.no.toString(), styles: { halign: 'center' as const } },
        { content: item.pieza, styles: { halign: 'left' as const } },
        { content: formatCurrency(item.t1), styles: { halign: 'center' as const, fillColor: selectedCells.has(`${index}-t1`) ? yellowSelected : undefined } },
        { content: formatCurrency(item.t2), styles: { halign: 'center' as const, fillColor: selectedCells.has(`${index}-t2`) ? yellowSelected : undefined } },
        { content: formatCurrency(item.t3), styles: { halign: 'center' as const, fillColor: selectedCells.has(`${index}-t3`) ? yellowSelected : undefined } },
        { content: formatCurrency(item.reconstrucción), styles: { halign: 'center' as const, fillColor: selectedCells.has(`${index}-reconstrucción`) ? yellowSelected : undefined } }
      ])

      autoTable(doc, {
        startY: (doc as any).lastAutoTable?.finalY,
        theme: 'grid',
        styles: { fontSize: 7, font: 'helvetica', cellPadding: 1, minCellHeight: 5, valign: 'middle', lineWidth: 0.1, lineColor: [156, 163, 175], textColor: [0, 0, 0] },
        headStyles: { fillColor: orangeHeader, textColor: [0, 0, 0], fontStyle: 'bold', halign: 'center' },
        columnStyles: columnStyles,
        head: [['No.', 'PIEZA', 'TENTATIVA 1', 'TENTATIVA 2', 'TENTATIVA 3', 'RECONSTRUCCIÓN']],
        body: table1Rows,
        margin: { left: margin, right: margin, top: 0 }
      })

      // 3. Tabla 2 (Rampla)
      autoTable(doc, {
        startY: (doc as any).lastAutoTable?.finalY + 5,
        theme: 'grid',
        styles: { fontSize: 7, font: 'helvetica', cellPadding: 1, minCellHeight: 5, valign: 'middle', lineWidth: 0.1, lineColor: [156, 163, 175], textColor: [0, 0, 0] },
        headStyles: { fillColor: orangeHeader, textColor: [0, 0, 0], fontStyle: 'bold', halign: 'center' },
        columnStyles: { 0: columnStyles[0], 1: columnStyles[1], 2: columnStyles[2], 3: columnStyles[3], 4: columnStyles[4] },
        head: [['No.', 'PIEZA', 'TENTATIVA 1', 'TENTATIVA 2', 'TENTATIVA 3']],
        body: [
          [
            { content: '30', styles: { halign: 'center' as const } },
            { content: 'SERVICIO DE RAMPLA', styles: { halign: 'left' as const } },
            { content: formatCurrency(696.00), styles: { halign: 'center' as const, fillColor: selectedCells.has('rampla-t1') ? yellowSelected : undefined } },
            { content: formatCurrency(1044.00), styles: { halign: 'center' as const, fillColor: selectedCells.has('rampla-t2') ? yellowSelected : undefined } },
            { content: formatCurrency(1392.00), styles: { halign: 'center' as const, fillColor: selectedCells.has('rampla-t3') ? yellowSelected : undefined } }
          ]
        ],
        margin: { left: margin, right: margin, top: 0 }
      })

      // 4. Tabla 3 (Adicionales)
      const table3Rows = tabla3Datos.map((item, index) => [
        { content: item.no.toString(), styles: { halign: 'center' as const } },
        { content: item.pieza, styles: { halign: 'left' as const } },
        { content: formatCurrency(item.t1), styles: { halign: 'center' as const, fillColor: selectedCells.has(`t3-${index}-t1`) ? yellowSelected : undefined } }
      ])

      autoTable(doc, {
        startY: (doc as any).lastAutoTable?.finalY + 5,
        theme: 'grid',
        styles: { fontSize: 7, font: 'helvetica', cellPadding: 1, minCellHeight: 5, valign: 'middle', lineWidth: 0.1, lineColor: [156, 163, 175], textColor: [0, 0, 0] },
        headStyles: { fillColor: orangeHeader, textColor: [0, 0, 0], fontStyle: 'bold', halign: 'center' },
        columnStyles: { 0: columnStyles[0], 1: columnStyles[1], 2: columnStyles[2] },
        head: [['No.', 'PIEZA', 'TENTATIVA 1']],
        body: table3Rows,
        margin: { left: margin, right: margin, top: 0 }
      })

      // 5. Tabla 4 (Dinámicos)
      if (dynamicItems.length > 0) {
        const table4Rows = dynamicItems.map((item, index) => [
          { content: (39 + index).toString(), styles: { halign: 'center' as const } },
          { content: item.pieza, styles: { halign: 'left' as const } },
          { content: formatCurrency(item.valor), styles: { halign: 'center' as const, fillColor: selectedCells.has(`dynamic-${index}`) ? yellowSelected : undefined } }
        ])

        autoTable(doc, {
          startY: (doc as any).lastAutoTable?.finalY + 5,
          theme: 'grid',
          styles: { fontSize: 7, font: 'helvetica', cellPadding: 1, minCellHeight: 5, valign: 'middle', lineWidth: 0.1, lineColor: [156, 163, 175], textColor: [0, 0, 0] },
          columnStyles: { 0: columnStyles[0], 1: columnStyles[1], 2: columnStyles[2] },
          body: table4Rows,
          margin: { left: margin, right: margin, top: 0 }
        })
      }

      // 6. Fila de Total
      autoTable(doc, {
        startY: (doc as any).lastAutoTable?.finalY + 5,
        theme: 'grid',
        styles: { fontSize: 9, font: 'helvetica', cellPadding: 2, minCellHeight: 8, valign: 'middle', lineWidth: 0.1, lineColor: [156, 163, 175], textColor: [0, 0, 0] },
        columnStyles: { 0: { cellWidth: 10 + 90 }, 1: { cellWidth: 25 } }, 
        body: [
          [
            { content: 'TOTAL [BS]', styles: { halign: 'right' as const, fontStyle: 'bold', fillColor: orangeHeader } },
            { content: formatCurrency(calculateTotal()), styles: { halign: 'center' as const, fontStyle: 'bold' } }
          ]
        ],
        margin: { left: margin, right: margin, top: 0 }
      })

      doc.save('presupuesto-exacto.pdf')
    } catch (error) {
      console.error('Error generando PDF:', error)
      alert('Hubo un error al generar el PDF.')
    }
  }

  const renderCell = (content: React.ReactNode, className: string = '', style: React.CSSProperties = {}, onClick?: () => void) => (
    <td 
      className={`p-0 whitespace-nowrap ${className}`}
      style={{ 
        height: '24px', 
        minHeight: '24px', 
        border: '1px solid #9ca3af', // Borde exacto
        ...style 
      }}
      onClick={onClick}
    >
      <div style={{ display: 'block', width: '100%', height: '24px', lineHeight: '24px', textAlign: className.includes('text-left') ? 'left' : (className.includes('text-right') ? 'right' : 'center'), padding: '0 8px', boxSizing: 'border-box' }}>
        {content}
      </div>
    </td>
  )

  const toggleCell = (rowIndex: number, column: string) => {
    const cellKey = `${rowIndex}-${column}`
    const newSelected = new Set(selectedCells)
    if (newSelected.has(cellKey)) newSelected.delete(cellKey)
    else newSelected.add(cellKey)
    setSelectedCells(newSelected)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">TEST 2 - Réplica Exacta del Excel</h1>
        
        <div ref={tableRef} id="pdf-capture-area" className="bg-white shadow-lg inline-block p-8">
          <div className="overflow-auto">
            <table className="w-auto border-collapse" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', tableLayout: 'auto', borderSpacing: 0, border: '1px solid #9ca3af' }}>
              <thead>
                <tr style={{ backgroundColor: '#FABF8F', height: '30px' }}>
                  <th className="text-center font-black whitespace-nowrap" colSpan={6} style={{ padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '30px', lineHeight: '30px', textAlign: 'center' }}>TABLA DE PRECIOS PARA TALLERES AUTORIZADOS</div>
                  </th>
                </tr>
                <tr style={{ backgroundColor: '#FABF8F', height: '30px' }}>
                  <th className="text-left font-semibold whitespace-nowrap" colSpan={6} style={{ padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '30px', lineHeight: '30px', padding: '0 8px', textAlign: 'left' }}>ASEGURADO:</div>
                  </th>
                </tr>
                <tr style={{ backgroundColor: '#FABF8F', height: '30px' }}>
                  <th className="text-left font-semibold whitespace-nowrap" colSpan={2} style={{ padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '30px', lineHeight: '30px', padding: '0 8px', textAlign: 'left' }}>VEHÍCULO D.P.:</div>
                  </th>
                  <th className="text-left font-semibold whitespace-nowrap" colSpan={2} style={{ padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '30px', lineHeight: '30px', padding: '0 8px', textAlign: 'left' }}>MARCA:</div>
                  </th>
                  <th className="text-left font-semibold whitespace-nowrap" colSpan={2} style={{ padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '30px', lineHeight: '30px', padding: '0 8px', textAlign: 'left' }}>PLACA:</div>
                  </th>
                </tr>
                <tr style={{ backgroundColor: '#FABF8F', height: '30px' }}>
                  <th className="text-left font-semibold whitespace-nowrap" colSpan={2} style={{ padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '30px', lineHeight: '30px', padding: '0 8px', textAlign: 'left' }}>VEHÍCULO R.C.:</div>
                  </th>
                  <th className="text-left font-semibold whitespace-nowrap" colSpan={2} style={{ padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '30px', lineHeight: '30px', padding: '0 8px', textAlign: 'left' }}>MARCA:</div>
                  </th>
                  <th className="text-left font-semibold whitespace-nowrap" colSpan={2} style={{ padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '30px', lineHeight: '30px', padding: '0 8px', textAlign: 'left' }}>PLACA:</div>
                  </th>
                </tr>
                <tr style={{ backgroundColor: '#FABF8F', height: '35px' }}>
                  <th className="text-center font-semibold whitespace-nowrap" style={{ width: '40px', padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '35px', lineHeight: '35px', textAlign: 'center' }}>No.</div>
                  </th>
                  <th className="text-left font-semibold whitespace-nowrap" style={{ padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '35px', lineHeight: '35px', padding: '0 8px', textAlign: 'left' }}>PIEZA</div>
                  </th>
                  <th className="text-center font-semibold whitespace-nowrap" style={{ width: '100px', padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '35px', lineHeight: '35px', textAlign: 'center' }}>TENTATIVA 1</div>
                  </th>
                  <th className="text-center font-semibold whitespace-nowrap" style={{ width: '100px', padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '35px', lineHeight: '35px', textAlign: 'center' }}>TENTATIVA 2</div>
                  </th>
                  <th className="text-center font-semibold whitespace-nowrap" style={{ width: '100px', padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '35px', lineHeight: '35px', textAlign: 'center' }}>TENTATIVA 3</div>
                  </th>
                  <th className="text-center font-semibold whitespace-nowrap" style={{ width: '120px', padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '35px', lineHeight: '35px', textAlign: 'center' }}>RECONSTRUCCIÓN</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tablaDatos.map((item, index) => (
                  <tr key={`${item.no}-${index}`} style={{ height: '24px' }}>
                    {renderCell(item.no, 'text-center')}
                    {renderCell(item.pieza, 'text-left')}
                    {renderCell(formatCurrency(item.t1), `text-center cursor-pointer ${selectedCells.has(`${index}-t1`) ? 'bg-yellow-200' : 'hover:bg-gray-100'}`, {}, () => toggleCell(index, 't1'))}
                    {renderCell(formatCurrency(item.t2), `text-center cursor-pointer ${selectedCells.has(`${index}-t2`) ? 'bg-yellow-200' : 'hover:bg-gray-100'}`, {}, () => toggleCell(index, 't2'))}
                    {renderCell(formatCurrency(item.t3), `text-center cursor-pointer ${selectedCells.has(`${index}-t3`) ? 'bg-yellow-200' : 'hover:bg-gray-100'}`, {}, () => toggleCell(index, 't3'))}
                    {renderCell(formatCurrency(item.reconstrucción), `text-center cursor-pointer ${selectedCells.has(`${index}-reconstrucción`) ? 'bg-yellow-200' : 'hover:bg-gray-100'}`, {}, () => toggleCell(index, 'reconstrucción'))}
                  </tr>
                ))}
                <tr style={{ height: '24px' }}><td colSpan={6} className="border-0"></td></tr>
                <tr style={{ height: '30px' }}>
                  <th className="text-center font-semibold whitespace-nowrap" style={{ backgroundColor: '#FABF8F', padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '30px', lineHeight: '30px', textAlign: 'center' }}>No.</div>
                  </th>
                  <th className="text-left font-semibold whitespace-nowrap" style={{ backgroundColor: '#FABF8F', padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '30px', lineHeight: '30px', padding: '0 8px', textAlign: 'left' }}>PIEZA</div>
                  </th>
                  <th className="text-center font-semibold whitespace-nowrap" style={{ backgroundColor: '#FABF8F', padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '30px', lineHeight: '30px', textAlign: 'center' }}>TENTATIVA 1</div>
                  </th>
                  <th className="text-center font-semibold whitespace-nowrap" style={{ backgroundColor: '#FABF8F', padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '30px', lineHeight: '30px', textAlign: 'center' }}>TENTATIVA 2</div>
                  </th>
                  <th className="text-center font-semibold whitespace-nowrap" style={{ backgroundColor: '#FABF8F', padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '30px', lineHeight: '30px', textAlign: 'center' }}>TENTATIVA 3</div>
                  </th>
                  <th className="border-0 bg-transparent" colSpan={1}></th>
                </tr>
                <tr style={{ height: '24px' }}>
                  {renderCell(30, 'text-center')}
                  {renderCell('SERVICIO DE RAMPLA', 'text-left')}
                  {renderCell(formatCurrency(696.00), `text-center cursor-pointer ${selectedCells.has('rampla-t1') ? 'bg-yellow-200' : 'hover:bg-gray-100'}`, {}, () => {
                    const newSelected = new Set(selectedCells)
                    if (newSelected.has('rampla-t1')) newSelected.delete('rampla-t1')
                    else newSelected.add('rampla-t1')
                    setSelectedCells(newSelected)
                  })}
                  {renderCell(formatCurrency(1044.00), `text-center cursor-pointer ${selectedCells.has('rampla-t2') ? 'bg-yellow-200' : 'hover:bg-gray-100'}`, {}, () => {
                    const newSelected = new Set(selectedCells)
                    if (newSelected.has('rampla-t2')) newSelected.delete('rampla-t2')
                    else newSelected.add('rampla-t2')
                    setSelectedCells(newSelected)
                  })}
                  {renderCell(formatCurrency(1392.00), `text-center cursor-pointer ${selectedCells.has('rampla-t3') ? 'bg-yellow-200' : 'hover:bg-gray-100'}`, {}, () => {
                    const newSelected = new Set(selectedCells)
                    if (newSelected.has('rampla-t3')) newSelected.delete('rampla-t3')
                    else newSelected.add('rampla-t3')
                    setSelectedCells(newSelected)
                  })}
                  <td className="border-0 bg-transparent"></td>
                </tr>
                <tr style={{ height: '24px' }}><td colSpan={6} className="border-0"></td></tr>
                <tr style={{ height: '30px' }}>
                  <th className="text-center font-semibold whitespace-nowrap" style={{ backgroundColor: '#FABF8F', padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '30px', lineHeight: '30px', textAlign: 'center' }}>No.</div>
                  </th>
                  <th className="text-left font-semibold whitespace-nowrap" style={{ backgroundColor: '#FABF8F', padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '30px', lineHeight: '30px', padding: '0 8px', textAlign: 'left' }}>PIEZA</div>
                  </th>
                  <th className="text-center font-semibold whitespace-nowrap" style={{ backgroundColor: '#FABF8F', padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '30px', lineHeight: '30px', textAlign: 'center' }}>TENTATIVA 1</div>
                  </th>
                  <th className="border-0 bg-transparent" colSpan={3}></th>
                </tr>
                {tabla3Datos.map((item, index) => (
                  <tr key={`table3-${item.no}-${index}`} style={{ height: '24px' }}>
                    {renderCell(item.no, 'text-center')}
                    {renderCell(item.pieza, 'text-left')}
                    {renderCell(formatCurrency(item.t1), `text-center cursor-pointer ${selectedCells.has(`t3-${index}-t1`) ? 'bg-yellow-200' : 'hover:bg-gray-100'}`, {}, () => {
                      const newSelected = new Set(selectedCells)
                      if (newSelected.has(`t3-${index}-t1`)) newSelected.delete(`t3-${index}-t1`)
                      else newSelected.add(`t3-${index}-t1`)
                      setSelectedCells(newSelected)
                    })}
                    <td className="border-0 bg-transparent" colSpan={3}></td>
                  </tr>
                ))}
                <tr style={{ height: '24px' }}>
                  <td colSpan={2} className="border-0"></td>
                  <td colSpan={4} className="border-0 text-right py-2">
                    <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-bold py-1 px-3 rounded shadow-sm transition-colors flex items-center gap-1 ml-auto">
                      <span>Añadir +</span>
                    </button>
                  </td>
                </tr>
                {dynamicItems.map((item, index) => (
                  <tr key={`dynamic-${index}`} style={{ height: '24px' }}>
                    {renderCell(39 + index, 'text-center')}
                    {renderCell(item.pieza, 'text-left')}
                    {renderCell(formatCurrency(item.valor), `text-center cursor-pointer ${selectedCells.has(`dynamic-${index}`) ? 'bg-yellow-200' : 'hover:bg-gray-100'}`, {}, () => {
                      const newSelected = new Set(selectedCells)
                      if (newSelected.has(`dynamic-${index}`)) newSelected.delete(`dynamic-${index}`)
                      else newSelected.add(`dynamic-${index}`)
                      setSelectedCells(newSelected)
                    })}
                    <td className="border-0 bg-transparent" colSpan={3}></td>
                   </tr>
                 ))}
                <tr style={{ height: '24px' }}><td colSpan={6} className="border-0"></td></tr>
                <tr style={{ height: '35px' }}>
                  <td colSpan={2} className="text-right font-black text-sm" style={{ backgroundColor: '#FABF8F', padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '35px', lineHeight: '35px', padding: '0 16px', textAlign: 'right' }}>TOTAL [BS]</div>
                  </td>
                  <td className="text-center font-bold text-sm bg-white" style={{ padding: 0, border: '1px solid #9ca3af' }}>
                    <div style={{ height: '35px', lineHeight: '35px', textAlign: 'center' }}>{formatCurrency(calculateTotal())}</div>
                  </td>
                  <td colSpan={3} className="border-0 bg-transparent"></td>
                </tr>
               </tbody>
             </table>
           </div>
         </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96 border border-gray-200">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Añadir Ítem Adicional</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del ítem</label>
                  <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 outline-none" placeholder="Ej: RECARGO POR TRABAJO NOCTURNO" value={newItem.pieza} onChange={(e) => setNewItem(prev => ({ ...prev, pieza: e.target.value.toUpperCase() }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                  <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 outline-none" placeholder="0,00" value={newItem.valor} onChange={(e) => setNewItem(prev => ({ ...prev, valor: e.target.value }))} />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">Cancelar</button>
                <button onClick={handleAddItem} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-bold shadow-md transition-all active:scale-95">Añadir Ítem</button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <button onClick={exportToPDF} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition-all flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Exportar a PDF
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Guardar Datos</button>
        </div>
      </div>
    </div>
  )
}
