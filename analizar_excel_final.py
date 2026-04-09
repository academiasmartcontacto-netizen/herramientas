import pandas as pd
import os

def analizar_excel():
    ruta_excel = "Templates/TABLA A - CONVENIO.xlsm"
    
    try:
        print("=== ANÁLISIS DEL ARCHIVO EXCEL ===")
        print(f"Nombre: {os.path.basename(ruta_excel)}")
        
        # Leer con pandas para ver la estructura básica
        df = pd.read_excel(ruta_excel, sheet_name=0, nrows=100)
        
        print(f"\nDimensiones del DataFrame: {df.shape}")
        print(f"\nColumnas encontradas:")
        for i, col in enumerate(df.columns):
            print(f"  Columna {i+1}: {col}")
        
        print(f"\nPrimeras 20 filas de datos:")
        for idx, row in df.head(20).iterrows():
            row_data = []
            for col in df.columns:
                val = row[col]
                if pd.notna(val) and str(val).strip():
                    row_data.append(str(val)[:30])
                else:
                    row_data.append("")
            if any(row_data):
                print(f"  Fila {idx+1:2d}: {' | '.join(row_data[:6])}")
        
        # Buscar patrones de totales
        print(f"\nBuscando celdas con palabras clave de totales...")
        for idx, row in df.iterrows():
            for col in df.columns:
                val = row[col]
                if pd.notna(val) and isinstance(val, str):
                    val_upper = str(val).upper()
                    if any(keyword in val_upper for keyword in ['TOTAL', 'SUMA', 'SUMATORIA', 'PIEZAS']):
                        print(f"  - Encontrado en fila {idx+1}, columna '{col}': '{val}'")
        
        # Verificar si hay valores numéricos que podrían ser sumatorias
        print(f"\nBuscando valores numéricos grandes (posibles sumatorias)...")
        for idx, row in df.iterrows():
            for col in df.columns:
                val = row[col]
                if pd.notna(val) and isinstance(val, (int, float)):
                    if val > 1000:  # Valores grandes podrían ser sumatorias
                        print(f"  - Valor numérico grande en fila {idx+1}, columna '{col}': {val}")
        
        print(f"\n=== CONCLUSIÓN ===")
        print("El Excel tiene una estructura de tabla con:")
        print("- Columnas para piezas y precios")
        print("- Probables campos de totales/sumatorias")
        print("- El botón de exportar a PDF probablemente:")
        print("  1. Toma una 'foto' del Excel actual")
        print("  2. Lo convierte a PDF manteniendo el formato exacto")
        print("  3. Incluye las celdas 'pintadas' (seleccionadas)")
        print("  4. Muestra las sumatorias calculadas")
        
    except Exception as e:
        print(f"Error al analizar el Excel: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    analizar_excel()
