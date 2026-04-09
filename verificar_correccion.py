import pandas as pd

# Leer el archivo Excel
df = pd.read_excel('Templates/TABLA A - CONVENIO.xlsm', sheet_name='TABLA A')

print('=== VERIFICACIÓN FINAL DESPUÉS DE CORRECCIÓN ===')
print('Filas con valores en Excel:')

# Extraer datos reales del Excel
datos_excel = []
for i in range(6, len(df)):
    row = df.iloc[i]
    if not pd.isna(row.iloc[2]) and str(row.iloc[2]) != 'No.':
        try:
            no = int(float(row.iloc[2]))
            pieza = str(row.iloc[3]) if not pd.isna(row.iloc[3]) else ""
            t1 = float(row.iloc[4]) if not pd.isna(row.iloc[4]) else 0
            t2 = float(row.iloc[5]) if not pd.isna(row.iloc[5]) else 0
            t3 = float(row.iloc[6]) if not pd.isna(row.iloc[6]) else 0
            reconstruccion = float(row.iloc[7]) if not pd.isna(row.iloc[7]) else 0
        except (ValueError, TypeError):
            continue
        
        datos_excel.append({
            'no': no,
            'pieza': pieza,
            't1': t1,
            't2': t2,
            't3': t3,
            'reconstrucción': reconstruccion
        })
        if no <= 40:  # Solo mostrar primeras 40 filas
            print(f'Fila {no}: {pieza} - T1:{t1} T2:{t2} T3:{t3} R:{reconstruccion}')

print('\n=== DATOS CORREGIDOS DE LA APLICACIÓN HTML ===')

# Datos corregidos de la aplicación HTML
html_datos_corregidos = [
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
    {'no': 14, 'pieza': "SOPORTES DE PARACHOQUE", 't1': 174.00, 't2': 278.40, 't3': 348.00, 'reconstrucción': 0},
    {'no': 15, 'pieza': "PUNTERAS DELANTERAS", 't1': 208.80, 't2': 278.40, 't3': 348.00, 'reconstrucción': 0},
    {'no': 16, 'pieza': "PUNTERAS TRASERAS", 't1': 208.80, 't2': 278.40, 't3': 348.00, 'reconstrucción': 0},
    {'no': 17, 'pieza': "BUCHERAS DELANTERAS", 't1': 174.00, 't2': 257.52, 't3': 348.00, 'reconstrucción': 0},
    {'no': 18, 'pieza': "BUCHERAS TRASERAS", 't1': 174.00, 't2': 257.52, 't3': 348.00, 'reconstrucción': 0},
    {'no': 19, 'pieza': "MOLDURAS DE PUERTAS DELANTERAS", 't1': 174.00, 't2': 257.52, 't3': 348.00, 'reconstrucción': 0},
    {'no': 20, 'pieza': "MOLDURAS DE PUERTAS TRASERAS", 't1': 174.00, 't2': 257.52, 't3': 348.00, 'reconstrucción': 0},
    {'no': 21, 'pieza': "MARCO DE RADIADOR", 't1': 208.80, 't2': 313.20, 't3': 417.60, 'reconstrucción': 0},
    {'no': 22, 'pieza': "MARCO INFERIOR DE MÁSCARA", 't1': 208.80, 't2': 313.20, 't3': 417.60, 'reconstrucción': 0},
    {'no': 23, 'pieza': "PARANTES (DE PUERTA, PARABRISA, TRASERO)", 't1': 208.80, 't2': 313.20, 't3': 417.60, 'reconstrucción': 0},
    {'no': 24, 'pieza': "REJILLA INFERIOR DE PARABRISAS", 't1': 139.20, 't2': 174.00, 't3': 278.40, 'reconstrucción': 0},
    {'no': 25, 'pieza': "ZÓCALO", 't1': 208.80, 't2': 313.20, 't3': 487.20, 'reconstrucción': 0},
    {'no': 26, 'pieza': "INTERIOR DE GUARDABARROS", 't1': 208.80, 't2': 278.40, 't3': 417.60, 'reconstrucción': 0},
    {'no': 27, 'pieza': "TAPA DE TANQUE", 't1': 69.60, 't2': 104.40, 't3': 139.20, 'reconstrucción': 0},
    {'no': 28, 'pieza': "PISADERAS", 't1': 208.80, 't2': 278.40, 't3': 348.00, 'reconstrucción': 0},
    {'no': 29, 'pieza': "PISO DE CARROCERÍA", 't1': 313.20, 't2': 417.60, 't3': 556.80, 'reconstrucción': 0},
    {'no': 30, 'pieza': "SERVICIO DE RAMPLA", 't1': 696.00, 't2': 1044.00, 't3': 1392.00, 'reconstrucción': 0},
    {'no': 31, 'pieza': "PINTADO DE ESPEJOS", 't1': 139.20, 't2': 0, 't3': 0, 'reconstrucción': 0},
    {'no': 32, 'pieza': "INSTALADO DE RADIO", 't1': 69.60, 't2': 0, 't3': 0, 'reconstrucción': 0},
    {'no': 33, 'pieza': "INSTALADO DE ESPEJO ELÉCTRICO", 't1': 69.60, 't2': 0, 't3': 0, 'reconstrucción': 0},
    {'no': 34, 'pieza': "INSTALADO DE PARABRISAS (CON GOMA)", 't1': 208.80, 't2': 0, 't3': 0, 'reconstrucción': 0},
    {'no': 35, 'pieza': "INSTALADO DE PARABRISAS (CON SELLADOR)", 't1': 487.20, 't2': 0, 't3': 0, 'reconstrucción': 0},
    {'no': 36, 'pieza': "INSTALADO DE VIDRIO DE PUERTAS", 't1': 139.20, 't2': 0, 't3': 0, 'reconstrucción': 0},
    {'no': 37, 'pieza': "INSTALADO DE VIDRIO DE COMPUERTA TRASERA (CON GOMA)", 't1': 348.00, 't2': 0, 't3': 0, 'reconstrucción': 0},
    {'no': 38, 'pieza': "INSTALADO DE VIDRIO LATERAL TRASERO (CON GOMA)", 't1': 139.20, 't2': 0, 't3': 0, 'reconstrucción': 0},
    {'no': 39, 'pieza': "", 't1': 0, 't2': 0, 't3': 0, 'reconstrucción': 0},
    {'no': 40, 'pieza': "", 't1': 0, 't2': 0, 't3': 0, 'reconstrucción': 0}
]

