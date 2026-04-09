'use client'

import React, { useState, useMemo, useEffect } from 'react'

interface PiezaData {
  no: number
  pieza: string
  t1: number
  t2: number
  t3: number
  reconstrucción: number
  isDuplicate?: boolean
  originalNo?: number
  originalPieza?: string
  side?: 'LH' | 'RH' | ''
  isCustom?: boolean
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

export default function TablaPreciosSimple() {
  const [formData, setFormData] = useState<FormData>({
    asegurado: '',
    vehiculo_dp: '',
    marca_dp: '',
    placa_dp: ''
  })
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set())
  const [dynamicData, setDynamicData] = useState<PiezaData[]>(tablaDatos)
  const [activeMenu, setActiveMenu] = useState<number | null>(null)
  const [customItems, setCustomItems] = useState<PiezaData[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCustomItem, setNewCustomItem] = useState({
    pieza: '',
    t1: ''
  })

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

  // Piezas que pueden tener duplicación LH/RH
  const piecesWithSides = [
    'GUARDABARROS DELANTEROS',
    'GUARDABARROS TRASEROS',
    'PUERTAS DELANTERAS',
    'PUERTAS TRASERAS',
    'MOLDURAS DE PUERTAS DELANTERAS',
    'MOLDURAS DE PUERTAS TRASERAS',
    'BUCHERAS DELANTERAS',
    'BUCHERAS TRASERAS',
    'PUNTERAS DELANTERAS',
    'PUNTERAS TRASERAS'
  ]

  const canDuplicate = (pieza: string) => {
    return piecesWithSides.some(piece => pieza.includes(piece))
  }

  const duplicateAsLHRH = (index: number) => {
    const allData = getAllData()
    const item = allData[index]
    
    // Verificar si es una fila de dynamicData (no personalizada)
    if (item.isCustom || !canDuplicate(item.pieza)) return

    const newDynamicData = [...dynamicData]
    const originalPiezaName = item.pieza
    
    // Modificar la fila original a LH
    newDynamicData[index] = {
      ...item,
      pieza: `${item.pieza} LH`,
      side: 'LH',
      isDuplicate: true,
      originalPieza: originalPiezaName
    }

    // Crear la fila duplicada RH
    const rhItem: PiezaData = {
      ...item,
      pieza: `${item.pieza} RH`,
      side: 'RH',
      isDuplicate: true,
      originalNo: item.no,
      originalPieza: originalPiezaName
    }

    // Insertar la nueva fila después de la original
    newDynamicData.splice(index + 1, 0, rhItem)

    setDynamicData(newDynamicData)
    setActiveMenu(null)
  }

  const restoreDuplicate = (index: number) => {
    const item = dynamicData[index]
    if (!item.isDuplicate || !item.originalPieza) return

    const newDynamicData = [...dynamicData]
    
    // Buscar la fila duplicada correspondiente (LH o RH)
    let duplicateIndex = -1
    for (let i = 0; i < newDynamicData.length; i++) {
      if (i !== index && 
          newDynamicData[i].isDuplicate && 
          newDynamicData[i].originalPieza === item.originalPieza) {
        duplicateIndex = i
        break
      }
    }

    if (duplicateIndex !== -1) {
      // Guardar las selecciones actuales antes de modificar
      const currentSelections = new Set(selectedCells)
      const newSelections = new Set<string>()
      
      // Eliminar ambas filas duplicadas
      const indicesToRemove = [index, duplicateIndex].sort((a, b) => b - a) // Ordenar descendente para eliminar
      
      indicesToRemove.forEach(i => {
        newDynamicData.splice(i, 1)
      })

      // Crear la fila original restaurada
      const originalItem: PiezaData = {
        ...item,
        pieza: item.originalPieza,
        isDuplicate: false,
        originalNo: undefined,
        originalPieza: undefined,
        side: ''
      }

      // Insertar la fila original en la posición de la primera eliminada
      const insertIndex = Math.min(index, duplicateIndex)
      newDynamicData.splice(insertIndex, 0, originalItem)

      // Renumerar TODAS las filas consecutivamente
      newDynamicData.forEach((item, i) => {
        item.no = i + 1
      })

      // Actualizar las selecciones para que coincidan con las nuevas posiciones
      currentSelections.forEach(cellKey => {
        const [oldIndex, column] = cellKey.split('-')
        const oldIndexNum = parseInt(oldIndex)
        
        // Calcular el nuevo índice basado en las eliminaciones e inserción
        let newIndex = oldIndexNum
        
        if (oldIndexNum > Math.max(index, duplicateIndex)) {
          // Si el índice estaba después de ambas filas eliminadas, se mueve 2 posiciones hacia arriba
          newIndex = oldIndexNum - 2
        } else if (oldIndexNum > Math.min(index, duplicateIndex) && oldIndexNum <= Math.max(index, duplicateIndex)) {
          // Si el índice estaba entre las filas eliminadas, se mueve 1 posición hacia arriba
          newIndex = oldIndexNum - 1
        }
        
        // Si el índice corresponde a una de las filas eliminadas, no se mantiene la selección
        if (oldIndexNum !== index && oldIndexNum !== duplicateIndex) {
          newSelections.add(`${newIndex}-${column}`)
        }
      })

      setDynamicData(newDynamicData)
      setSelectedCells(newSelections)
    }
    
    setActiveMenu(null)
  }

