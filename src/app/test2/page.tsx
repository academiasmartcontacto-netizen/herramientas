'use client'

import React, { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

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

  // Datos exactos del Excel - mismos que TablaPrecios.tsx
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

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

  const exportToPDF = async () => {
    if (!tableRef.current) return

    try {
      const element = tableRef.current
      const canvas = await html2canvas(element, {
        scale: 2, // Mayor calidad
        useCORS: true,
        backgroundColor: '#ffffff'
      })

      const imgData = canvas.toDataURL('image/png')
      
      // Ancho de hoja carta en mm (215.9 mm)
      const pdfWidth = 215.9
      // Calcular alto proporcional
      const imgProps = (canvas.height * pdfWidth) / canvas.width
      const pdfHeight = imgProps

      // Crear PDF con alto variable
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [pdfWidth, pdfHeight]
      })

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save('presupuesto-talleres.pdf')
    } catch (error) {
      console.error('Error generando PDF:', error)
      alert('Hubo un error al generar el PDF. Por favor intenta de nuevo.')
    }
  }

  const toggleCell = (rowIndex: number, column: string) => {
    const cellKey = `${rowIndex}-${column}`
    const newSelected = new Set(selectedCells)
    if (newSelected.has(cellKey)) {
      newSelected.delete(cellKey)
    } else {
      newSelected.add(cellKey)
    }
    setSelectedCells(newSelected)
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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">TEST 2 - Réplica Exacta del Excel</h1>
        
        {/* Contenedor que simula la hoja de Excel */}
        <div ref={tableRef} className="bg-white shadow-lg inline-block p-8">
          
          <div className="overflow-auto">
            <table className="w-auto" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', tableLayout: 'auto', borderCollapse: 'collapse' }}>
              <thead>
                {/* Cabecera Principal - Tabla 1 */}
                <tr className="border-b border-gray-300" style={{ backgroundColor: '#FABF8F' }}>
                  <th className="border border-gray-400 px-2 py-2 text-center font-black whitespace-nowrap" colSpan={6} style={{ verticalAlign: 'middle' }}>TABLA DE PRECIOS PARA TALLERES AUTORIZADOS</th>
                </tr>
                <tr className="border-b border-gray-300" style={{ backgroundColor: '#FABF8F' }}>
                  <th className="border border-gray-400 px-2 py-2 text-left font-semibold whitespace-nowrap" colSpan={6} style={{ verticalAlign: 'middle' }}>ASEGURADO:</th>
                </tr>
                <tr className="border-b border-gray-300" style={{ backgroundColor: '#FABF8F' }}>
                  <th className="border border-gray-400 px-2 py-2 text-left font-semibold whitespace-nowrap" colSpan={2} style={{ verticalAlign: 'middle' }}>VEHÍCULO D.P.:</th>
                  <th className="border border-gray-400 px-2 py-2 text-left font-semibold whitespace-nowrap" colSpan={2} style={{ verticalAlign: 'middle' }}>MARCA:</th>
                  <th className="border border-gray-400 px-2 py-2 text-left font-semibold whitespace-nowrap" colSpan={2} style={{ verticalAlign: 'middle' }}>PLACA:</th>
                </tr>
                <tr className="border-b border-gray-300" style={{ backgroundColor: '#FABF8F' }}>
                  <th className="border border-gray-400 px-2 py-2 text-left font-semibold whitespace-nowrap" colSpan={2} style={{ verticalAlign: 'middle' }}>VEHÍCULO R.C.:</th>
                  <th className="border border-gray-400 px-2 py-2 text-left font-semibold whitespace-nowrap" colSpan={2} style={{ verticalAlign: 'middle' }}>MARCA:</th>
                  <th className="border border-gray-400 px-2 py-2 text-left font-semibold whitespace-nowrap" colSpan={2} style={{ verticalAlign: 'middle' }}>PLACA:</th>
                </tr>
                <tr className="border-b border-gray-400" style={{ backgroundColor: '#FABF8F' }}>
                  <th className="border border-gray-400 px-2 py-2 text-center font-semibold whitespace-nowrap" style={{ width: '40px', verticalAlign: 'middle' }}>No.</th>
                  <th className="border border-gray-400 px-2 py-2 text-left font-semibold whitespace-nowrap" style={{ verticalAlign: 'middle' }}>PIEZA</th>
                  <th className="border border-gray-400 px-2 py-2 text-center font-semibold whitespace-nowrap" style={{ width: '100px', verticalAlign: 'middle' }}>TENTATIVA 1</th>
                  <th className="border border-gray-400 px-2 py-2 text-center font-semibold whitespace-nowrap" style={{ width: '100px', verticalAlign: 'middle' }}>TENTATIVA 2</th>
                  <th className="border border-gray-400 px-2 py-2 text-center font-semibold whitespace-nowrap" style={{ width: '100px', verticalAlign: 'middle' }}>TENTATIVA 3</th>
                  <th className="border border-gray-400 px-2 py-2 text-center font-semibold whitespace-nowrap" style={{ width: '120px', verticalAlign: 'middle' }}>RECONSTRUCCIÓN</th>
                </tr>
              </thead>
              <tbody>
                {/* Filas Tabla 1 */}
                {tablaDatos.map((item, index) => (
                  <tr key={`${item.no}-${index}`} className="border border-gray-300" style={{ height: 'auto', minHeight: '20px' }}>
                    <td className="border border-gray-400 px-2 py-1 text-center whitespace-nowrap" style={{ verticalAlign: 'middle' }}>{item.no}</td>
                    <td className="border border-gray-400 px-2 py-1 whitespace-nowrap" style={{ verticalAlign: 'middle' }}>{item.pieza}</td>
                    <td 
                      className={`border border-gray-400 px-2 py-1 text-center cursor-pointer whitespace-nowrap ${
                        selectedCells.has(`${index}-t1`) ? 'bg-yellow-200' : 'hover:bg-gray-100'
                      }`}
                      style={{ verticalAlign: 'middle' }}
                      onClick={() => toggleCell(index, 't1')}
                    >
                      {formatCurrency(item.t1)}
                    </td>
                    <td 
                      className={`border border-gray-400 px-2 py-1 text-center cursor-pointer whitespace-nowrap ${
                        selectedCells.has(`${index}-t2`) ? 'bg-yellow-200' : 'hover:bg-gray-100'
                      }`}
                      style={{ verticalAlign: 'middle' }}
                      onClick={() => toggleCell(index, 't2')}
                    >
                      {formatCurrency(item.t2)}
                    </td>
                    <td 
                      className={`border border-gray-400 px-2 py-1 text-center cursor-pointer whitespace-nowrap ${
                        selectedCells.has(`${index}-t3`) ? 'bg-yellow-200' : 'hover:bg-gray-100'
                      }`}
                      style={{ verticalAlign: 'middle' }}
                      onClick={() => toggleCell(index, 't3')}
                    >
                      {formatCurrency(item.t3)}
                    </td>
                    <td 
                      className={`border border-gray-400 px-2 py-1 text-center cursor-pointer whitespace-nowrap ${
                        selectedCells.has(`${index}-reconstrucción`) ? 'bg-yellow-200' : 'hover:bg-gray-100'
                      }`}
                      style={{ verticalAlign: 'middle' }}
                      onClick={() => toggleCell(index, 'reconstrucción')}
                    >
                      {formatCurrency(item.reconstrucción)}
                    </td>
                  </tr>
                ))}

                {/* Espacio equivalente al alto de una fila */}
                <tr style={{ height: '24px' }}>
                  <td colSpan={6} className="border-0"></td>
                </tr>

                {/* Cabecera Tabla 2 */}
                <tr>
                  <th className="border border-gray-400 px-2 py-2 text-center font-semibold whitespace-nowrap" style={{ backgroundColor: '#FABF8F', verticalAlign: 'middle' }}>No.</th>
                  <th className="border border-gray-400 px-2 py-2 text-left font-semibold whitespace-nowrap" style={{ backgroundColor: '#FABF8F', verticalAlign: 'middle' }}>PIEZA</th>
                  <th className="border border-gray-400 px-2 py-2 text-center font-semibold whitespace-nowrap" style={{ backgroundColor: '#FABF8F', verticalAlign: 'middle' }}>TENTATIVA 1</th>
                  <th className="border border-gray-400 px-2 py-2 text-center font-semibold whitespace-nowrap" style={{ backgroundColor: '#FABF8F', verticalAlign: 'middle' }}>TENTATIVA 2</th>
                  <th className="border border-gray-400 px-2 py-2 text-center font-semibold whitespace-nowrap" style={{ backgroundColor: '#FABF8F', verticalAlign: 'middle' }}>TENTATIVA 3</th>
                  <th className="border-0 bg-transparent" colSpan={1}></th>
                </tr>

                {/* Fila Tabla 2 */}
                <tr style={{ height: 'auto', minHeight: '20px' }}>
                  <td className="border border-gray-400 px-2 py-1 text-center whitespace-nowrap" style={{ verticalAlign: 'middle' }}>30</td>
                  <td className="border border-gray-400 px-2 py-1 whitespace-nowrap" style={{ verticalAlign: 'middle' }}>SERVICIO DE RAMPLA</td>
                  <td 
                    className={`border border-gray-400 px-2 py-1 text-center cursor-pointer whitespace-nowrap ${
                      selectedCells.has(`rampla-t1`) ? 'bg-yellow-200' : 'hover:bg-gray-100'
                    }`}
                    style={{ verticalAlign: 'middle' }}
                    onClick={() => {
                      const newSelected = new Set(selectedCells)
                      if (newSelected.has('rampla-t1')) newSelected.delete('rampla-t1')
                      else newSelected.add('rampla-t1')
                      setSelectedCells(newSelected)
                    }}
                  >
                    {formatCurrency(696.00)}
                  </td>
                  <td 
                    className={`border border-gray-400 px-2 py-1 text-center cursor-pointer whitespace-nowrap ${
                      selectedCells.has(`rampla-t2`) ? 'bg-yellow-200' : 'hover:bg-gray-100'
                    }`}
                    style={{ verticalAlign: 'middle' }}
                    onClick={() => {
                      const newSelected = new Set(selectedCells)
                      if (newSelected.has('rampla-t2')) newSelected.delete('rampla-t2')
                      else newSelected.add('rampla-t2')
                      setSelectedCells(newSelected)
                    }}
                  >
                    {formatCurrency(1044.00)}
                  </td>
                  <td 
                    className={`border border-gray-400 px-2 py-1 text-center cursor-pointer whitespace-nowrap ${
                      selectedCells.has(`rampla-t3`) ? 'bg-yellow-200' : 'hover:bg-gray-100'
                    }`}
                    style={{ verticalAlign: 'middle' }}
                    onClick={() => {
                      const newSelected = new Set(selectedCells)
                      if (newSelected.has('rampla-t3')) newSelected.delete('rampla-t3')
                      else newSelected.add('rampla-t3')
                      setSelectedCells(newSelected)
                    }}
                  >
                    {formatCurrency(1392.00)}
                  </td>
                  <td className="border-0 bg-transparent"></td>
                </tr>

                {/* Espacio equivalente al alto de una fila */}
                <tr style={{ height: '24px' }}>
                  <td colSpan={6} className="border-0"></td>
                </tr>

                {/* Cabecera Tabla 3 */}
                <tr>
                  <th className="border border-gray-400 px-2 py-2 text-center font-semibold whitespace-nowrap" style={{ backgroundColor: '#FABF8F', verticalAlign: 'middle' }}>No.</th>
                  <th className="border border-gray-400 px-2 py-2 text-left font-semibold whitespace-nowrap" style={{ backgroundColor: '#FABF8F', verticalAlign: 'middle' }}>PIEZA</th>
                  <th className="border border-gray-400 px-2 py-2 text-center font-semibold whitespace-nowrap" style={{ backgroundColor: '#FABF8F', verticalAlign: 'middle' }}>TENTATIVA 1</th>
                  <th className="border-0 bg-transparent" colSpan={3}></th>
                </tr>

                {/* Filas Tabla 3 */}
                {tabla3Datos.map((item, index) => (
                  <tr key={`table3-${item.no}-${index}`} style={{ height: 'auto', minHeight: '20px' }}>
                    <td className="border border-gray-400 px-2 py-1 text-center whitespace-nowrap" style={{ verticalAlign: 'middle' }}>{item.no}</td>
                    <td className="border border-gray-400 px-2 py-1 whitespace-nowrap" style={{ verticalAlign: 'middle' }}>{item.pieza}</td>
                    <td 
                      className={`border border-gray-400 px-2 py-1 text-center cursor-pointer whitespace-nowrap ${
                        selectedCells.has(`t3-${index}-t1`) ? 'bg-yellow-200' : 'hover:bg-gray-100'
                      }`}
                      style={{ verticalAlign: 'middle' }}
                      onClick={() => {
                        const newSelected = new Set(selectedCells)
                        if (newSelected.has(`t3-${index}-t1`)) newSelected.delete(`t3-${index}-t1`)
                        else newSelected.add(`t3-${index}-t1`)
                        setSelectedCells(newSelected)
                      }}
                    >
                      {formatCurrency(item.t1)}
                    </td>
                    <td className="border-0 bg-transparent" colSpan={3}></td>
                  </tr>
                ))}

                {/* Espacio equivalente al alto de una fila */}
                <tr style={{ height: '24px' }}>
                  <td colSpan={2} className="border-0"></td>
                  <td colSpan={4} className="border-0 text-right py-2">
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-bold py-1 px-3 rounded shadow-sm transition-colors flex items-center gap-1 ml-auto"
                    >
                      <span>Añadir +</span>
                    </button>
                  </td>
                </tr>

                {/* Filas Tabla 4 (Dinámica) */}
                {dynamicItems.map((item, index) => (
                  <tr key={`dynamic-${index}`} style={{ height: 'auto', minHeight: '20px' }}>
                    <td className="border border-gray-400 px-2 py-1 text-center whitespace-nowrap" style={{ verticalAlign: 'middle' }}>{39 + index}</td>
                    <td className="border border-gray-400 px-2 py-1 whitespace-nowrap" style={{ verticalAlign: 'middle' }}>{item.pieza}</td>
                    <td 
                      className={`border border-gray-400 px-2 py-1 text-center cursor-pointer whitespace-nowrap ${
                        selectedCells.has(`dynamic-${index}`) ? 'bg-yellow-200' : 'hover:bg-gray-100'
                      }`}
                      style={{ verticalAlign: 'middle' }}
                      onClick={() => {
                        const newSelected = new Set(selectedCells)
                        if (newSelected.has(`dynamic-${index}`)) newSelected.delete(`dynamic-${index}`)
                        else newSelected.add(`dynamic-${index}`)
                        setSelectedCells(newSelected)
                      }}
                    >
                      {formatCurrency(item.valor)}
                    </td>
                    <td className="border-0 bg-transparent" colSpan={3}></td>
                   </tr>
                 ))}

                {/* Espacio antes del Total */}
                <tr style={{ height: '24px' }}>
                  <td colSpan={6} className="border-0"></td>
                </tr>

                {/* Fila de TOTAL [BS] */}
                <tr>
                  <td 
                    colSpan={2} 
                    className="border border-gray-400 px-4 py-2 text-right font-black text-sm"
                    style={{ backgroundColor: '#FABF8F', verticalAlign: 'middle' }}
                  >
                    TOTAL [BS]
                  </td>
                  <td 
                    className="border border-gray-400 px-4 py-2 text-center font-bold text-sm bg-white"
                    style={{ verticalAlign: 'middle' }}
                  >
                    {formatCurrency(calculateTotal())}
                  </td>
                  <td colSpan={3} className="border-0 bg-transparent"></td>
                </tr>
               </tbody>
             </table>
           </div>
         </div>

        {/* Modal para añadir ítem */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96 border border-gray-200">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Añadir Ítem Adicional</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del ítem</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="Ej: RECARGO POR TRABAJO NOCTURNO"
                    value={newItem.pieza}
                    onChange={(e) => setNewItem(prev => ({ ...prev, pieza: e.target.value.toUpperCase() }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="0,00"
                    value={newItem.valor}
                    onChange={(e) => setNewItem(prev => ({ ...prev, valor: e.target.value }))}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleAddItem}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-bold shadow-md transition-all active:scale-95"
                >
                  Añadir Ítem
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="mt-8 flex gap-4">
          <button 
            onClick={exportToPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exportar a PDF
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Guardar Datos
          </button>
        </div>
      </div>
    </div>
  )
}
