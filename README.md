

# Instrucciones de ejecución del proyecto

#### 1) Clona el repositorio
```console
git clone https://github.com/felipebuitrago/bp-productos.git
```

#### 2) Navega al directorio generado
```console
cd bp-productos
```

#### 3) Instala las dependencias
```console
npm install
```

#### 4) Ejecuta el proyecto
```console
npm start
```

#### 5) Ejecuta las pruebas unitarias
```console
npm run test
```

# Funciones

## F1. Listado de productos financieros: ✅
Se requiere una aplicación para visualizar los diferentes productos financieros ofertados por la Institución Banco Pichincha cargados de una API. Realizar la maquetación en base al diseño D1.

## F2. búsqueda de productos financieros: ✅
Se requiere realizar búsqueda de los productos financieros mediante un campo de texto. Realizar la maquetación en base al diseño D1.

## F3. Cantidad de registros: ✅
Se requiere que se muestre la cantidad de resultados mostrados en el listado y un select que permita seleccionar la cantidad de registros a mostrar debe contener los siguientes valores: 5, 10 y 20. Realizar la maquetación en base al diseño D1. Es deseable agregar una paginación simple en caso de que haya un número
considerable de registros.

## F4. Agregar producto: ✅
Se requiere la implementación un botón de "Agregar" para navegar al formulario de registro, el formulario debe permitir la creación de un producto mediante un botón "Agregar" y debe permitir la limpieza del formulario mediante un botón de “Reiniciar". Realizar la maquetación del formulario base al diseño D2 y de la ubicación del botón principal en base a diseño D3.
Cada campo del formulario contendrá su respectiva validación previa al envío del
formulario


| Campo               | Validacion   |
|---------------------|--------------|
| Id                  | Requerido, mínimo 3 caracteres y máximo 10, validación de ser un Id que no exista mediante el consumo del servicio de verificación. |
| Nombre              | Requerido, mínimo 5 caracteres y máximo 100 |
| Descripción         | Requerido, mínimo 10 caracteres y máximo 200 |
| Logo                | Requerido |
| Fecha de Liberación | Requerido, la Fecha debe ser igual o mayor a la fecha actual |
| Fecha de Revisión   | Requerido, la Fecha debe ser exactamente un año posterior a la fecha de liberación |


## F5. Editar producto: ✅
Se requiere la implementación un menú contextual (en formato dropdown) que permita seleccionar la opción de editar por cada producto, al hacer clic se deberá navegar a la pantalla de edición del producto y debe mantener el campo de ID deshabilitado, el formulario de editar debe mantener las mismas validaciones de la funcionalidad F4 y mostrar errores por cada campo. Realizar la maquetación del formulario de edición en base al diseño D2 y la maquetación del menú de cada producto en base al diseño D3.

## F6. Eliminar producto: ✅
Se requiere la implementación una opción de eliminar dentro del menú contextual de cada producto, al hacer clic en la opción de eliminar se deberá mostrar un modal con un botón de "Cancelar" y un botón "Eliminar”, al hacer clic en Eliminar se debe proceder con la eliminación, en el caso de cancelar seria solo ocultar el modal. Realizar maquetación del menú de cada producto en base al diseño D3 y la maquetación del modal en base al diseño D4.

