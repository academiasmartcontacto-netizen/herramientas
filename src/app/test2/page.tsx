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
      const [rowIndex, column] = cellKey.split('-')
      const item = tablaDatos[parseInt(rowIndex)]
      if (column === 't1') total += item.t1
      else if (column === 't2') total += item.t2
      else if (column === 't3') total += item.t3
      else if (column === 'reconstrucción') total += item.reconstrucción
    })
    return total
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">TEST 2 - Réplica Exacta del Excel</h1>
        
        {/* Contenedor que simula la hoja de Excel */}
        <div className="bg-white shadow-lg" style={{ width: '100%', maxWidth: '1200px' }}>
          
          
          {/* Tabla - Réplica exacta del Excel */}
          <div className="overflow-auto">
            <table className="w-full" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px' }}>
              <thead>
                <tr className="border-b-2 border-gray-800" style={{ backgroundColor: '#FABF8F' }}>
                  <th className="border border-gray-800 px-2 py-2 text-center font-semibold">No.</th>
                  <th className="border border-gray-800 px-2 py-2 text-left font-semibold">PIEZA</th>
                  <th className="border border-gray-800 px-2 py-2 text-center font-semibold">TENTATIVA 1</th>
                  <th className="border border-gray-800 px-2 py-2 text-center font-semibold">TENTATIVA 2</th>
                  <th className="border border-gray-800 px-2 py-2 text-center font-semibold">TENTATIVA 3</th>
                  <th className="border border-gray-800 px-2 py-2 text-center font-semibold">RECONSTRUCCIÓN</th>
                </tr>
              </thead>
              <tbody>
                {tablaDatos.map((item, index) => (
                  <tr key={item.no} className="border border-gray-800" style={{ height: '20px' }}>
                    <td className="border border-gray-800 px-2 py-1 text-center">{item.no}</td>
                    <td className="border border-gray-800 px-2 py-1">{item.pieza}</td>
                    <td 
                      className={`border border-gray-800 px-2 py-1 text-center cursor-pointer ${
                        selectedCells.has(`${index}-t1`) ? 'bg-yellow-200' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => toggleCell(index, 't1')}
                    >
                      {formatCurrency(item.t1)}
                    </td>
                    <td 
                      className={`border border-gray-800 px-2 py-1 text-center cursor-pointer ${
                        selectedCells.has(`${index}-t2`) ? 'bg-yellow-200' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => toggleCell(index, 't2')}
                    >
                      {formatCurrency(item.t2)}
                    </td>
                    <td 
                      className={`border border-gray-800 px-2 py-1 text-center cursor-pointer ${
                        selectedCells.has(`${index}-t3`) ? 'bg-yellow-200' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => toggleCell(index, 't3')}
                    >
                      {formatCurrency(item.t3)}
                    </td>
                    <td 
                      className={`border border-gray-800 px-2 py-1 text-center cursor-pointer ${
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

          {/* Total - Réplica exacta */}
          <div className="border-t-2 border-gray-800 p-3">
            <div className="text-right text-sm font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>
              TOTAL [BS]: {formatCurrency(calculateTotal())}
            </div>
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