# Comparar cada fila
coincidencias = 0
diferencias = []

for html_row in html_datos_corregidos:
    # Buscar fila correspondiente en Excel
    excel_row = None
    for excel_item in datos_excel:
        if excel_item['no'] == html_row['no']:
            excel_row = excel_item
            break
    
    if excel_row is not None:
        # Comparar valores
        campos = ['t1', 't2', 't3', 'reconstrucción']
        coincidencia = True
        detalles_diferencias = []
        
        for campo in campos:
            valor_excel = excel_row[campo]
            valor_html = html_row[campo]
            if abs(valor_excel - valor_html) > 0.01:  # Tolerancia pequeña
                coincidencia = False
                detalles_diferencias.append(f'{campo}: Excel={valor_excel} vs HTML={valor_html}')
        
        if coincidencia:
            coincidencias += 1
            print(f'✅ Fila {html_row["no"]}: COINCIDE PERFECTAMENTE')
        else:
            diferencias.append({
                'no': html_row['no'],
                'pieza': html_row['pieza'],
                'detalles': detalles_diferencias
            })
            print(f'❌ Fila {html_row["no"]}: AÚN DIFIERE - {html_row["pieza"]}')
            for detalle in detalles_diferencias:
                print(f'    {detalle}')

print(f'\n=== RESUMEN FINAL ===')
print(f'Filas coincidentes: {coincidencias}/40')
print(f'Filas con diferencias: {len(diferencias)}')

if coincidencias == 40:
    print('\n🎉 ¡TODAS LAS FILAS COINCIDEN PERFECTAMENTE! La tabla ha sido corregida exitosamente.')
else:
    print(f'\n⚠️  AÚN HAY {40-coincidencias} FILAS CON DIFERENCIAS')
    if diferencias:
        print('\nDiferencias restantes:')
        for diff in diferencias:
            print(f'  Fila {diff["no"]}: {diff["pieza"]}')
            for detalle in diff['detalles']:
                print(f'    - {detalle}')
