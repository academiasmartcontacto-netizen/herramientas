import pandas as pd

# Leer el archivo Excel
df = pd.read_excel('Templates/TABLA A - CONVENIO.xlsm', sheet_name='TABLA A')

print('=== COMPARACIÓN DE DATOS EXCEL vs NEXT.JS ===')
print('Filas con valores en Excel:')

# Comparar filas que tienen valores
for i, row in df.iterrows():
    if not pd.isna(row.iloc[1]) and not pd.isna(row.iloc[2]) and not pd.isna(row.iloc[3]) and not pd.isna(row.iloc[4]):
        print(f'Fila {int(row.iloc[0])}: {row.iloc[1]} - T1:{row.iloc[2]} T2:{row.iloc[3]} T3:{row.iloc[4]}')

print('\n=== DATOS DE LA APLICACIÓN NEXT.JS ===')
print('Verificando primeras 40 filas:')

# Datos de la aplicación Next.js (primeras 40 filas)
nextjs_datos = [
    {'no': 1, 'pieza': "CAPOT (ESTRUCTURA EXTERNA E INTERNA)", 't1': 556.80, 't2': 696.00, 't3': 835.20, 'reconstrucción': 1670.40},
    {'no': 2, 'pieza': "GUARDABARROS DELANTEROS", 't1': 348.00, 't2': 487.20, 't3': 626.40, 'reconstrucción': 1252.80},
    {'no': 3, 'pieza': "GUARDABARROS TRASEROS", 't1': 348.00, 't2': 487.20, 't3': 696.00, 'reconstrucción': 1252.80},
    {'no': 4, 'pieza': "PUERTAS DELANTERAS", 't1': 348.00, 't2': 487.20, 't3': 696.00, 'reconstrucción': 1252.80},
    {'no': 5, 'pieza': "PUERTAS TRASERAS", 't1': 348.00, 't2': 487.20, 't3': 696.00, 'reconstrucción': 1252.80},
    {'no': 6, 'pieza': "LATERALES TRASEROS (VAGONETAS)", 't1': 348.00, 't2': 487.20, 't3': 765.60, 'reconstrucción': 1531.20},
    {'no': 7, 'pieza': "LATERALES DE CARROCERÍA (CAMIONETA)", 't1': 556.80, 't2': 696.00, 't3': 904.80, 'reconstrucción': 1531.20},
    {'no': 8, 'pieza': "TECHO", 't1': 626.40, 't2': 765.60, 't3': 1113.60, 'reconstrucción': 1740.00},
    {'no': 9, 'pieza': "TAPA DE MALETERO (VGTA.-AUTO)", 't1': 348.00, 't2': 487.20, 't3': 626.40, 'reconstrucción': 1252.80},
    {'no': 10, 'pieza': "COMPUERTA TRASERA DE CARROCERÍA (CMTA)", 't1': 348.00, 't2': 417.60, 't3': 556.80, 'reconstrucción': 1252.80},
    {'no': 11, 'pieza': "PARACHOQUE DELANTERO", 't1': 348.00, 't2': 487.20, 't3': 626.40, 'reconstrucción': 1252.80},
    {'no': 12, 'pieza': "PARACHOQUE TRASERO", 't1': 348.00, 't2': 487.20, 't3': 626.40, 'reconstrucción': 1252.80},
    {'no': 13, 'pieza': "SPOILER DE PARACHOQUE", 't1': 208.80, 't2': 278.40, 't3': 348.00, 'reconstrucción': 0},
    {'no': 14, 'pieza': "PARRILLA DELANTERA", 't1': 208.80, 't2': 278.40, 't3': 348.00, 'reconstrucción': 0},
    {'no': 15, 'pieza': "LUNETA DELANTERA", 't1': 208.80, 't2': 278.40, 't3': 348.00, 'reconstrucción': 0},
    {'no': 16, 'pieza': "LUNETA TRASERA", 't1': 208.80, 't2': 278.40, 't3': 348.00, 'reconstrucción': 0},
    {'no': 17, 'pieza': "FAROS DELANTEROS", 't1': 208.80, 't2': 278.40, 't3': 348.00, 'reconstrucción': 0},
    {'no': 18, 'pieza': "FAROS TRASEROS", 't1': 208.80, 't2': 278.40, 't3': 348.00, 'reconstrucción': 0},
    {'no': 19, 'pieza': "BUCHERAS DELANTERAS", 't1': 174.00, 't2': 257.52, 't3': 348.00, 'reconstrucción': 0},
    {'no': 20, 'pieza': "BUCHERAS TRASERAS", 't1': 174.00, 't2': 257.52, 't3': 348.00, 'reconstrucción': 0},
    {'no': 21, 'pieza': "MOLDURAS DE PUERTAS DELANTERAS", 't1': 174.00, 't2': 257.52, 't3': 348.00, 'reconstrucción': 0},
    {'no': 22, 'pieza': "MOLDURAS DE PUERTAS TRASERAS", 't1': 174.00, 't2': 257.52, 't3': 348.00, 'reconstrucción': 0},
    {'no': 23, 'pieza': "MARCO DE RADIADOR", 't1': 208.80, 't2': 313.20, 't3': 417.60, 'reconstrucción': 0},
    {'no': 24, 'pieza': "MARCO INFERIOR DE MÁSCARA", 't1': 208.80, 't2': 313.20, 't3': 417.60, 'reconstrucción': 0},
    {'no': 25, 'pieza': "PARANTES (DE PUERTA, PARABRISA, TRASERO)", 't1': 208.80, 't2': 313.20, 't3': 417.60, 'reconstrucción': 0},
    {'no': 26, 'pieza': "REJILLA INFERIOR DE PARABRISAS", 't1': 139.20, 't2': 174.00, 't3': 278.40, 'reconstrucción': 0},
    {'no': 27, 'pieza': "ZÓCALO", 't1': 208.80, 't2': 313.20, 't3': 487.20, 'reconstrucción': 0},
    {'no': 28, 'pieza': "INTERIOR DE GUARDABARROS", 't1': 208.80, 't2': 278.40, 't3': 417.60, 'reconstrucción': 0},
    {'no': 29, 'pieza': "TAPA DE TANQUE", 't1': 69.60, 't2': 104.40, 't3': 139.20, 'reconstrucción': 0},
    {'no': 30, 'pieza': "PISADERAS", 't1': 208.80, 't2': 278.40, 't3': 348.00, 'reconstrucción': 0},
    {'no': 31, 'pieza': "PISO DE CARROCERÍA", 't1': 313.20, 't2': 417.60, 't3': 556.80, 'reconstrucción': 0},
    {'no': 32, 'pieza': "SERVICIO DE RAMPLA", 't1': 696.00, 't2': 1044.00, 't3': 1392.00, 'reconstrucción': 0},
    {'no': 33, 'pieza': "PINTADO DE ESPEJOS", 't1': 139.20, 't2': 0, 't3': 0, 'reconstrucción': 0},
    {'no': 34, 'pieza': "INSTALADO DE RADIO", 't1': 69.60, 't2': 0, 't3': 0, 'reconstrucción': 0},
    {'no': 35, 'pieza': "INSTALADO DE ESPEJO ELÉCTRICO", 't1': 69.60, 't2': 0, 't3': 0, 'reconstrucción': 0},
    {'no': 36, 'pieza': "INSTALADO DE PARABRISAS (CON GOMA)", 't1': 208.80, 't2': 0, 't3': 0, 'reconstrucción': 0},
    {'no': 37, 'pieza': "INSTALADO DE PARABRISAS (CON SELLADOR)", 't1': 487.20, 't2': 0, 't3': 0, 'reconstrucción': 0},
    {'no': 38, 'pieza': "INSTALADO DE VIDRIO DE PUERTAS", 't1': 139.20, 't2': 0, 't3': 0, 'reconstrucción': 0},
    {'no': 39, 'pieza': "INSTALADO DE VIDRIO DE COMPUERTA TRASERA (CON GOMA)", 't1': 348.00, 't2': 0, 't3': 0, 'reconstrucción': 0},
    {'no': 40, 'pieza': "INSTALADO DE VIDRIO LATERAL TRASERO (CON GOMA)", 't1': 139.20, 't2': 0, 't3': 0, 'reconstrucción': 0}
]

