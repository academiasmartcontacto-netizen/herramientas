'use client'

import React, { useState, useEffect, useMemo } from 'react'

interface PiezaData {
  no: number
  pieza: string
  t1: number
  t2: number
  t3: number
  reconstrucción: number
}

interface FormData {
  asegurado: string
  vehiculo_dp: string
  marca_dp: string
  placa_dp: string
}

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
  {no: 14, pieza: "PARRILLA DELANTERA", t1: 208.80, t2: 278.40, t3: 348.00, reconstrucción: 0},
  {no: 15, pieza: "LUNETA DELANTERA", t1: 208.80, t2: 278.40, t3: 348.00, reconstrucción: 0},
  {no: 16, pieza: "LUNETA TRASERA", t1: 208.80, t2: 278.40, t3: 348.00, reconstrucción: 0},
  {no: 17, pieza: "FAROS DELANTEROS", t1: 208.80, t2: 278.40, t3: 348.00, reconstrucción: 0},
  {no: 18, pieza: "FAROS TRASEROS", t1: 208.80, t2: 278.40, t3: 348.00, reconstrucción: 0},
  {no: 19, pieza: "BUCHERAS DELANTERAS", t1: 174.00, t2: 257.52, t3: 348.00, reconstrucción: 0},
  {no: 20, pieza: "BUCHERAS TRASERAS", t1: 174.00, t2: 257.52, t3: 348.00, reconstrucción: 0},
  {no: 21, pieza: "MOLDURAS DE PUERTAS DELANTERAS", t1: 174.00, t2: 257.52, t3: 348.00, reconstrucción: 0},
  {no: 22, pieza: "MOLDURAS DE PUERTAS TRASERAS", t1: 174.00, t2: 257.52, t3: 348.00, reconstrucción: 0},
  {no: 23, pieza: "MARCO DE RADIADOR", t1: 208.80, t2: 313.20, t3: 417.60, reconstrucción: 0},
  {no: 24, pieza: "MARCO INFERIOR DE MÁSCARA", t1: 208.80, t2: 313.20, t3: 417.60, reconstrucción: 0},
  {no: 25, pieza: "PARANTES (DE PUERTA, PARABRISA, TRASERO)", t1: 208.80, t2: 313.20, t3: 417.60, reconstrucción: 0},
  {no: 26, pieza: "REJILLA INFERIOR DE PARABRISAS", t1: 139.20, t2: 174.00, t3: 278.40, reconstrucción: 0},
  {no: 27, pieza: "ZÓCALO", t1: 208.80, t2: 313.20, t3: 487.20, reconstrucción: 0},
  {no: 28, pieza: "INTERIOR DE GUARDABARROS", t1: 208.80, t2: 278.40, t3: 417.60, reconstrucción: 0},
  {no: 29, pieza: "TAPA DE TANQUE", t1: 69.60, t2: 104.40, t3: 139.20, reconstrucción: 0},
  {no: 30, pieza: "PISADERAS", t1: 208.80, t2: 278.40, t3: 348.00, reconstrucción: 0},
  {no: 31, pieza: "PISO DE CARROCERÍA", t1: 313.20, t2: 417.60, t3: 556.80, reconstrucción: 0},
  {no: 32, pieza: "SERVICIO DE RAMPLA", t1: 696.00, t2: 1044.00, t3: 1392.00, reconstrucción: 0},
  {no: 33, pieza: "PINTADO DE ESPEJOS", t1: 139.20, t2: 0, t3: 0, reconstrucción: 0},
  {no: 34, pieza: "INSTALADO DE RADIO", t1: 69.60, t2: 0, t3: 0, reconstrucción: 0},
  {no: 35, pieza: "INSTALADO DE ESPEJO ELÉCTRICO", t1: 69.60, t2: 0, t3: 0, reconstrucción: 0},
  {no: 36, pieza: "INSTALADO DE PARABRISAS (CON GOMA)", t1: 208.80, t2: 0, t3: 0, reconstrucción: 0},
  {no: 37, pieza: "INSTALADO DE PARABRISAS (CON SELLADOR)", t1: 487.20, t2: 0, t3: 0, reconstrucción: 0},
  {no: 38, pieza: "INSTALADO DE VIDRIO DE PUERTAS", t1: 139.20, t2: 0, t3: 0, reconstrucción: 0},
  {no: 39, pieza: "INSTALADO DE VIDRIO DE COMPUERTA TRASERA (CON GOMA)", t1: 348.00, t2: 0, t3: 0, reconstrucción: 0},
  {no: 40, pieza: "INSTALADO DE VIDRIO LATERAL TRASERO (CON GOMA)", t1: 139.20, t2: 0, t3: 0, reconstrucción: 0}
]