  const getAllData = () => {
    return [...dynamicData, ...customItems]
  }

  const filteredData = useMemo(() => {
    const allData = getAllData()
    if (!searchTerm) return allData
    return allData.filter(item => 
      item.pieza.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.no.toString().includes(searchTerm)
    )
  }, [searchTerm, dynamicData, customItems])

  const stats = useMemo(() => {
    let piezasSeleccionadas = 0
    let sumatoria = 0

    selectedCells.forEach(cellKey => {
      const [rowIndex, column] = cellKey.split('-')
      const allData = getAllData()
      const item = allData[parseInt(rowIndex)]
      
      if (column === 't1') sumatoria += item.t1
      else if (column === 't2') sumatoria += item.t2
      else if (column === 't3') sumatoria += item.t3
      else if (column === 'reconstrucción') sumatoria += item.reconstrucción
      
      piezasSeleccionadas++
    })

    return { piezasSeleccionadas, sumatoria }
  }, [selectedCells, dynamicData, customItems])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    }).format(amount)
  }

  const exportToPDF = () => {
    alert('Función de exportación a PDF en desarrollo')
  }

  const saveData = () => {
    alert('Datos guardados exitosamente')
  }

  // Funciones para gestionar filas personalizadas
  const handleCustomItemChange = (field: string, value: string) => {
    // Si es el campo de valor, solo permitir números y coma
    if (field === 't1') {
      // Eliminar todo excepto números y coma
      const sanitizedValue = value.replace(/[^0-9,]/g, '')
      setNewCustomItem(prev => ({ ...prev, [field]: sanitizedValue }))
    } else if (field === 'pieza') {
      // Convertir a mayúsculas el campo de descripción
      setNewCustomItem(prev => ({ ...prev, [field]: value.toUpperCase() }))
    } else {
      setNewCustomItem(prev => ({ ...prev, [field]: value }))
    }
  }

  const addCustomItem = () => {
    // Validar que los campos estén completos
    if (!newCustomItem.pieza || !newCustomItem.t1) {
      alert('Por favor, complete todos los campos')
      return
    }

    // Validar que el valor sea un número válido (solo coma como decimal)
    const t1Value = newCustomItem.t1.replace(',', '.')
    const t1 = parseFloat(t1Value)

    if (isNaN(t1)) {
      alert('Por favor, ingrese un valor numérico válido')
      return
    }

    const customItem: PiezaData = {
      no: 0, // No importa, el número se muestra con index + 1
      pieza: newCustomItem.pieza.toUpperCase(),
      t1,
      t2: 0, // Valores en 0 para las otras columnas
      t3: 0,
      reconstrucción: 0,
      isCustom: true
    }

    setCustomItems(prev => [...prev, customItem])
    setNewCustomItem({
      pieza: '',
      t1: ''
    })
    setShowAddForm(false)
  }

  const removeCustomItem = (index: number) => {
    setCustomItems(prev => prev.filter((_, i) => i !== index))
    
    // Limpiar solo las selecciones de la fila eliminada
    const newSelections = new Set(selectedCells)
    const actualIndex = dynamicData.length + index
    
    // Eliminar selecciones de la fila eliminada
    newSelections.forEach(cellKey => {
      const [rowIndex] = cellKey.split('-')
      if (parseInt(rowIndex) === actualIndex) {
        newSelections.delete(cellKey)
      }
    })
    
    // Reajustar los índices de las selecciones restantes
    const adjustedSelections = new Set<string>()
    newSelections.forEach(cellKey => {
      const [rowIndex, column] = cellKey.split('-')
      const oldIndex = parseInt(rowIndex)
      
      if (oldIndex > actualIndex) {
        // Las filas después de la eliminada se mueven hacia arriba
        adjustedSelections.add(`${oldIndex - 1}-${column}`)
      } else if (oldIndex < actualIndex) {
        // Las filas antes de la eliminada mantienen su índice
        adjustedSelections.add(cellKey)
      }
    })
    
    setSelectedCells(adjustedSelections)
  }

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.action-menu-container') && activeMenu !== null) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [activeMenu])

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="bg-blue-900 text-white p-8 text-center">
        <h1 className="text-4xl font-bold mb-2">
          TABLA DE PRECIOS PARA TALLERES AUTORIZADOS
        </h1>
        <div className="text-xl opacity-90">CATEGORÍA A | 2014 - 2021</div>
      </div>

      <div className="bg-gray-100 p-6 border-b-2 border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
            <label className="font-bold text-gray-800 mb-2 block">
              ASEGURADO:
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
            <label className="font-bold text-gray-800 mb-2 block">
              VEHÍCULO D.P.:
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
            <label className="font-bold text-gray-800 mb-2 block">
              MARCA:
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
            <label className="font-bold text-gray-800 mb-2 block">
              PLACA:
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

      <div className="p-6 bg-white border-b border-gray-300">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
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

      <div className="p-6 overflow-x-visible">
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
                <td className="p-3 text-center font-semibold border border-blue-900">{index + 1}</td>
                <td className="p-3 text-left font-medium border border-blue-900">
                  {item.isDuplicate ? (
                    <>
                      {item.pieza.split(' ').slice(0, -1).join(' ')}{' '}
                      <span style={{ color: '#0071E3', fontWeight: 'bold' }}>
                        {item.pieza.split(' ').slice(-1)[0]}
                      </span>
                    </>
                  ) : item.isCustom ? (
                    <span style={{ color: '#0071E3', fontWeight: 'bold' }}>{item.pieza}</span>
                  ) : (
                    item.pieza
                  )}
                </td>
                <td 
                  className={`p-3 text-center cursor-default select-none border border-blue-900 ${
                    selectedCells.has(`${index}-t1`) ? 'bg-yellow-300' : 'hover:bg-gray-100'
                  }`}
                  onDoubleClick={() => handleCellDoubleClick(index, 't1')}
                >
                  {formatCurrency(item.t1)}
                </td>
                <td 
                  className={`p-3 text-center cursor-default select-none border border-blue-900 ${
                    selectedCells.has(`${index}-t2`) ? 'bg-yellow-300' : 'hover:bg-gray-100'
                  }`}
                  onDoubleClick={() => handleCellDoubleClick(index, 't2')}
                >
                  {formatCurrency(item.t2)}
                </td>
                <td 
                  className={`p-3 text-center cursor-default select-none border border-blue-900 ${
                    selectedCells.has(`${index}-t3`) ? 'bg-yellow-300' : 'hover:bg-gray-100'
                  }`}
                  onDoubleClick={() => handleCellDoubleClick(index, 't3')}
                >
                  {formatCurrency(item.t3)}
                </td>
                <td 
                  className={`p-3 text-center cursor-default select-none border border-blue-900 ${
                    selectedCells.has(`${index}-reconstrucción`) ? 'bg-yellow-300' : 'hover:bg-gray-100'
                  }`}
                  onDoubleClick={() => handleCellDoubleClick(index, 'reconstrucción')}
                >
                  {formatCurrency(item.reconstrucción)}
                </td>
                <td className="p-3 text-center border border-blue-900 relative">
                  <div className="flex justify-center items-center action-menu-container">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveMenu(activeMenu === index ? null : index)
                      }}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      title="Más acciones"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                      </svg>
                    </button>
                    
                    {activeMenu === index && (
                      <div 
                        className="absolute right-0 top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl z-50 min-w-[150px]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.isCustom && (
                          <button
                            onClick={() => removeCustomItem(index - dynamicData.length)}
                            className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 text-sm flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Eliminar
                          </button>
                        )}
                        {canDuplicate(item.pieza) && !item.isDuplicate && !item.isCustom && (
                          <button
                            onClick={() => duplicateAsLHRH(index)}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Duplicar LH/RH
                          </button>
                        )}
                        {item.isDuplicate && (
                          <button
                            onClick={() => restoreDuplicate(index)}
                            className="w-full text-left px-3 py-2 hover:bg-green-50 text-green-600 text-sm flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Restaurar
                          </button>
                        )}
                        <button
                          onClick={() => setActiveMenu(null)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm text-gray-500"
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 flex justify-end">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2 shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Añadir
        </button>
      </div>

      {showAddForm && (
        <div className="px-6 pb-6">
          <div className="bg-white rounded-xl shadow-xl p-6 border border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <input
                  type="text"
                  value={newCustomItem.pieza}
                  onChange={(e) => handleCustomItemChange('pieza', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Descripción de la pieza"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={newCustomItem.t1}
                  onChange={(e) => handleCustomItemChange('t1', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Valor (ej: 1500,50)"
                />
              </div>
              <div className="md:col-span-3">
                <button
                  onClick={addCustomItem}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Agregar Ítem
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

      <div className="p-6 bg-gray-100 flex flex-wrap justify-center gap-4">
        <button 
          onClick={exportToPDF}
          className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Exportar a PDF
        </button>
        <button 
          onClick={saveData}
          className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Guardar Datos
        </button>
      </div>
    </div>
  )
}