# Comparar cada fila
coincidencias = 0
diferencias = []

for i, nextjs_row in enumerate(nextjs_datos, 1):
    # Buscar fila correspondiente en Excel
    excel_row = None
    for _, row in df.iterrows():
        if int(row.iloc[0]) == nextjs_row['no']:
            excel_row = row
            break
    
    if excel_row is not None:
        # Comparar valores
        coincidencia = True
        for campo in ['t1', 't2', 't3', 'reconstrucción']:
            if abs(float(excel_row.iloc[2]) - nextjs_row[campo]) > 0.01:  # Tolerancia pequeña
                coincidencia = False
        
        if coincidencia:
            coincidencias += 1
            print(f'✅ Fila {i}: COINCIDE - {nextjs_row["pieza"]}')
        else:
            diferencias.append(f'Fila {i}: DIFIERE - {nextjs_row["pieza"]}')
            print(f'  Excel: T1={excel_row.iloc[2]} T2={excel_row.iloc[3]} T3={excel_row.iloc[4]}')
            print(f'  Next.js: T1={nextjs_row[campo]} T2={nextjs_row[campo]} T3={nextjs_row[campo]}')

print(f'\n=== RESUMEN ===')
print(f'Filas coincidentes: {coincidencias}/40')
print(f'Filas con diferencias: {len(diferencias)}')

if diferencias:
    print('\nDIFERENCIAS ENCONTRADAS:')
    for diff in diferencias:
        print(f'  {diff}')

if coincidencias == 40:
    print('\n✅ TODAS LAS FILAS COINCIDEN PERFECTAMENTE')
else:
    print(f'\n⚠️  HAY {40-coincidencias} FILAS CON DIFERENCIAS')