export default function TablaPrecios() {
  const [formData, setFormData] = useState<FormData>({
    asegurado: '',
    vehiculo_dp: '',
    marca_dp: '',
    placa_dp: ''
  })
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set())

  // Cargar datos desde localStorage al montar
  useEffect(() => {
    const savedData = localStorage.getItem('tablaConvenioData')
    if (savedData) {
      const data = JSON.parse(savedData)
      setFormData({
        asegurado: data.asegurado || '',
        vehiculo_dp: data.vehiculo_dp || '',
        marca_dp: data.marca_dp || '',
        placa_dp: data.placa_dp || ''
      })
      setSelectedCells(new Set(data.selectedCells || []))
    }
  }, [])

  // Guardar datos en localStorage cuando cambian
  useEffect(() => {
    const data = {
      ...formData,
      selectedCells: Array.from(selectedCells),
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('tablaConvenioData', JSON.stringify(data))
  }, [formData, selectedCells])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCellDoubleClick = (rowIndex: number, column: string) => {
    const cellKey = `${rowIndex}-${column}`
    const newSelectedCells = new Set(selectedCells)
    
    // Eliminar otras celdas seleccionadas en la misma fila
    selectedCells.forEach(key => {
      const [row] = key.split('-')
      if (row === rowIndex.toString() && key !== cellKey) {
        newSelectedCells.delete(key)
      }
    })
    
    // Toggle la celda actual
    if (newSelectedCells.has(cellKey)) {
      newSelectedCells.delete(cellKey)
    } else {
      newSelectedCells.add(cellKey)
    }
    
    setSelectedCells(newSelectedCells)
  }

  const filteredData = useMemo(() => {
    if (!searchTerm) return tablaDatos
    return tablaDatos.filter(item => 
      item.pieza.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.no.toString().includes(searchTerm)
    )
  }, [searchTerm])

  const stats = useMemo(() => {
    let piezasSeleccionadas = 0
    let sumatoria = 0

    selectedCells.forEach(cellKey => {
      const [rowIndex, column] = cellKey.split('-')
      const item = tablaDatos[parseInt(rowIndex)]
      
      if (column === 't1') sumatoria += item.t1
      else if (column === 't2') sumatoria += item.t2
      else if (column === 't3') sumatoria += item.t3
      else if (column === 'reconstrucción') sumatoria += item.reconstrucción
      
      piezasSeleccionadas++
    })

    return { piezasSeleccionadas, sumatoria }
  }, [selectedCells])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const exportToPDF = () => {
    alert('Función de exportación a PDF en desarrollo')
  }

  const saveData = () => {
    const data = {
      ...formData,
      selectedCells: Array.from(selectedCells),
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('tablaConvenioData', JSON.stringify(data))
    alert('Datos guardados exitosamente')
  }

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-blue-900 text-white p-8 text-center">
        <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
          <span className="text-3xl">?</span>
          TABLA DE PRECIOS PARA TALLERES AUTORIZADOS
        </h1>
        <div className="text-xl opacity-90">CATEGORÍA A | 2014 - 2021</div>
      </div>

      {/* Info Section */}
      <div className="bg-gray-100 p-6 border-b-2 border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
            <label className="font-bold text-gray-800 mb-2 block flex items-center gap-2">
              <span className="text-lg">?</span> ASEGURADO:
            </label>
            <input
              type="text"
              name="asegurado"
              value={formData.asegurado}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre del asegurado"
            />
          </div>
          
          <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
            <label className="font-bold text-gray-800 mb-2 block flex items-center gap-2">
              <span className="text-lg">?</span> VEHÍCULO D.P.:
            </label>
            <input
              type="text"
              name="vehiculo_dp"
              value={formData.vehiculo_dp}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Datos del vehículo"
            />
          </div>
          
          <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
            <label className="font-bold text-gray-800 mb-2 block flex items-center gap-2">
              <span className="text-lg">?</span> MARCA:
            </label>
            <input
              type="text"
              name="marca_dp"
              value={formData.marca_dp}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Marca del vehículo"
            />
          </div>
          
          <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
            <label className="font-bold text-gray-800 mb-2 block flex items-center gap-2">
              <span className="text-lg">?</span> PLACA:
            </label>
            <input
              type="text"
              name="placa_dp"
              value={formData.placa_dp}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Placa del vehículo"
            />
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="p-6 bg-white border-b border-gray-300">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">?</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="Buscar piezas..."
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="p-6 overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg border border-blue-900">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-4 text-center font-semibold border border-white">No.</th>
              <th className="p-4 text-center font-semibold border border-white">PIEZA</th>
              <th className="p-4 text-center font-semibold border border-white">TENTATIVA 1</th>
              <th className="p-4 text-center font-semibold border border-white">TENTATIVA 2</th>
              <th className="p-4 text-center font-semibold border border-white">TENTATIVA 3</th>
              <th className="p-4 text-center font-semibold border border-white">RECONSTRUCCIÓN</th>
              <th className="p-4 text-center font-semibold border border-white">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 border border-blue-900">
                <td className="p-3 text-center font-semibold border border-blue-900">{item.no}</td>
                <td className="p-3 text-left font-medium border border-blue-900">{item.pieza}</td>
                <td 
                  className={`p-3 text-center font-semibold cursor-default select-none border border-blue-900 ${
                    selectedCells.has(`${index}-t1`) ? 'bg-yellow-300' : 'hover:bg-gray-100'
                  }`}
                  onDoubleClick={() => handleCellDoubleClick(index, 't1')}
                >
                  {formatCurrency(item.t1)}
                </td>
                <td 
                  className={`p-3 text-center font-semibold cursor-default select-none border border-blue-900 ${
                    selectedCells.has(`${index}-t2`) ? 'bg-yellow-300' : 'hover:bg-gray-100'
                  }`}
                  onDoubleClick={() => handleCellDoubleClick(index, 't2')}
                >
                  {formatCurrency(item.t2)}
                </td>
                <td 
                  className={`p-3 text-center font-semibold cursor-default select-none border border-blue-900 ${
                    selectedCells.has(`${index}-t3`) ? 'bg-yellow-300' : 'hover:bg-gray-100'
                  }`}
                  onDoubleClick={() => handleCellDoubleClick(index, 't3')}
                >
                  {formatCurrency(item.t3)}
                </td>
                <td 
                  className={`p-3 text-center font-semibold cursor-default select-none border border-blue-900 ${
                    selectedCells.has(`${index}-reconstrucción`) ? 'bg-yellow-300' : 'hover:bg-gray-100'
                  }`}
                  onDoubleClick={() => handleCellDoubleClick(index, 'reconstrucción')}
                >
                  {formatCurrency(item.reconstrucción)}
                </td>
                <td className="p-3 text-center border border-blue-900">
                  <span className="text-gray-400 text-sm">Doble clic para seleccionar</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats Section */}
      <div className="p-6 bg-white border-t-2 border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
          <div className="bg-blue-900 text-white text-center p-6 rounded-lg shadow-lg border border-white/10">
            <h3 className="text-3xl font-bold mb-2">{stats.piezasSeleccionadas}</h3>
            <p className="opacity-90 font-medium">Piezas Seleccionadas</p>
          </div>
          <div className="bg-blue-900 text-white text-center p-6 rounded-lg shadow-lg border border-white/10">
            <h3 className="text-3xl font-bold mb-2">{formatCurrency(stats.sumatoria)}</h3>
            <p className="opacity-90 font-medium">Sumatoria</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 bg-gray-100 flex flex-wrap justify-center gap-4">
        <button 
          onClick={exportToPDF}
          className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
        >
          <span className="text-lg">?</span>
          Exportar a PDF
        </button>
        <button 
          onClick={saveData}
          className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
        >
          <span className="text-lg">?</span>
          Guardar Datos
        </button>
      </div>
    </div>
  )
}
