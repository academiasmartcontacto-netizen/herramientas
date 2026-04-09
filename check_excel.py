import pandas as pd

# Leer el archivo Excel
df = pd.read_excel('Templates/TABLA A - CONVENIO.xlsm', sheet_name='TABLA A')

print('=== ESTRUCTURA DEL EXCEL ===')
print(f'Columnas: {list(df.columns)}')
print(f'Filas totales: {len(df)}')
print(f'Primeras 10 filas:')
print(df.head(10).to_string())

print('\n=== VERIFICAR VALORES NULOS ===')
for col in df.columns:
    null_count = df[col].isnull().sum()
    print(f'Columna {col}: {null_count} valores nulos')

print('\n=== TIPOS DE DATOS ===')
print(df.dtypes)
