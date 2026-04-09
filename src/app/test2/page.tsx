'use client'

import React, { useState } from 'react'

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
        <div className="bg-white shadow-lg inline-block">
          
          
          {/* Primera Tabla */}
          <div className="overflow-auto">
            <table className="w-auto" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', tableLayout: 'auto' }}>
              <thead>
                <tr className="border-b border-gray-400" style={{ backgroundColor: '#FABF8F' }}>
                  <th className="border border-gray-800 px-2 py-2 text-center font-black whitespace-nowrap" colSpan={6}>TABLA DE PRECIOS PARA TALLERES AUTORIZADOS</th>
                </tr>
                <tr className="border-b border-gray-400" style={{ backgroundColor: '#FABF8F' }}>
                  <th className="border border-gray-800 px-2 py-2 text-left font-semibold whitespace-nowrap" colSpan={6}>ASEGURADO:</th>
                </tr>
                <tr className="border-b border-gray-400" style={{ backgroundColor: '#FABF8F' }}>
                  <th className="border border-gray-800 px-2 py-2 text-left font-semibold whitespace-nowrap" colSpan={2}>VEHÍCULO D.P.:</th>
                  <th className="border border-gray-800 px-2 py-2 text-left font-semibold whitespace-nowrap" colSpan={2}>MARCA:</th>
                  <th className="border border-gray-800 px-2 py-2 text-left font-semibold whitespace-nowrap" colSpan={2}>PLACA:</th>
                </tr>
                <tr className="border-b border-gray-400" style={{ backgroundColor: '#FABF8F' }}>
                  <th className="border border-gray-800 px-2 py-2 text-left font-semibold whitespace-nowrap" colSpan={2}>VEHÍCULO R.C.:</th>
                  <th className="border border-gray-800 px-2 py-2 text-left font-semibold whitespace-nowrap" colSpan={2}>MARCA:</th>
                  <th className="border border-gray-800 px-2 py-2 text-left font-semibold whitespace-nowrap" colSpan={2}>PLACA:</th>
                </tr>
                <tr className="border-b border-gray-800" style={{ backgroundColor: '#FABF8F' }}>
                  <th className="border border-gray-800 px-2 py-2 text-center font-semibold whitespace-nowrap">No.</th>
                  <th className="border border-gray-800 px-2 py-2 text-left font-semibold whitespace-nowrap">PIEZA</th>
                  <th className="border border-gray-800 px-2 py-2 text-center font-semibold whitespace-nowrap">TENTATIVA 1</th>
                  <th className="border border-gray-800 px-2 py-2 text-center font-semibold whitespace-nowrap">TENTATIVA 2</th>
                  <th className="border border-gray-800 px-2 py-2 text-center font-semibold whitespace-nowrap">TENTATIVA 3</th>
                  <th className="border border-gray-800 px-2 py-2 text-center font-semibold whitespace-nowrap">RECONSTRUCCIÓN</th>
                </tr>
              </thead>
              <tbody>
                {tablaDatos.map((item, index) => (
                  <tr key={`${item.no}-${index}`} className="border border-gray-800" style={{ height: 'auto', minHeight: '20px' }}>
                    <td className="border border-gray-800 px-2 py-1 text-center whitespace-nowrap">{item.no}</td>
                    <td className="border border-gray-800 px-2 py-1 whitespace-nowrap">{item.pieza}</td>
                    <td 
                      className={`border border-gray-800 px-2 py-1 text-center cursor-pointer whitespace-nowrap ${
                        selectedCells.has(`${index}-t1`) ? 'bg-yellow-200' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => toggleCell(index, 't1')}
                    >
                      {formatCurrency(item.t1)}
                    </td>
                    <td 
                      className={`border border-gray-800 px-2 py-1 text-center cursor-pointer whitespace-nowrap ${
                        selectedCells.has(`${index}-t2`) ? 'bg-yellow-200' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => toggleCell(index, 't2')}
                    >
                      {formatCurrency(item.t2)}
                    </td>
                    <td 
                      className={`border border-gray-800 px-2 py-1 text-center cursor-pointer whitespace-nowrap ${
                        selectedCells.has(`${index}-t3`) ? 'bg-yellow-200' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => toggleCell(index, 't3')}
                    >
                      {formatCurrency(item.t3)}
                    </td>
                    <td 
                      className={`border border-gray-800 px-2 py-1 text-center cursor-pointer whitespace-nowrap ${
                        selectedCells.has(`${index}-reconstrucción`) ? 'bg-yellow-200' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => toggleCell(index, 'reconstrucción')}
                    >
                      {formatCurrency(item.reconstrucción)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Espacio equivalente al alto de una fila */}
          <div style={{ height: '24px' }}></div>

          {/* Segunda Tabla (Idéntica pero sin cabeceras redundantes) */}
          <div className="overflow-auto">
            <table className="w-auto" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', tableLayout: 'auto' }}>
              <thead>
                <tr className="border-b border-gray-800" style={{ backgroundColor: '#FABF8F' }}>
                  <th className="border border-gray-800 px-2 py-2 text-center font-semibold whitespace-nowrap">No.</th>
                  <th className="border border-gray-800 px-2 py-2 text-left font-semibold whitespace-nowrap">PIEZA</th>
                  <th className="border border-gray-800 px-2 py-2 text-center font-semibold whitespace-nowrap">TENTATIVA 1</th>
                  <th className="border border-gray-800 px-2 py-2 text-center font-semibold whitespace-nowrap">TENTATIVA 2</th>
                  <th className="border border-gray-800 px-2 py-2 text-center font-semibold whitespace-nowrap">TENTATIVA 3</th>
                  <th className="border border-gray-800 px-2 py-2 text-center font-semibold whitespace-nowrap">RECONSTRUCCIÓN</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-gray-800" style={{ height: 'auto', minHeight: '20px' }}>
                  <td className="border border-gray-800 px-2 py-1 text-center whitespace-nowrap">30</td>
                  <td className="border border-gray-800 px-2 py-1 whitespace-nowrap">SERVICIO DE RAMPLA</td>
                  <td 
                    className={`border border-gray-800 px-2 py-1 text-center cursor-pointer whitespace-nowrap ${
                      selectedCells.has(`rampla-t1`) ? 'bg-yellow-200' : 'hover:bg-gray-100'
                    }`}
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
                    className={`border border-gray-800 px-2 py-1 text-center cursor-pointer whitespace-nowrap ${
                      selectedCells.has(`rampla-t2`) ? 'bg-yellow-200' : 'hover:bg-gray-100'
                    }`}
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
                    className={`border border-gray-800 px-2 py-1 text-center cursor-pointer whitespace-nowrap ${
                      selectedCells.has(`rampla-t3`) ? 'bg-yellow-200' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      const newSelected = new Set(selectedCells)
                      if (newSelected.has('rampla-t3')) newSelected.delete('rampla-t3')
                      else newSelected.add('rampla-t3')
                      setSelectedCells(newSelected)
                    }}
                  >
                    {formatCurrency(1392.00)}
                  </td>
                  <td className="border border-gray-800 px-2 py-1 text-center whitespace-nowrap">-</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Espacio equivalente al alto de una fila */}
          <div style={{ height: '24px' }}></div>

          {/* Tercera Tabla (Igual a la segunda) */}
          <div className="overflow-auto">
            <table className="w-auto" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', tableLayout: 'auto' }}>
              <thead>
                <tr className="border-b border-gray-800" style={{ backgroundColor: '#FABF8F' }}>
                  <th className="border border-gray-800 px-2 py-2 text-center font-semibold whitespace-nowrap">No.</th>
                  <th className="border border-gray-800 px-2 py-2 text-left font-semibold whitespace-nowrap">PIEZA</th>
                  <th className="border border-gray-800 px-2 py-2 text-center font-semibold whitespace-nowrap">TENTATIVA 1</th>
                  <th className="border border-gray-800 px-2 py-2 text-center font-semibold whitespace-nowrap">TENTATIVA 2</th>
                  <th className="border border-gray-800 px-2 py-2 text-center font-semibold whitespace-nowrap">TENTATIVA 3</th>
                  <th className="border border-gray-800 px-2 py-2 text-center font-semibold whitespace-nowrap">RECONSTRUCCIÓN</th>
                </tr>
              </thead>
              <tbody>
                 {tabla3Datos.map((item, index) => (
                   <tr key={`table3-${item.no}-${index}`} className="border border-gray-800" style={{ height: 'auto', minHeight: '20px' }}>
                     <td className="border border-gray-800 px-2 py-1 text-center whitespace-nowrap">{item.no}</td>
                     <td className="border border-gray-800 px-2 py-1 whitespace-nowrap">{item.pieza}</td>
                     <td 
                       className={`border border-gray-800 px-2 py-1 text-center cursor-pointer whitespace-nowrap ${
                         selectedCells.has(`t3-${index}-t1`) ? 'bg-yellow-200' : 'hover:bg-gray-100'
                       }`}
                       onClick={() => {
                         const newSelected = new Set(selectedCells)
                         if (newSelected.has(`t3-${index}-t1`)) newSelected.delete(`t3-${index}-t1`)
                         else newSelected.add(`t3-${index}-t1`)
                         setSelectedCells(newSelected)
                       }}
                     >
                       {formatCurrency(item.t1)}
                     </td>
                     <td className="border border-gray-800 px-2 py-1 text-center whitespace-nowrap">-</td>
                     <td className="border border-gray-800 px-2 py-1 text-center whitespace-nowrap">-</td>
                     <td className="border border-gray-800 px-2 py-1 text-center whitespace-nowrap">-</td>
                   </tr>
                 ))}
               </tbody>
            </table>
          </div>

                  </div>

        {/* Botones de acción */}
        <div className="mt-4 flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
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
