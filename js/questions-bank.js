/**
 * ====================================================================================================
 * PROYECTO: MASTERCLASS MULTI-MOTOR & AUDITORÍA INDOTEL (CLARO DOMINICANA)
 * ARCHIVO: js/questions-bank.js
 * DESCRIPCIÓN: Banco Maestro de 100 Preguntas Técnicas y Lógicas para el Simulador de Examen
 * AUTOR: ING. JUANCITO PEÑA | CEO DataIADev.com
 * ====================================================================================================
 */

const BANCO_PREGUNTAS_100 = [
  {
    "id": 1,
    "categoria": "DDL & DML",
    "pregunta": "¿Cuál es la diferencia técnica fundamental entre TRUNCATE TABLE y DELETE FROM sin cláusula WHERE?",
    "opciones": [
      "DELETE es una operación DDL y TRUNCATE es DML.",
      "TRUNCATE desasigna extensiones de páginas de datos minimizando el log de transacciones, mientras que DELETE registra cada fila individualmente .",
      "TRUNCATE activa los triggers AFTER DELETE definidos en la tabla.",
      "DELETE reinicia automáticamente el contador de las columnas IDENTITY o AUTO_INCREMENT."
    ],
    "correcta": 1,
    "explicacion": "TRUNCATE desasigna las páginas de datos en lugar de escanear y registrar fila por fila en el log de transacciones (T-Log / WAL), haciéndolo mucho más veloz y sin disparar triggers DML."
  },
  {
    "id": 2,
    "categoria": "DDL & DML",
    "pregunta": "En una base de datos relacional, ¿qué garantiza la regla de Integridad Referencial impuesta por una FOREIGN KEY?",
    "opciones": [
      "Que no existan valores duplicados en la columna que define la clave externa.",
      "Que el valor de la clave foránea exista previamente en la clave primaria o única de la tabla referenciada, o bien sea NULL .",
      "Que los índices de ambas tablas se sincronicen en el mismo clúster de disco.",
      "Que las consultas de tipo SELECT ejecuten automáticamente un FULL OUTER JOIN."
    ],
    "correcta": 1,
    "explicacion": "La integridad referencial garantiza que no existan registros huérfanos; cualquier valor en la FK debe coincidir con una PK/UNIQUE válida en la tabla padre o ser nulo."
  },
  {
    "id": 3,
    "categoria": "DDL & DML",
    "pregunta": "¿Qué tipo de dato ANSI estándar se debe emplear para almacenar importes monetarios o tarifas mensuales evitando errores de redondeo de punto flotante?",
    "opciones": [
      "FLOAT / REAL.",
      "DECIMAL(p, s) o NUMERIC(p, s) .",
      "BIGINT multiplicado por 100.",
      "VARCHAR(20)."
    ],
    "correcta": 1,
    "explicacion": "DECIMAL y NUMERIC son tipos de dato de punto fijo de precisión exacta, diseñados específicamente para cálculos financieros y contables sin artefactos binarios de punto flotante."
  },
  {
    "id": 4,
    "categoria": "DDL & DML",
    "pregunta": "¿Cuál de los siguientes comandos DDL permite modificar el tipo de datos de una columna existente en SQL Server sin perder los datos previamente cargados (siempre que sean compatibles)?",
    "opciones": [
      "ALTER TABLE Clientes MODIFY COLUMN Telefono VARCHAR(20);.",
      "ALTER TABLE Clientes ALTER COLUMN Telefono VARCHAR(20); .",
      "UPDATE TABLE Clientes CHANGE Telefono Telefono VARCHAR(20);.",
      "RENAME COLUMN Clientes.Telefono TO VARCHAR(20);."
    ],
    "correcta": 1,
    "explicacion": "En SQL Server la sintaxis estricta es ALTER TABLE [Tabla] ALTER COLUMN [Columna] [NuevoTipo]. En MySQL y Oracle se utiliza MODIFY COLUMN o MODIFY."
  },
  {
    "id": 5,
    "categoria": "DDL & DML",
    "pregunta": "En PostgreSQL, ¿cuál es el tipo de dato nativo especializado para generar identificadores universales únicos de 128 bits?",
    "opciones": [
      "UNIQUEIDENTIFIER.",
      "UUID .",
      "RAW(16).",
      "GUID."
    ],
    "correcta": 1,
    "explicacion": "PostgreSQL dispone del tipo de dato nativo 'UUID'. En SQL Server se denomina 'UNIQUEIDENTIFIER' y en Oracle se suele emular con 'RAW(16)'."
  },
  {
    "id": 6,
    "categoria": "DDL & DML",
    "pregunta": "¿Qué cláusula garantiza que una columna no admita registros con valores repetidos permitiendo opcionalmente un único valor NULL según el estándar SQL Server?",
    "opciones": [
      "PRIMARY KEY.",
      "UNIQUE CONSTRAINT .",
      "CHECK CONSTRAINT.",
      "DEFAULT."
    ],
    "correcta": 1,
    "explicacion": "Una restricción UNIQUE impone unicidad en valores no nulos. En SQL Server tradicionalmente admite un solo NULL, mientras que en PostgreSQL permite múltiples NULLs a menos que se defina UNIQUE NULLS NOT DISTINCT."
  },
  {
    "id": 7,
    "categoria": "DDL & DML",
    "pregunta": "¿Qué sucede al ejecutar DROP TABLE sobre una tabla que está referenciada por una FOREIGN KEY activa en otra tabla?",
    "opciones": [
      "Se eliminan automáticamente ambas tablas en cascada.",
      "El motor bloquea la operación y lanza un error de violación de integridad referencial .",
      "La tabla se borra y la FK de la tabla dependiente pasa a ser un campo VARCHAR.",
      "El motor trunca la tabla pero preserva los metadatos."
    ],
    "correcta": 1,
    "explicacion": "El motor relacional impide el borrado (DROP) de una tabla padre mientras existan restricciones de clave foránea dependientes en otras tablas del esquema."
  },
  {
    "id": 8,
    "categoria": "DDL & DML",
    "pregunta": "¿Cuál es el objetivo principal de una restricción CHECK en una tabla de tickets de telecomunicaciones?",
    "opciones": [
      "Verificar que el usuario autenticado sea administrador.",
      "Validar que los datos insertados cumplan una expresión booleana específica (por ejemplo, SLA_Compromiso_Horas > 0) .",
      "Realizar un ping a la red de fibra óptica del cliente.",
      "Acelerar las búsquedas de texto con índices inversos."
    ],
    "correcta": 1,
    "explicacion": "Las restricciones CHECK restringen los valores permitidos en una o más columnas mediante una condición lógica que debe evaluarse como TRUE o UNKNOWN."
  },
  {
    "id": 9,
    "categoria": "DDL & DML",
    "pregunta": "En Oracle Database, ¿cuál es la función de la pseudo-columna ROWNUM?",
    "opciones": [
      "Devuelve el número secuencial asignado a cada fila a medida que es leída del conjunto, antes de cualquier ORDER BY posterior .",
      "Devuelve el ID autonumérico permanente asignado físicamente en el tablespace.",
      "Genera una clave primaria compuesta mediante un hash SHA-256.",
      "Equivale exactamente al ROW_NUMBER() OVER(ORDER BY Fecha)."
    ],
    "correcta": 0,
    "explicacion": "ROWNUM en Oracle se evalúa dinámicamente cuando las filas son procesadas por la consulta. Si se usa con ORDER BY, ROWNUM se asigna antes de ordenar, por lo que se requiere una subconsulta para paginar correctamente."
  },
  {
    "id": 10,
    "categoria": "DDL & DML",
    "pregunta": "¿Qué comando DML permite realizar inserciones, actualizaciones o eliminaciones condicionales simultáneas en una sola instrucción basada en el cruce con una tabla origen?",
    "opciones": [
      "UPSERT JOIN.",
      "MERGE (o INSERT ... ON DUPLICATE KEY UPDATE) .",
      "REPLACE VIEW.",
      "BULK INSERT."
    ],
    "correcta": 1,
    "explicacion": "La sentencia ANSI SQL MERGE (disponible en SQL Server, Oracle y PostgreSQL 15+) permite sincronizar tablas ejecutando INSERT, UPDATE o DELETE según coincidan o no los registros."
  },
  {
    "id": 11,
    "categoria": "DDL & DML",
    "pregunta": "En MySQL con motor InnoDB, ¿cuál es el efecto de la directiva AUTO_INCREMENT?",
    "opciones": [
      "Encripta la columna con AES-256.",
      "Genera automáticamente valores enteros secuenciales incrementales para nuevas filas .",
      "Copia el registro a una réplica de lectura en la nube.",
      "Impide la modificación de los registros existentes."
    ],
    "correcta": 1,
    "explicacion": "AUTO_INCREMENT genera secuencias numéricas automáticas para nuevas filas, usualmente utilizado para claves primarias subrogadas en MySQL."
  },
  {
    "id": 12,
    "categoria": "DDL & DML",
    "pregunta": "¿Cuál es la función del comando VACUUM en PostgreSQL?",
    "opciones": [
      "Eliminar todas las bases de datos inactivas del cluster.",
      "Recuperar espacio ocupado por tuplas muertas (MVCC) y actualizar estadísticas para el planificador .",
      "Crear una copia de seguridad en caliente con pg_dump.",
      "Reiniciar los servicios de red del motor de base de datos."
    ],
    "correcta": 1,
    "explicacion": "PostgreSQL utiliza MVCC (Multi-Version Concurrency Control). Los UPDATEs y DELETEs dejan filas obsoletas (muertas); VACUUM limpia ese espacio y actualiza las estadísticas de ANALYZE."
  },
  {
    "id": 13,
    "categoria": "DDL & DML",
    "pregunta": "En SQL Server, ¿cuál es la diferencia entre VARCHAR(MAX) y TEXT?",
    "opciones": [
      "TEXT es más rápido y soporta compresión LZ4 nativa.",
      "TEXT es un tipo de datos obsoleto (deprecated) que no admite todos los operadores de cadena; VARCHAR(MAX) es el estándar moderno .",
      "VARCHAR(MAX) solo permite almacenar hasta 8,000 bytes.",
      "No existe ninguna diferencia, son sinónimos exactos."
    ],
    "correcta": 1,
    "explicacion": "TEXT, NTEXT e IMAGE son obsoletos desde hace varias versiones en SQL Server y no admiten funciones modernas de cadena. Se debe usar VARCHAR(MAX), NVARCHAR(MAX) o VARBINARY(MAX)."
  },
  {
    "id": 14,
    "categoria": "DDL & DML",
    "pregunta": "¿Cuál de las siguientes afirmaciones es CORRECTA sobre una vista (VIEW) estándar en SQL?",
    "opciones": [
      "Una vista estándar almacena físicamente una copia duplicada de todos los datos en disco.",
      "Una vista es una consulta almacenada (definición de catálogo) que se ejecuta en tiempo real al ser invocada .",
      "Una vista no permite aplicar cláusulas WHERE ni cruces con otras tablas.",
      "Las vistas no pueden crearse si la base de datos contiene más de 10,000 registros."
    ],
    "correcta": 1,
    "explicacion": "Una vista estándar es una abstracción lógica (consulta guardada); no almacena datos físicos a menos que sea una 'Vista Indexada' (SQL Server) o 'Vista Materializada' (PostgreSQL/Oracle)."
  },
  {
    "id": 15,
    "categoria": "DDL & DML",
    "pregunta": "¿Qué cláusula DDL se utiliza para eliminar completamente un índice existente denominado IX_Clientes_Provincia?",
    "opciones": [
      "DELETE INDEX IX_Clientes_Provincia;.",
      "DROP INDEX IX_Clientes_Provincia ON Clientes; (o DROP INDEX IX_Clientes_Provincia;) .",
      "TRUNCATE INDEX IX_Clientes_Provincia;.",
      "REMOVE INDEX IX_Clientes_Provincia FROM SCHEMA;."
    ],
    "correcta": 1,
    "explicacion": "El comando estándar DDL es DROP INDEX. En SQL Server la sintaxis es DROP INDEX IX_Clientes_Provincia ON Clientes, mientras que en PostgreSQL y Oracle es DROP INDEX IX_Clientes_Provincia."
  },
  {
    "id": 16,
    "categoria": "Filtrado & Operadores",
    "pregunta": "¿Cuál es el resultado de evaluar la expresión booleana (NULL = NULL) en SQL estándar bajo la lógica tri-valuada?",
    "opciones": [
      "TRUE (Verdadero).",
      "FALSE (Falso).",
      "UNKNOWN (Desconocido) .",
      "Lanza un error de división por cero."
    ],
    "correcta": 2,
    "explicacion": "En SQL, NULL representa la ausencia de valor. Como no se conoce el valor, comparar dos NULL con '=' no resulta ni verdadero ni falso, sino UNKNOWN."
  },
  {
    "id": 17,
    "categoria": "Filtrado & Operadores",
    "pregunta": "Si ejecutas: SELECT * FROM Clientes WHERE Telefono <> '809-555-0101', ¿qué ocurre con los clientes cuyo teléfono es NULL?",
    "opciones": [
      "Aparecen en el resultado porque su teléfono es diferente a ese número.",
      "Quedan excluidos del resultado porque la comparación con NULL evalúa a UNKNOWN y el WHERE solo retorna filas TRUE .",
      "El motor reemplaza automáticamente el NULL por una cadena vacía.",
      "La consulta se cancela por error de conversión de tipos."
    ],
    "correcta": 1,
    "explicacion": "La cláusula WHERE solo devuelve las filas cuya condición evalúa estrictamente a TRUE. Cualquier comparación relacional con NULL resulta en UNKNOWN, quedando excluida."
  },
  {
    "id": 18,
    "categoria": "Filtrado & Operadores",
    "pregunta": "¿Cuál de las siguientes condiciones es la forma correcta y sargable de consultar registros con fechas entre el 1 de enero y el 31 de enero de 2026?",
    "opciones": [
      "WHERE YEAR(Fecha) = 2026 AND MONTH(Fecha) = 1.",
      "WHERE Fecha >= '2026-01-01' AND Fecha < '2026-02-01' .",
      "WHERE CONVERT(VARCHAR, Fecha, 112) LIKE '202601%'.",
      "WHERE SUBSTRING(Fecha, 1, 7) = '2026-01'."
    ],
    "correcta": 1,
    "explicacion": "Aplicar funciones a la columna (como YEAR o CONVERT) invalida el uso eficiente de índices (no sargable). Usar rangos semi-abiertos (>= y <) sobre la columna pura permite index seek."
  },
  {
    "id": 19,
    "categoria": "Filtrado & Operadores",
    "pregunta": "En el operador LIKE, ¿qué representa el comodín de guion bajo (_)?",
    "opciones": [
      "Cero o más caracteres de cualquier tipo.",
      "Exactamente un único carácter cualquiera en esa posición .",
      "Un salto de línea o retorno de carro.",
      "Un espacio en blanco obligatorio."
    ],
    "correcta": 1,
    "explicacion": "El guion bajo '_' en el operador LIKE coincide exactamente con un único carácter en la posición especificada dentro de la cadena."
  },
  {
    "id": 20,
    "categoria": "Filtrado & Operadores",
    "pregunta": "¿Qué operador permite sustituir un valor NULL por un valor por defecto en PostgreSQL y SQL Server de forma estándar ANSI?",
    "opciones": [
      "NVL().",
      "COALESCE() .",
      "IFNULL().",
      "ISNULL()."
    ],
    "correcta": 1,
    "explicacion": "COALESCE(val1, val2, ...) es la función estándar ANSI SQL soportada por todos los motores modernos. NVL es de Oracle, IFNULL de MySQL e ISNULL es propia de T-SQL."
  },
  {
    "id": 21,
    "categoria": "Filtrado & Operadores",
    "pregunta": "¿Qué diferencia existe entre el operador IN y una serie encadenada de condiciones OR?",
    "opciones": [
      "IN evalúa en orden ascendente y OR en orden descendente.",
      "Semánticamente son equivalentes para valores no nulos, pero el optimizador suele transformar IN en una lista o en un semi-join indexado .",
      "IN no puede utilizarse sobre columnas de tipo VARCHAR.",
      "OR no consume recursos de CPU en el servidor."
    ],
    "correcta": 1,
    "explicacion": "Columna IN (A, B, C) es lógicamente equivalente a (Columna = A OR Columna = B OR Columna = C), pero los optimizadores de consultas a menudo lo transforman en búsquedas indexadas o hash joins."
  },
  {
    "id": 22,
    "categoria": "Filtrado & Operadores",
    "pregunta": "Si una consulta contiene: WHERE Categoria = 'Fibra' AND Prioridad = 'Alta' OR SLA_Horas < 4, ¿cuál es el orden de precedencia estándar de los operadores lógicos?",
    "opciones": [
      "OR se evalúa primero que AND.",
      "AND tiene mayor precedencia que OR, evaluándose primero .",
      "Se evalúan estrictamente de derecha a izquierda sin importar el operador.",
      "El motor genera un error de ambigüedad si no se colocan paréntesis."
    ],
    "correcta": 1,
    "explicacion": "En el álgebra booleana de SQL, el operador AND tiene mayor precedencia que el operador OR. Se evalúa como ((Categoria = 'Fibra' AND Prioridad = 'Alta') OR SLA_Horas < 4)."
  },
  {
    "id": 23,
    "categoria": "Filtrado & Operadores",
    "pregunta": "¿Qué sucede al utilizar la condición: WHERE Columna NOT IN (1, 2, NULL)?",
    "opciones": [
      "Devuelve todas las filas donde Columna no sea 1 ni 2.",
      "Devuelve cero filas (conjunto vacío) porque cualquier comparación con NULL resulta en UNKNOWN y NOT UNKNOWN es UNKNOWN .",
      "Devuelve únicamente las filas donde Columna sea NULL.",
      "El motor omite automáticamente el NULL y evalúa solo 1 y 2."
    ],
    "correcta": 1,
    "explicacion": "La presencia de NULL dentro de un conjunto evaluado con NOT IN es una trampa clásica de SQL: la expresión evalúa a UNKNOWN para toda fila, resultando en un conjunto de resultados vacío."
  },
  {
    "id": 24,
    "categoria": "Filtrado & Operadores",
    "pregunta": "¿Cuál es la función del operador EXISTS frente a IN cuando se evalúa una subconsulta?",
    "opciones": [
      "EXISTS requiere que la subconsulta devuelva todas las columnas de la tabla.",
      "EXISTS evalúa la existencia de al menos una fila y se detiene (short-circuit) en la primera coincidencia sin cargar el conjunto entero .",
      "IN siempre es más rápido que EXISTS independientemente de los índices.",
      "EXISTS solo funciona en Oracle Database."
    ],
    "correcta": 1,
    "explicacion": "EXISTS implementa una búsqueda de semi-join con cortocircuito: tan pronto como encuentra la primera tupla que satisface la correlación, retorna TRUE y no necesita leer el resto."
  },
  {
    "id": 25,
    "categoria": "Filtrado & Operadores",
    "pregunta": "¿Qué función permite devolver el valor de la primera expresión no nula de una lista?",
    "opciones": [
      "NULLIF().",
      "COALESCE() .",
      "GREATEST().",
      "LEAST()."
    ],
    "correcta": 1,
    "explicacion": "COALESCE devuelve el primer valor no nulo de su lista de argumentos, evaluándolos secuencialmente de izquierda a derecha."
  },
  {
    "id": 26,
    "categoria": "Filtrado & Operadores",
    "pregunta": "¿Qué hace la función NULLIF(expresion1, expresion2)?",
    "opciones": [
      "Devuelve TRUE si ambas expresiones son nulas.",
      "Devuelve NULL si ambas expresiones son iguales; de lo contrario, devuelve expresion1 .",
      "Reemplaza los valores nulos de expresion1 por expresion2.",
      "Convierte expresion1 a tipo entero."
    ],
    "correcta": 1,
    "explicacion": "NULLIF retorna NULL cuando sus dos argumentos son equivalentes. Se usa comúnmente para evitar errores de división por cero: Monto / NULLIF(Cantidad, 0)."
  },
  {
    "id": 27,
    "categoria": "Filtrado & Operadores",
    "pregunta": "¿Cómo se busca de forma segura una cadena que contiene explícitamente el símbolo de porcentaje (ejemplo: 'Descuento 10%') usando LIKE?",
    "opciones": [
      "LIKE '%Descuento 10%%%'.",
      "Utilizando la cláusula ESCAPE (ejemplo: LIKE '%Descuento 10\\%%' ESCAPE '\\') .",
      "Reemplazando el porcentaje por un asterisco (*).",
      "El motor SQL no permite buscar el carácter '%' bajo ninguna circunstancia."
    ],
    "correcta": 1,
    "explicacion": "La cláusula ESCAPE define un carácter de escape para anular el comportamiento comodín del '%' o del '_', tratándolos como texto literal."
  },
  {
    "id": 28,
    "categoria": "Filtrado & Operadores",
    "pregunta": "En PostgreSQL, ¿cuál es el operador para realizar búsquedas con expresiones regulares insensibles a mayúsculas/minúsculas?",
    "opciones": [
      "LIKE.",
      "~* .",
      "REGEXP_BINARY.",
      "=~."
    ],
    "correcta": 1,
    "explicacion": "En PostgreSQL, '~' es coincidencia regex sensitiva y '~*' es coincidencia regex insensible a mayúsculas y minúsculas (case-insensitive)."
  },
  {
    "id": 29,
    "categoria": "Filtrado & Operadores",
    "pregunta": "¿Qué efecto tiene la cláusula DISTINCT sobre un conjunto de resultados?",
    "opciones": [
      "Ordena siempre la tabla de forma aleatoria.",
      "Elimina filas duplicadas completas en la proyección especificada, requiriendo a menudo una operación de ordenamiento (Sort) o agregación hash .",
      "Aplica un índice clustered temporal en memoria RAM.",
      "Modifica físicamente la clave primaria de la tabla base."
    ],
    "correcta": 1,
    "explicacion": "DISTINCT filtra las filas idénticas devueltas en el SELECT. Para lograrlo, el motor debe ordenar los datos (Sort Distinct) o procesarlos en una tabla hash en memoria."
  },
  {
    "id": 30,
    "categoria": "Filtrado & Operadores",
    "pregunta": "En una condición WHERE, ¿por qué la expresión: WHERE DATEDIFF(day, Fecha_Apertura, GETDATE()) > 5 puede provocar un Table Scan o Index Scan en lugar de Index Seek?",
    "opciones": [
      "Porque GETDATE() no es compatible con SQL Server.",
      "Porque envolver la columna indexada (Fecha_Apertura) en una función impide que el optimizador utilice el índice de forma sargable .",
      "Porque DATEDIFF solo opera sobre valores de tipo VARCHAR.",
      "Porque el motor relacional bloquea la tabla en modo exclusivo."
    ],
    "correcta": 1,
    "explicacion": "Es una regla de oro de rendimiento: una columna indexada dentro de una función matemática o de fecha pierde su propiedad de sargabilidad, forzando a evaluar la función fila por fila."
  },
  {
    "id": 31,
    "categoria": "Joins & Relaciones",
    "pregunta": "En un cruce entre las tablas Clientes y Tickets_Averias, ¿qué registros devuelve un LEFT OUTER JOIN?",
    "opciones": [
      "Únicamente los clientes que tienen tickets asignados.",
      "Todos los registros de la tabla Clientes, emparejados con sus tickets coincidentes, y valores NULL en las columnas de tickets para clientes sin incidencias .",
      "Todos los tickets huérfanos sin cliente asociado.",
      "El producto cartesiano sin ningún filtro de enlace."
    ],
    "correcta": 1,
    "explicacion": "LEFT OUTER JOIN preserva la totalidad de las filas de la tabla izquierda (Clientes); si no hay fila coincidente en la tabla derecha, rellena sus atributos con NULL."
  },
  {
    "id": 32,
    "categoria": "Joins & Relaciones",
    "pregunta": "¿Cómo se construye una consulta de Anti-Join en SQL para obtener clientes que NO tienen ningún contrato registrado?",
    "opciones": [
      "SELECT * FROM Clientes C INNER JOIN Contratos CT ON C.ID_Cliente = CT.ID_Cliente WHERE CT.ID_Contrato IS NULL;.",
      "SELECT * FROM Clientes C LEFT JOIN Contratos CT ON C.ID_Cliente = CT.ID_Cliente WHERE CT.ID_Contrato IS NULL; .",
      "SELECT * FROM Clientes C CROSS JOIN Contratos CT WHERE C.ID_Cliente <> CT.ID_Cliente;.",
      "SELECT * FROM Clientes C FULL JOIN Contratos CT ON C.ID_Cliente = CT.ID_Cliente WHERE C.ID_Cliente IS NULL;."
    ],
    "correcta": 1,
    "explicacion": "Un Anti-Join se implementa típicamente mediante LEFT JOIN buscando en la cláusula WHERE que la clave primaria de la tabla derecha sea NULL (o usando NOT EXISTS)."
  },
  {
    "id": 33,
    "categoria": "Joins & Relaciones",
    "pregunta": "¿Qué resultado produce un CROSS JOIN entre una tabla de 10 Provincias y una tabla de 4 Tipos de Planes?",
    "opciones": [
      "14 filas (la suma de ambas tablas).",
      "40 filas (el producto cartesiano de cada provincia combinada con cada tipo de plan) .",
      "10 filas correspondientes a las provincias principales.",
      "Un error sintáctico por falta de cláusula ON."
    ],
    "correcta": 1,
    "explicacion": "CROSS JOIN genera el producto cartesiano multiplicando cada fila de la primera tabla por cada fila de la segunda (10 * 4 = 40 combinaciones)."
  },
  {
    "id": 34,
    "categoria": "Joins & Relaciones",
    "pregunta": "¿Cuál es el algoritmo físico de JOIN más eficiente cuando ambas entradas de datos ya se encuentran ordenadas físicamente por la clave de unión mediante un índice agrupado (Clustered Index)?",
    "opciones": [
      "Nested Loops Join.",
      "Merge Join .",
      "Hash Match Join.",
      "Adaptive Cartesian Join."
    ],
    "correcta": 1,
    "explicacion": "Merge Join lee simultáneamente ambas entradas ordenadas en un único escaneo lineal sin requerir tablas hash temporales en memoria, logrando el menor consumo de CPU y memoria."
  },
  {
    "id": 35,
    "categoria": "Joins & Relaciones",
    "pregunta": "¿En qué escenario el optimizador de consultas suele seleccionar un Nested Loops Join?",
    "opciones": [
      "Cuando ambas tablas contienen decenas de millones de registros sin ningún índice.",
      "Cuando una tabla externa pequeña (driving table) busca coincidencias en una tabla interna grande que cuenta con un índice eficiente por la clave de unión .",
      "Cuando se realiza un FULL OUTER JOIN sobre columnas de tipo XML.",
      "Cuando el servidor se queda sin espacio de memoria tempdb."
    ],
    "correcta": 1,
    "explicacion": "Nested Loops es óptimo cuando la tabla externa tiene pocas filas y para cada una se ejecuta un Index Seek ultrarrápido en la tabla interna."
  },
  {
    "id": 36,
    "categoria": "Joins & Relaciones",
    "pregunta": "¿Qué diferencia existe entre aplicar un filtro en la cláusula ON de un LEFT JOIN versus aplicarlo en la cláusula WHERE?",
    "opciones": [
      "No existe ninguna diferencia funcional ni de rendimiento.",
      "En el ON, el filtro restringe qué filas de la tabla derecha se emparejan sin eliminar filas de la tabla izquierda; en el WHERE, el filtro actúa post-join y puede convertir el LEFT JOIN en un INNER JOIN involuntario .",
      "El filtro en el ON se ejecuta después de que la consulta devuelve los datos al cliente.",
      "El filtro en el WHERE impide la creación de índices temporales."
    ],
    "correcta": 1,
    "explicacion": "Si en un LEFT JOIN filtras columnas de la tabla derecha en el WHERE (ej: WHERE T.Prioridad = 'Alta'), las filas donde la derecha era NULL se eliminan, transformando el comportamiento a un INNER JOIN."
  },
  {
    "id": 37,
    "categoria": "Joins & Relaciones",
    "pregunta": "¿Qué devuelve un FULL OUTER JOIN entre dos tablas?",
    "opciones": [
      "Únicamente las filas que coinciden en ambas tablas.",
      "Todas las filas de ambas tablas: las que coinciden se combinan, y las no coincidentes de cualquier lado se rellenan con NULLs .",
      "El promedio aritmético de las columnas numéricas de ambas entidades.",
      "Una copia física comprimida de los metadatos del esquema."
    ],
    "correcta": 1,
    "explicacion": "FULL OUTER JOIN es la unión inclusiva completa: preserva todas las filas tanto de la tabla izquierda como de la derecha, colocando NULL donde no existan coincidencias relacionales."
  },
  {
    "id": 38,
    "categoria": "Joins & Relaciones",
    "pregunta": "En una relación de autorreferencia (Self-Join), ¿para qué se suele utilizar en una base de datos corporativa de telecomunicaciones?",
    "opciones": [
      "Para cifrar las contraseñas de los usuarios en la misma tabla.",
      "Para modelar jerarquías organizacionales, como supervisores y técnicos donde el Supervisor_ID apunta al Empleado_ID de la misma tabla .",
      "Para duplicar el espacio de almacenamiento de la tabla.",
      "Para calcular divisiones matriciales sin utilizar funciones."
    ],
    "correcta": 1,
    "explicacion": "El Self-Join une una tabla consigo misma; el caso clásico de negocio es la jerarquía de empleados y supervisores o categorías padre e hijo en un árbol relacional."
  },
  {
    "id": 39,
    "categoria": "Joins & Relaciones",
    "pregunta": "En PostgreSQL y Oracle, ¿qué comando de conjunto (Set Operator) devuelve las filas que están presentes en la primera consulta pero NO en la segunda?",
    "opciones": [
      "UNION.",
      "EXCEPT (PostgreSQL / SQL Server) o MINUS (Oracle) .",
      "INTERSECT.",
      "DIFF."
    ],
    "correcta": 1,
    "explicacion": "EXCEPT es el operador estándar ANSI (utilizado en PostgreSQL y SQL Server). Oracle utiliza la palabra reservada MINUS para la misma operación de diferencia de conjuntos."
  },
  {
    "id": 40,
    "categoria": "Joins & Relaciones",
    "pregunta": "¿Cuál es la diferencia entre UNION y UNION ALL?",
    "opciones": [
      "UNION une tablas en paralelo y UNION ALL las une secuencialmente.",
      "UNION elimina automáticamente las filas duplicadas mediante un ordenamiento o hash costoso; UNION ALL concatena directamente los resultados sin verificar duplicados .",
      "UNION solo acepta columnas de texto y UNION ALL solo números.",
      "UNION ALL no está soportado en sistemas de producción empresariales."
    ],
    "correcta": 1,
    "explicacion": "UNION ALL es significativamente más eficiente porque no realiza la operación de eliminación de duplicados (Sort / Distinct), agregando directamente los flujos de datos."
  },
  {
    "id": 41,
    "categoria": "Joins & Relaciones",
    "pregunta": "¿Qué condición es obligatoria para poder aplicar un operador de conjunto como UNION, INTERSECT o EXCEPT?",
    "opciones": [
      "Que las tablas tengan exactamente el mismo nombre de columnas primarias.",
      "Que ambas consultas tengan el mismo número de columnas proyectadas y que sus tipos de datos sean compatibles en orden .",
      "Que ambas tablas pertenezcan al mismo tablespace en disco.",
      "Que ninguna de las dos consultas contenga cláusula WHERE."
    ],
    "correcta": 1,
    "explicacion": "Los operadores de conjuntos requieren correspondencia posicional estricta: igual número de columnas y tipos de datos compatibles entre cada columna proyectada."
  },
  {
    "id": 42,
    "categoria": "Joins & Relaciones",
    "pregunta": "¿Qué es un Non-Equi Join?",
    "opciones": [
      "Un JOIN que no utiliza la palabra reservada JOIN.",
      "Una unión donde el predicado utiliza operadores de desigualdad o rangos (como <, >, <=, >=, BETWEEN) en lugar del operador de igualdad (=) .",
      "Un cruce exclusivo entre servidores remotos mediante Linked Server.",
      "Un error sintáctico generado por el motor de base de datos."
    ],
    "correcta": 1,
    "explicacion": "Un Non-Equi Join vincula registros usando condiciones distintas al signo igual, como clasificar eventos dentro de bandas tarifarias o escalas de penalidades INDOTEL mediante BETWEEN."
  },
  {
    "id": 43,
    "categoria": "Joins & Relaciones",
    "pregunta": "¿Para qué se utiliza el operador APPLY (CROSS APPLY / OUTER APPLY) en SQL Server y Oracle?",
    "opciones": [
      "Para aplicar parches de seguridad al motor sin reiniciar.",
      "Para invocar una función valorada en tabla (TVF) o subconsulta correlacionada para cada fila individual devuelta por la tabla externa .",
      "Para cambiar el propietario del esquema de base de datos.",
      "Para sincronizar las transacciones con el log secundario."
    ],
    "correcta": 1,
    "explicacion": "CROSS APPLY evalúa una función de tabla o subconsulta fila a fila basada en columnas de la tabla exterior (análogo a un LATERAL JOIN en PostgreSQL y MySQL)."
  },
  {
    "id": 44,
    "categoria": "Joins & Relaciones",
    "pregunta": "En PostgreSQL 9.3+ y MySQL 8.0.14+, ¿cuál es el equivalente estándar del CROSS APPLY de SQL Server?",
    "opciones": [
      "PARALLEL JOIN.",
      "LATERAL JOIN .",
      "APPLY SUBQUERY.",
      "PIPELINE JOIN."
    ],
    "correcta": 1,
    "explicacion": "La palabra clave LATERAL permite que una subconsulta en el FROM haga referencia a columnas de tablas precedentes en la misma cláusula FROM, idéntico a CROSS APPLY."
  },
  {
    "id": 45,
    "categoria": "Joins & Relaciones",
    "pregunta": "¿Por qué un JOIN que no incluye condición de enlace (ON) o que tiene un predicado siempre verdadero genera un riesgo crítico de caída del servidor?",
    "opciones": [
      "Porque produce un producto cartesiano masivo (N x M filas) que puede agotar la memoria RAM y llenar el espacio de almacenamiento de tempdb / swap .",
      "Porque borra automáticamente los índices de la base de datos.",
      "Porque bloquea el puerto 1433 de la red de telecomunicaciones.",
      "Porque desconecta todas las sesiones de usuarios administradores."
    ],
    "correcta": 0,
    "explicacion": "Un producto cartesiano accidental entre tablas grandes (ej. 100,000 x 50,000 = 5 mil millones de tuplas) genera explosión combinatoria de memoria y disco tempdb, pudiendo colapsar el motor."
  },
  {
    "id": 46,
    "categoria": "Agrupación & Analítica",
    "pregunta": "¿Qué diferencia existe entre COUNT(*) y COUNT(Columna)?",
    "opciones": [
      "COUNT(*) cuenta todas las filas incluyendo aquellas con valores NULL; COUNT(Columna) solo contabiliza las filas donde la columna especificada no es NULL .",
      "COUNT(*) es una función escalar y COUNT(Columna) es una función de ventana.",
      "COUNT(Columna) siempre es más rápido que COUNT(*) en todas las circunstancias.",
      "COUNT(*) no funciona en tablas con más de dos millones de registros."
    ],
    "correcta": 0,
    "explicacion": "COUNT(*) devuelve la cardinalidad total de filas del conjunto sin evaluar contenidos; COUNT(Columna) evalúa cada fila e ignora los valores que sean NULL."
  },
  {
    "id": 47,
    "categoria": "Agrupación & Analítica",
    "pregunta": "¿Por qué la siguiente consulta genera un error de compilación en SQL? SELECT Provincia, MAX(Fecha_Registro) FROM Clientes WHERE Segmento = 'VIP';",
    "opciones": [
      "Porque MAX no puede aplicarse sobre tipos de datos DATE.",
      "Porque la columna 'Provincia' está en el SELECT pero no se encuentra en una cláusula GROUP BY ni dentro de una función agregada .",
      "Porque WHERE no admite filtros de cadenas de texto.",
      "Porque en SQL Server la palabra Provincia es una palabra reservada del sistema."
    ],
    "correcta": 1,
    "explicacion": "Regla canónica de SQL: Cualquier columna no agregada en la lista del SELECT debe formar parte explícita de la cláusula GROUP BY para determinar el nivel de agregación."
  },
  {
    "id": 48,
    "categoria": "Agrupación & Analítica",
    "pregunta": "¿Cuándo es estrictamente obligatorio utilizar la cláusula HAVING en lugar de WHERE?",
    "opciones": [
      "Cuando se requiere ordenar los resultados de forma ascendente.",
      "Cuando la condición de filtro se basa en el resultado de una función agregada (ejemplo: HAVING COUNT(ID_Ticket) > 10) .",
      "Cuando se consultan tablas que tienen más de cinco claves foráneas.",
      "Cuando la base de datos se ejecuta en un servidor Linux."
    ],
    "correcta": 1,
    "explicacion": "El WHERE filtra registros individuales antes de que se produzca la agrupación. HAVING filtra los grupos resultantes evaluando las funciones de agregación (SUM, AVG, COUNT, etc.)."
  },
  {
    "id": 49,
    "categoria": "Agrupación & Analítica",
    "pregunta": "¿Qué calcula la función de ventana: ROW_NUMBER() OVER(PARTITION BY Segmento ORDER BY Tarifa DESC)?",
    "opciones": [
      "El número total de clientes existentes en la base de datos.",
      "Un número entero secuencial correlativo (1, 2, 3...) asignado a cada fila reiniciándose en 1 para cada grupo de Segmento y ordenado por tarifa descendente .",
      "El promedio de las tarifas de los clientes del mismo segmento.",
      "La suma acumulada de las tarifas sin considerar el orden."
    ],
    "correcta": 1,
    "explicacion": "PARTITION BY crea particiones lógicas independientes (ventanas); dentro de cada una, ROW_NUMBER numera secuencialmente las tuplas comenzando desde 1 según el ORDER BY."
  },
  {
    "id": 50,
    "categoria": "Agrupación & Analítica",
    "pregunta": "Si dos filas empatan con el mismo valor en la métrica analizada, ¿qué diferencia existe entre RANK() y DENSE_RANK()?",
    "opciones": [
      "RANK() no admite empates y lanza un error en tiempo de ejecución.",
      "RANK() deja huecos en la numeración posterior al empate (ejemplo: 1, 2, 2, 4); DENSE_RANK() asigna la secuencia consecutiva sin saltos (ejemplo: 1, 2, 2, 3) .",
      "DENSE_RANK() solo opera sobre bases de datos MySQL.",
      "RANK() multiplica el valor por dos para desempatar."
    ],
    "correcta": 1,
    "explicacion": "RANK salta tantas posiciones como empates existan (deja huecos en la serie numérica), mientras que DENSE_RANK preserva la densidad asignando el siguiente entero correlativo."
  },
  {
    "id": 51,
    "categoria": "Agrupación & Analítica",
    "pregunta": "¿Qué función analítica permite obtener el valor de una columna correspondiente a la fila inmediatamente anterior sin necesidad de hacer un self-join?",
    "opciones": [
      "PREV().",
      "LAG() .",
      "LEAD().",
      "PRIOR_ROW()."
    ],
    "correcta": 1,
    "explicacion": "LAG(Columna, Offset) permite acceder a datos de filas anteriores dentro de la misma partición y orden definidos en la cláusula OVER."
  },
  {
    "id": 52,
    "categoria": "Agrupación & Analítica",
    "pregunta": "¿Qué función analítica permite consultar el valor de una columna en la fila siguiente dentro de la partición?",
    "opciones": [
      "NEXT().",
      "LEAD() .",
      "FORWARD().",
      "AFTER()."
    ],
    "correcta": 1,
    "explicacion": "LEAD(Columna, Offset) permite inspeccionar filas posteriores sin recurrir a costosos cruces adicionales en el plan de ejecución."
  },
  {
    "id": 53,
    "categoria": "Agrupación & Analítica",
    "pregunta": "En una función agregada sobre ventana, ¿qué significa la especificación: ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW?",
    "opciones": [
      "Que el cálculo abarca únicamente la primera fila de la tabla.",
      "Que el cálculo incluye desde la primera fila de la partición hasta la fila actual que se está procesando (acumulado progresivo o Running Total) .",
      "Que se omiten los registros que contengan valores nulos.",
      "Que el cálculo solo se actualiza al reiniciar el servicio SQL."
    ],
    "correcta": 1,
    "explicacion": "Es el marco de ventana estándar para acumulados móviles: suma desde el inicio de la partición (UNBOUNDED PRECEDING) acumulando fila a fila hasta la tupla corriente (CURRENT ROW)."
  },
  {
    "id": 54,
    "categoria": "Agrupación & Analítica",
    "pregunta": "¿Qué funcionalidad aporta la cláusula GROUP BY ROLLUP (Provincia, Segmento)?",
    "opciones": [
      "Comprime los datos en una tabla temporal ZIP.",
      "Genera agrupaciones jerárquicas con subtotales por Provincia y Segmento, subtotales por Provincia y el Gran Total General .",
      "Elimina todos los clientes que no tengan ventas en el mes.",
      "Invierte el orden de las columnas en la proyección final."
    ],
    "correcta": 1,
    "explicacion": "ROLLUP genera subtotales agregados acumulativos en un esquema jerárquico n-dimensional desde el nivel más granular hasta el gran total general."
  },
  {
    "id": 55,
    "categoria": "Agrupación & Analítica",
    "pregunta": "¿En qué se diferencia GROUP BY CUBE de GROUP BY ROLLUP?",
    "opciones": [
      "CUBE solo se utiliza para datos geométricos tridimensionales.",
      "CUBE genera todas las combinaciones posibles de subtotales para las dimensiones especificadas (2^n combinaciones), mientras que ROLLUP sigue una jerarquía estrictamente lineal .",
      "ROLLUP es estándar ANSI y CUBE es un comando propietario de Oracle.",
      "No existe ninguna diferencia práctica entre ambos operadores."
    ],
    "correcta": 1,
    "explicacion": "CUBE genera el cubo multidimensional completo evaluando todas las permutaciones posibles de agregación entre los atributos de agrupación declarados."
  },
  {
    "id": 56,
    "categoria": "Agrupación & Analítica",
    "pregunta": "¿Cómo se construye una matriz de pivot manual (transformar filas a columnas) de forma compatible y portable en todos los motores SQL?",
    "opciones": [
      "Utilizando la instrucción PIVOT que es soportada de forma idéntica en MySQL y PostgreSQL.",
      "Combinando funciones de agregación condicionales como SUM(CASE WHEN Estado = 'Abierto' THEN 1 ELSE 0 END) .",
      "Exportando los datos a un archivo CSV y recargándolo con BCP.",
      "Definiendo un trigger de inserción transaccional."
    ],
    "correcta": 1,
    "explicacion": "El patrón SUM(CASE WHEN ...) o COUNT(CASE WHEN ...) es el método universal, portátil y de mayor rendimiento para pivotar datos en cualquier motor sin depender de sintaxis propietarias."
  },
  {
    "id": 57,
    "categoria": "Agrupación & Analítica",
    "pregunta": "En una Common Table Expression (CTE) recursiva, ¿cuáles son sus dos componentes estructurales obligatorios unidos por un UNION ALL?",
    "opciones": [
      "El bloque DDL y el bloque DML.",
      "El miembro ancla (Anchor Member) que inicializa la recursión y el miembro recursivo (Recursive Member) que hace referencia a la propia CTE .",
      "La función de hash y la clave simétrica.",
      "El índice agrupado y el índice no agrupado."
    ],
    "correcta": 1,
    "explicacion": "Una CTE recursiva consta de: 1) Consulta ancla (caso base sin recursión), 2) UNION ALL, y 3) Consulta recursiva que une el resultado anterior hasta agotar la condición de parada."
  },
  {
    "id": 58,
    "categoria": "Agrupación & Analítica",
    "pregunta": "¿Qué función analítica permite identificar el primer valor de un conjunto ordenado dentro de una partición?",
    "opciones": [
      "INITIAL_VALUE().",
      "FIRST_VALUE() .",
      "TOP_ROW().",
      "START_VAL()."
    ],
    "correcta": 1,
    "explicacion": "FIRST_VALUE(Columna) OVER(PARTITION BY ... ORDER BY ...) devuelve el primer valor de la ventana definida según el criterio de ordenamiento."
  },
  {
    "id": 59,
    "categoria": "Agrupación & Analítica",
    "pregunta": "Al utilizar LAST_VALUE() en una función de ventana, ¿por qué es frecuente obtener el valor de la fila corriente si no se especifica el marco ROWS?",
    "opciones": [
      "Porque LAST_VALUE está obsoleto en los motores relacionales.",
      "Porque el marco por defecto es RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW, limitando la visión de la ventana hasta la fila actual .",
      "Porque LAST_VALUE solo funciona en orden ascendente estricto.",
      "Porque requiere que la tabla contenga al menos un millón de registros."
    ],
    "correcta": 1,
    "explicacion": "Por defecto el marco de ventana termina en CURRENT ROW; para que LAST_VALUE observe toda la partición debe definirse ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING."
  },
  {
    "id": 60,
    "categoria": "Agrupación & Analítica",
    "pregunta": "¿Cuál de las siguientes funciones calcula el percentil continuo de una distribución numérica en SQL Server y PostgreSQL?",
    "opciones": [
      "PERCENTILE_CONT() WITHIN GROUP (ORDER BY Columna) .",
      "MEDIAN_SPLIT().",
      "DIST_PERCENT().",
      "QUANTILE_FILTER()."
    ],
    "correcta": 0,
    "explicacion": "PERCENTILE_CONT(x) WITHIN GROUP (ORDER BY Columna) es la función analítica estándar para calcular percentiles interpolados continuos sobre distribuciones numéricas."
  },
  {
    "id": 61,
    "categoria": "Rendimiento & Optimización",
    "pregunta": "¿Qué es un Índice Agrupado (Clustered Index) en SQL Server y MySQL InnoDB?",
    "opciones": [
      "Un índice que agrupa múltiples bases de datos en un clúster de alta disponibilidad.",
      "Un índice cuya estructura en árbol B define y contiene el ordenamiento físico real de las páginas de datos de la tabla .",
      "Un índice especial reservado exclusivamente para campos de tipo fecha.",
      "Un archivo secundario de respaldo que se crea en memoria RAM."
    ],
    "correcta": 1,
    "explicacion": "El Clustered Index determina la organización física en disco de las páginas de datos en el nivel de hoja (Leaf Level) del árbol B+. Por esta razón solo puede existir uno por tabla."
  },
  {
    "id": 62,
    "categoria": "Rendimiento & Optimización",
    "pregunta": "¿Cuál es la diferencia entre un Index Seek y un Index Scan en un plan de ejecución?",
    "opciones": [
      "Index Scan recorre únicamente la primera página; Index Seek recorre toda la tabla.",
      "Index Seek navega por el árbol B directamente hacia las páginas que contienen las claves buscadas; Index Scan recorre todas las hojas del índice de punta a punta .",
      "Index Seek solo se utiliza en bases de datos NoSQL.",
      "Index Scan es siempre más veloz que Index Seek cuando la tabla tiene más de 100,000 filas."
    ],
    "correcta": 1,
    "explicacion": "Index Seek es una búsqueda selectiva directa y eficiente a través de los nodos del árbol B. Index Scan examina todas las páginas del índice porque no puede acotar por clave."
  },
  {
    "id": 63,
    "categoria": "Rendimiento & Optimización",
    "pregunta": "¿Qué significa el concepto de 'Sargability' (Search Argument Able) en la escritura de consultas SQL?",
    "opciones": [
      "Que la consulta puede ser auditada por un inspector de ciberseguridad.",
      "Que los predicados de búsqueda están estructurados de forma que el motor pueda utilizar operadores eficientes de búsqueda por índice (Index Seek) sin requerir evaluaciones fila por fila .",
      "Que la base de datos se encuentra alojada en una arquitectura en la nube con balanceador de carga.",
      "Que la tabla base tiene una clave primaria compuesta por al menos tres columnas."
    ],
    "correcta": 1,
    "explicacion": "Un predicado es sargable cuando el motor puede aislar el rango de búsqueda en un índice sin aplicar transformaciones, funciones o conversiones implícitas sobre la columna indexada."
  },
  {
    "id": 64,
    "categoria": "Rendimiento & Optimización",
    "pregunta": "¿Qué problema de rendimiento provoca una conversión implícita de tipos de datos en la cláusula WHERE (ejemplo: Columna VARCHAR comparada con un valor NVARCHAR o Entero)?",
    "opciones": [
      "Ninguno, el motor SQL optimiza las conversiones en nanosegundos.",
      "El motor se ve obligado a convertir el tipo de dato de la columna para cada fila de la tabla, invalidando el Index Seek y causando un Scan masivo de CPU .",
      "La base de datos bloquea el archivo de transacciones impidiendo nuevos INSERTs.",
      "Se corrompen los datos de la clave foránea en disco."
    ],
    "correcta": 1,
    "explicacion": "La conversión implícita rompe la sargabilidad: el motor debe ejecutar internamente la función de conversión para cada fila antes de evaluar el predicado, forzando un costoso Scan."
  },
  {
    "id": 65,
    "categoria": "Rendimiento & Optimización",
    "pregunta": "¿Qué es un Índice Cubierto (Covering Index) y cómo beneficia el rendimiento de una consulta?",
    "opciones": [
      "Es un índice que cubre físicamente dos tablas distintas en el mismo archivo.",
      "Es un índice no agrupado que incluye todas las columnas requeridas por la consulta (tanto en claves de búsqueda como en cláusula INCLUDE), eliminando la necesidad de realizar costosos Key Lookups .",
      "Es un índice cifrado mediante un certificado digital bancario.",
      "Es un índice que se actualiza únicamente durante la noche."
    ],
    "correcta": 1,
    "explicacion": "Un índice cubierto satisface la consulta completa desde sus propias páginas de índice sin tener que acceder a la tabla base (eliminando los saltos aleatorios de Key/Bookmark Lookup)."
  },
  {
    "id": 66,
    "categoria": "Rendimiento & Optimización",
    "pregunta": "En SQL Server, ¿cuál es el propósito de la cláusula INCLUDE en la creación de un índice no agrupado?",
    "opciones": [
      "Incluir la tabla en las copias de seguridad diferenciales.",
      "Almacenar columnas adicionales únicamente en el nivel hoja del índice sin agregarlas a las páginas intermedias del árbol B, ahorrando espacio y evitando límites de tamaño de clave .",
      "Forzar que la columna sea indexada en orden ascendente y descendente a la vez.",
      "Obligar a que la columna admita valores duplicados obligatoriamente."
    ],
    "correcta": 1,
    "explicacion": "Las columnas en INCLUDE se guardan solo en las hojas del índice; no forman parte de la clave de búsqueda del árbol B, cubriendo la consulta con mínimo impacto de mantenimiento."
  },
  {
    "id": 67,
    "categoria": "Rendimiento & Optimización",
    "pregunta": "¿Qué impacto negativo produce un exceso desmedido de índices en una tabla de alta transaccionalidad (OLTP) de tickets?",
    "opciones": [
      "Las consultas SELECT se vuelven un 500% más lentas.",
      "Las operaciones de INSERT, UPDATE y DELETE se degradan significativamente porque cada modificación requiere actualizar simultáneamente todos los índices asociados en disco .",
      "Se deshabilita el protocolo TCP/IP del servidor.",
      "La base de datos rechaza conexiones de clientes externos."
    ],
    "correcta": 1,
    "explicacion": "Los índices aceleran las lecturas (SELECT), pero penalizan las escrituras (INSERT, UPDATE, DELETE) debido al overhead de mantener las estructuras de árbol B y divisiones de página (Page Splits)."
  },
  {
    "id": 68,
    "categoria": "Rendimiento & Optimización",
    "pregunta": "¿Qué es la 'Fragmentación de Índices' y qué comando se utiliza para mitigarla cuando supera el 30% en SQL Server?",
    "opciones": [
      "Es el borrado accidental de datos; se mitiga con RESTORE DATABASE.",
      "Es el desorden físico y huecos vacíos en las páginas de datos producto de modificaciones continuas; se mitiga mediante ALTER INDEX ... REBUILD .",
      "Es la falta de memoria en la caché del buffer pool; se mitiga con DBCC DROPCLEANBUFFERS.",
      "Es un error en la configuración del puerto 1433."
    ],
    "correcta": 1,
    "explicacion": "La fragmentación externa e interna reduce la eficiencia del I/O de disco. Cuando supera el 30% se recomienda un REBUILD completo (o REORGANIZE si está entre 5% y 30%)."
  },
  {
    "id": 69,
    "categoria": "Rendimiento & Optimización",
    "pregunta": "¿Cuál es el rol de las Estadísticas (Statistics) en los motores de base de datos relacionales?",
    "opciones": [
      "Calcular las comisiones de los vendedores de telecomunicaciones.",
      "Proveer al optimizador de consultas histogramas sobre la distribución y cardinalidad de los datos para que elija el plan de ejecución más eficiente (algoritmo de join, uso de índices, memoria requerida) .",
      "Controlar la temperatura de los discos duros en el datacenter.",
      "Generar gráficos estadísticos en el portal de administración."
    ],
    "correcta": 1,
    "explicacion": "Las estadísticas describen la cardinalidad y distribución de valores mediante histogramas. Con estadísticas desactualizadas, el optimizador tomará decisiones erróneas generando planes lentos."
  },
  {
    "id": 70,
    "categoria": "Rendimiento & Optimización",
    "pregunta": "¿Qué operador en un plan de ejecución gráfico indica que el motor tuvo que recurrir a la tabla base para obtener columnas faltantes que no estaban en el índice no agrupado?",
    "opciones": [
      "Table Spool.",
      "Key Lookup (Clustered) o RID Lookup (Heap) .",
      "Stream Aggregate.",
      "Compute Scalar."
    ],
    "correcta": 1,
    "explicacion": "El Key Lookup indica que tras buscar en el índice no agrupado, el motor debió saltar al índice clustered para leer atributos complementarios, consumiendo operaciones I/O adicionales."
  },
  {
    "id": 71,
    "categoria": "Rendimiento & Optimización",
    "pregunta": "¿Qué es un Índice Filtrado (Filtered Index / Partial Index) en SQL Server y PostgreSQL?",
    "opciones": [
      "Un índice que solo indexa un subconjunto de filas que cumplen una condición WHERE (por ejemplo, WHERE Estado_Ticket = 'Abierto'), ahorrando espacio y acelerando consultas frecuentes .",
      "Un índice que impide el acceso a usuarios no autorizados por firewall.",
      "Un índice exclusivo para columnas con datos de tarjeta de crédito.",
      "Un índice que comprime los textos en formato GZIP."
    ],
    "correcta": 0,
    "explicacion": "Los índices filtrados indizan únicamente las filas relevantes (ej. tickets abiertos, que son una fracción pequeña del total histórico), reduciendo drásticamente el tamaño del índice y su costo de mantenimiento."
  },
  {
    "id": 72,
    "categoria": "Rendimiento & Optimización",
    "pregunta": "¿Qué instrucción permite inspeccionar el plan de ejecución estimado en PostgreSQL mediante la consola psql?",
    "opciones": [
      "SHOW PLAN FOR SELECT.",
      "EXPLAIN (ANALYZE, BUFFERS) SELECT .",
      "TRACE QUERY SELECT.",
      "SP_HELPPLAN SELECT."
    ],
    "correcta": 1,
    "explicacion": "EXPLAIN ANALYZE ejecuta la consulta en PostgreSQL y devuelve el plan detallado con tiempos reales de ejecución, consumo de buffers de memoria y cantidad real vs estimada de filas."
  },
  {
    "id": 73,
    "categoria": "Rendimiento & Optimización",
    "pregunta": "¿Qué significa el término 'Parameter Sniffing' en SQL Server?",
    "opciones": [
      "Un ataque de inyección SQL mediante parámetros maliciosos.",
      "El mecanismo por el cual el optimizador compila un plan de ejecución basado en los valores de los parámetros pasados en la primera invocación, el cual puede ser contraproducente si llamadas futuras usan valores con distribución diferente .",
      "La inspección de paquetes en la tarjeta de red del servidor.",
      "El reinicio automático de los procedimientos almacenados al superar 100 usuarios concurrentes."
    ],
    "correcta": 1,
    "explicacion": "Parameter sniffing optimiza el plan para el primer valor parametrizado recibido. Si ese valor es atípico (skewed data), el plan guardado en caché puede resultar catastrófico para otros valores."
  },
  {
    "id": 74,
    "categoria": "Rendimiento & Optimización",
    "pregunta": "¿Cuál de las siguientes prácticas previene eficazmente los ataques de Inyección SQL (SQL Injection)?",
    "opciones": [
      "Concatenar directamente las variables del usuario dentro de la cadena SQL.",
      "Utilizar consultas parametrizadas (Prepared Statements / Parámetros SqlCommand / PDO) u ORMs seguros .",
      "Aumentar el tamaño de la memoria RAM del servidor a 128 GB.",
      "Deshabilitar las claves foráneas en la base de datos."
    ],
    "correcta": 1,
    "explicacion": "Las consultas parametrizadas separan la estructura del código SQL de los datos proporcionados por el usuario, tratando cualquier entrada como un literal y anulando la inyección de comandos."
  },
  {
    "id": 75,
    "categoria": "Rendimiento & Optimización",
    "pregunta": "¿Qué es un Índice Columnar (Columnstore Index) y para qué tipo de cargas de trabajo está diseñado?",
    "opciones": [
      "Un índice diseñado para transacciones OLTP de alta concurrencia de inserción de una sola fila.",
      "Un índice que almacena y comprime los datos por columnas en lugar de por filas, optimizado para analítica masiva (OLAP / Data Warehousing) y agregaciones a escala de gigabytes/terabytes .",
      "Un índice que solo permite almacenar datos de tipo texto.",
      "Un índice que conecta SQL Server directamente con Microsoft Excel."
    ],
    "correcta": 1,
    "explicacion": "Columnstore almacena los datos en formato columnar con altísima compresión (hasta 10x), permitiendo al motor leer solo las columnas necesarias y aplicar ejecución en modo por lotes (Batch Mode)."
  },
  {
    "id": 76,
    "categoria": "Transacciones & ACID",
    "pregunta": "¿Qué significa el acrónimo ACID en la teoría de bases de datos relacionales?",
    "opciones": [
      "Algoritmo, Código, Índice, Despliegue.",
      "Atomicidad, Consistencia, Aislamiento (Isolation), Durabilidad .",
      "Auditoría, Ciberseguridad, Integridad, Disponibilidad.",
      "Autenticación, Certificado, IP, Dominio."
    ],
    "correcta": 1,
    "explicacion": "ACID define las 4 propiedades clave para garantizar la confiabilidad transaccional: Atomicidad (todo o nada), Consistencia (respeto de reglas), Aislamiento (sin interferencias) y Durabilidad (persistencia confirmada)."
  },
  {
    "id": 77,
    "categoria": "Transacciones & ACID",
    "pregunta": "¿Qué propiedad de ACID garantiza que si una transacción falla en la mitad de su ejecución, todos los cambios realizados hasta ese momento se reviertan completamente?",
    "opciones": [
      "Consistencia.",
      "Atomicidad .",
      "Aislamiento.",
      "Durabilidad."
    ],
    "correcta": 1,
    "explicacion": "La Atomicidad garantiza que una unidad lógica de trabajo se complete en su totalidad o no tenga ningún efecto (principio de 'todo o nada' mediante COMMIT o ROLLBACK)."
  },
  {
    "id": 78,
    "categoria": "Transacciones & ACID",
    "pregunta": "¿Cuál es el nivel de aislamiento de transacciones más permisivo que permite 'Lecturas Sucias' (Dirty Reads)?",
    "opciones": [
      "SERIALIZABLE.",
      "READ UNCOMMITTED (o hint NOLOCK) .",
      "REPEATABLE READ.",
      "SNAPSHOT ISOLATION."
    ],
    "correcta": 1,
    "explicacion": "READ UNCOMMITTED permite leer datos que están siendo modificados por otra transacción activa que aún no ha hecho COMMIT, arriesgando leer datos inconsistentes si esa transacción aborta."
  },
  {
    "id": 79,
    "categoria": "Transacciones & ACID",
    "pregunta": "¿Qué es un 'Deadlock' (Interbloqueo) entre dos transacciones en un motor relacional?",
    "opciones": [
      "La desconexión física del cable de fibra óptica del servidor.",
      "Una situación de bloqueo mutuo donde la Transacción A bloquea el Recurso 1 y espera por el Recurso 2, mientras la Transacción B bloquea el Recurso 2 y espera por el Recurso 1 .",
      "Un fallo de disco provocado por falta de espacio en tempdb.",
      "Un error al compilar una vista materializada."
    ],
    "correcta": 1,
    "explicacion": "Un Deadlock es un ciclo de dependencias de bloqueo irresoluble entre dos o más sesiones. El motor interviene activamente mediante un 'Deadlock Monitor' eligiendo a una como víctima (victim) y haciéndole ROLLBACK."
  },
  {
    "id": 80,
    "categoria": "Transacciones & ACID",
    "pregunta": "¿En qué consiste el nivel de aislamiento SNAPSHOT en SQL Server y PostgreSQL?",
    "opciones": [
      "Toma una captura de pantalla del monitor del administrador cada hora.",
      "Utiliza control de versiones de filas en tempdb (o tuplas MVCC) para permitir que los lectores no bloqueen a los escritores y los escritores no bloqueen a los lectores, leyendo una versión consistente al inicio de la transacción .",
      "Bloquea la tabla completa en modo exclusivo impidiendo cualquier lectura.",
      "Deshabilita las claves foráneas durante las horas pico de atención."
    ],
    "correcta": 1,
    "explicacion": "Snapshot Isolation provee concurrencia optimista sin bloqueos de lectura compartidos (S-Locks), sirviendo versiones históricas consistentes desde el almacén de versiones (Version Store)."
  },
  {
    "id": 81,
    "categoria": "Transacciones & ACID",
    "pregunta": "¿Qué anomalía de concurrencia resuelve el nivel de aislamiento REPEATABLE READ frente a READ COMMITTED?",
    "opciones": [
      "Lecturas Sucias (Dirty Reads).",
      "Lecturas No Repetibles (Non-Repeatable Reads), garantizando que si lees una fila dos veces en la misma transacción obtendrás exactamente los mismos valores .",
      "Lecturas Fantasma (Phantom Reads).",
      "Violaciones de clave foránea en tiempo de compilación."
    ],
    "correcta": 1,
    "explicacion": "REPEATABLE READ mantiene bloqueos compartidos sobre las filas leídas hasta el final de la transacción, evitando que otra sesión modifique o elimine esas filas antes del COMMIT."
  },
  {
    "id": 82,
    "categoria": "Transacciones & ACID",
    "pregunta": "¿Qué es una 'Lectura Fantasma' (Phantom Read)?",
    "opciones": [
      "Una lectura realizada por un usuario anónimo a través de un proxy.",
      "Ocurre cuando una transacción consulta un rango de filas que cumplen un predicado y, al repetir la consulta en la misma transacción, encuentra filas adicionales que fueron insertadas y confirmadas por otra transacción .",
      "La lectura de registros eliminados físicamente del disco duro.",
      "Un fallo de renderizado en el navegador web."
    ],
    "correcta": 1,
    "explicacion": "Las lecturas fantasma ocurren cuando otra transacción inserta nuevas filas dentro del rango consultado. Solo se previenen con SERIALIZABLE (bloqueos de rango de clave / Key-Range Locks) o Snapshot."
  },
  {
    "id": 83,
    "categoria": "Transacciones & ACID",
    "pregunta": "¿Cuál es la función del archivo de registro de transacciones (Transaction Log / WAL)?",
    "opciones": [
      "Guardar las contraseñas de los usuarios en texto plano.",
      "Registrar de forma secuencial y duradera todas las modificaciones antes de que se escriban físicamente en las páginas de datos (Write-Ahead Logging / WAL), permitiendo recuperación ante fallos y rollbacks .",
      "Almacenar las consultas de búsqueda de Google Analytics.",
      "Servir de servidor de correo SMTP para notificaciones."
    ],
    "correcta": 1,
    "explicacion": "El protocolo Write-Ahead Logging (WAL) asegura que ninguna modificación de datos se confirme en disco sin que antes su registro de log esté persistentemente escrito, garantizando Durabilidad y Recuperación."
  },
  {
    "id": 84,
    "categoria": "Transacciones & ACID",
    "pregunta": "¿Qué comando revierte todos los cambios de una transacción explícita abierta en SQL?",
    "opciones": [
      "COMMIT TRANSACTION;.",
      "ROLLBACK TRANSACTION; .",
      "UNDO ALL CHANGES;.",
      "RESTORE TRANSACTION;."
    ],
    "correcta": 1,
    "explicacion": "ROLLBACK revierte la totalidad de las operaciones realizadas dentro de la transacción activa devolviendo la base de datos al estado previo al BEGIN TRANSACTION."
  },
  {
    "id": 85,
    "categoria": "Transacciones & ACID",
    "pregunta": "¿Para qué sirve un punto de retorno o 'SAVEPOINT' en una transacción SQL?",
    "opciones": [
      "Para pausar el servidor durante el mantenimiento de energía.",
      "Para crear un marcador interno que permite realizar reversiones parciales (ROLLBACK TO SAVEPOINT) sin cancelar la transacción completa .",
      "Para reiniciar los contadores de las claves primarias.",
      "Para sincronizar la hora del servidor con el reloj atómico internacional."
    ],
    "correcta": 1,
    "explicacion": "SAVEPOINT define un punto de control intermedio dentro de una transacción amplia, permitiendo abortar solo una porción del proceso si ocurre un error controlado y continuar con el resto."
  },
  {
    "id": 86,
    "categoria": "Telecom & Auditoría INDOTEL",
    "pregunta": "¿Cuál es el rol de INDOTEL (Instituto Dominicano de las Telecomunicaciones) en el monitoreo de SLAs de operadoras?",
    "opciones": [
      "Cobrar las facturas mensuales a los usuarios residenciales.",
      "Regular, fiscalizar y auditar el cumplimiento de los tiempos de restablecimiento de averías y la calidad del servicio de telecomunicaciones conforme a la Ley General de Telecomunicaciones 153-98 .",
      "Fabricar cables de fibra óptica para la red nacional.",
      "Gestionar el departamento de atención al cliente de Claro Dominicana."
    ],
    "correcta": 1,
    "explicacion": "INDOTEL es el ente regulador de República Dominicana que fiscaliza el cumplimiento de normas de calidad de servicio, tiempos de resolución técnica (SLAs) y derechos del usuario."
  },
  {
    "id": 87,
    "categoria": "Telecom & Auditoría INDOTEL",
    "pregunta": "En la arquitectura de base de datos presentada, ¿cuándo se dispara una condición de 'Violación de SLA INDOTEL'?",
    "opciones": [
      "Cuando el cliente cancela su contrato de servicio.",
      "Cuando el Tiempo_Resolucion_Horas de un ticket de avería supera el SLA_Compromiso_Horas fijado por la norma técnica .",
      "Cuando la dirección IP asignada pertenece al rango 192.168.1.1.",
      "Cuando el ticket es asignado a un técnico con menos de un año de antigüedad."
    ],
    "correcta": 1,
    "explicacion": "Se incurre en violación de SLA siempre que la duración de indisponibilidad técnica (Tiempo_Resolucion_Horas) excede la ventana máxima regulatoria pactada (SLA_Compromiso_Horas)."
  },
  {
    "id": 88,
    "categoria": "Telecom & Auditoría INDOTEL",
    "pregunta": "¿Qué cláusula SQL permite calcular el tiempo exacto transcurrido en horas con decimales entre dos fechas de un ticket en SQL Server?",
    "opciones": [
      "CAST(DATEDIFF(MINUTE, Fecha_Apertura, Fecha_Cierre) / 60.0 AS DECIMAL(8,2)) .",
      "Fecha_Cierre - Fecha_Apertura * 24.",
      "HOUR_DIFF(Fecha_Apertura, Fecha_Cierre).",
      "SUBTRACT(Fecha_Cierre, Fecha_Apertura)."
    ],
    "correcta": 0,
    "explicacion": "Calcular la diferencia en minutos dividida entre 60.0 con decimales previene el truncamiento entero propio de DATEDIFF(hour, ...), logrando precisión de minutos."
  },
  {
    "id": 89,
    "categoria": "Telecom & Auditoría INDOTEL",
    "pregunta": "¿Por qué se utiliza una columna computada persistida (PERSISTED) o un Trigger para el estado regulatorio en bases de datos empresariales?",
    "opciones": [
      "Para que el código fuente se imprima en formato PDF.",
      "Para garantizar que el cálculo de SLA se almacene físicamente y pueda ser indexado eficientemente para reportes de auditoría en tiempo real .",
      "Para ocultar la penalidad a los inspectores de INDOTEL.",
      "Para evitar que la base de datos requiera copias de seguridad."
    ],
    "correcta": 1,
    "explicacion": "Una columna computada PERSISTED calcula el valor al insertar o modificar la fila y lo almacena físicamente, permitiendo crear índices sobre ella para búsquedas ultrarrápidas."
  },
  {
    "id": 90,
    "categoria": "Telecom & Auditoría INDOTEL",
    "pregunta": "¿Cuál de las siguientes consultas aísla los 5 clientes con mayor volumen de penalidades acumuladas por fallas de servicio?",
    "opciones": [
      "SELECT TOP 5 C.Nombre_Completo, SUM(A.Monto_Penalidad_DOP) FROM Clientes C JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente JOIN Auditoria_Regulatoria_INDOTEL A ON T.ID_Ticket = A.ID_Ticket GROUP BY C.Nombre_Completo ORDER BY SUM(A.Monto_Penalidad_DOP) DESC; .",
      "SELECT C.Nombre_Completo FROM Clientes C WHERE C.Segmento = 'VIP' LIMIT 5;.",
      "SELECT TOP 5 * FROM Auditoria_Regulatoria_INDOTEL ORDER BY Fecha_Fiscalizacion;.",
      "SELECT COUNT(*) FROM Tickets_Averias T GROUP BY T.ID_Cliente;."
    ],
    "correcta": 0,
    "explicacion": "La consulta realiza el cruce relacional entre Clientes, Tickets y Auditorías, totalizando las penalidades por cliente y ordenando de mayor a menor con corte TOP 5."
  },
  {
    "id": 91,
    "categoria": "Telecom & Auditoría INDOTEL",
    "pregunta": "En una red troncal de telecomunicaciones (MPLS / Fibra), ¿qué indicador técnico describe la variación en el retardo de llegada de los paquetes de datos?",
    "opciones": [
      "Ancho de Banda.",
      "Jitter .",
      "Throughput.",
      "Atenuación Óptica."
    ],
    "correcta": 1,
    "explicacion": "El Jitter es la variabilidad estadística en el retardo de transmisión de paquetes de red, un parámetro crítico para servicios de voz sobre IP (VoIP) y streaming."
  },
  {
    "id": 92,
    "categoria": "Telecom & Auditoría INDOTEL",
    "pregunta": "¿Qué función cumple el particionamiento de tablas (Table Partitioning) en una tabla de auditoría con más de 50 millones de registros históricos?",
    "opciones": [
      "Divide la tabla físicamente en múltiples grupos de archivos (por ejemplo, por año o trimestre) mejorando el mantenimiento, archivado de datos y permitiendo Partition Elimination en consultas .",
      "Cifra los datos con claves de 512 bits.",
      "Convierte la base de datos relacional en una base de datos de grafos.",
      "Permite editar los datos directamente desde el Bloc de Notas de Windows."
    ],
    "correcta": 0,
    "explicacion": "El particionamiento segmenta horizontalmente tablas masivas en distintos grupos de archivos por rangos de fecha, permitiendo que el optimizador ignore particiones irrelevantes (Partition Elimination)."
  },
  {
    "id": 93,
    "categoria": "Telecom & Auditoría INDOTEL",
    "pregunta": "¿Qué técnica de alta disponibilidad en SQL Server permite mantener réplicas de bases de datos sincronizadas en tiempo real con capacidad de lectura?",
    "opciones": [
      "Always On Availability Groups .",
      "Replication Snapshot.",
      "Database Mirroring asíncrono básico.",
      "Log Shipping tradicional."
    ],
    "correcta": 0,
    "explicacion": "Always On Availability Groups es la solución insignia de alta disponibilidad y recuperación ante desastres en SQL Server, permitiendo múltiples réplicas activas para descarga de consultas de solo lectura."
  },
  {
    "id": 94,
    "categoria": "Telecom & Auditoría INDOTEL",
    "pregunta": "En PostgreSQL, ¿qué extensión nativa permite ejecutar consultas analíticas sobre direcciones IP y máscaras de subred de red de clientes (CIDR)?",
    "opciones": [
      "pg_crypto.",
      "El tipo de datos nativo 'inet' y 'cidr' con operadores de contención (<<, >>=) .",
      "postgis_raster.",
      "hstore."
    ],
    "correcta": 1,
    "explicacion": "PostgreSQL incluye soporte nativo de tipos de red como 'inet' y 'cidr', que permiten indexar y consultar rangos de direcciones IP, pertenencia a subredes y máscaras sin extensiones externas."
  },
  {
    "id": 95,
    "categoria": "Telecom & Auditoría INDOTEL",
    "pregunta": "¿Qué directiva de T-SQL se debe utilizar en un Stored Procedure para evitar el envío de mensajes de conteo de filas a la aplicación cliente, reduciendo el tráfico de red?",
    "opciones": [
      "SET NOCOUNT ON; .",
      "SET ANSI_NULLS OFF;.",
      "SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;.",
      "DISABLE NETWORK MESSAGES;."
    ],
    "correcta": 0,
    "explicacion": "SET NOCOUNT ON suprime el mensaje 'n filas afectadas' que SQL Server envía por cada instrucción DML, reduciendo el tráfico de red y mejorando sensiblemente el rendimiento de APIs."
  },
  {
    "id": 96,
    "categoria": "Telecom & Auditoría INDOTEL",
    "pregunta": "¿Cuál es la función del comando DBCC CHECKDB en SQL Server?",
    "opciones": [
      "Crear una base de datos nueva con valores predeterminados.",
      "Comprobar la integridad física y lógica de todas las páginas de datos, árboles de índices y estructuras internas del catálogo de la base de datos .",
      "Eliminar los usuarios inactivos del sistema operativo.",
      "Reiniciar los contadores de tráfico de la tarjeta de red."
    ],
    "correcta": 1,
    "explicacion": "DBCC CHECKDB audita la integridad estructural de la base de datos detectando corrupción en páginas de datos, asignación de extensiones e inconsistencias en punteros de índices."
  },
  {
    "id": 97,
    "categoria": "Telecom & Auditoría INDOTEL",
    "pregunta": "¿Qué significa el concepto de 'Query Folding' cuando un motor de BI (como Power BI) se conecta a la base de datos de telecomunicaciones?",
    "opciones": [
      "Que el reporte comprime las columnas en un archivo zip.",
      "Que las transformaciones de datos aplicadas en la interfaz de Power Query se traducen y delegan como una única consulta SQL nativa ejecutada en el servidor de base de datos .",
      "Que los datos se borran de la base de datos tras ser visualizados.",
      "Que la consulta se ejecuta exclusivamente en el navegador del cliente."
    ],
    "correcta": 1,
    "explicacion": "Query Folding permite que el motor relacional ejecute el filtrado y agregación aprovechando sus índices y memoria de servidor, en lugar de transferir millones de filas sin procesar al motor de Power BI."
  },
  {
    "id": 98,
    "categoria": "Telecom & Auditoría INDOTEL",
    "pregunta": "¿Por qué en un entorno de auditoría regulatoria se recomienda habilitar Temporal Tables (Tablas Temporales del Sistema) en SQL Server?",
    "opciones": [
      "Para que los datos se borren automáticamente al cabo de 24 horas.",
      "Para mantener un historial inmutable y automatizado por el motor de cada cambio (versiones históricas con fechas de validez del sistema), permitiendo consultas en cualquier punto del tiempo (AS OF) .",
      "Para acelerar la inserción de datos en memoria volátil.",
      "Para evitar el uso de claves primarias en las tablas."
    ],
    "correcta": 1,
    "explicacion": "Las Tablas Temporales con versión del sistema mantienen una tabla de histórico paralela gestionada por el motor, permitiendo reconstruir exactamente el estado de los datos en cualquier instante histórico con FOR SYSTEM_TIME AS OF."
  },
  {
    "id": 99,
    "categoria": "Telecom & Auditoría INDOTEL",
    "pregunta": "¿Qué impacto tiene definir una clave foránea con la cláusula ON DELETE CASCADE en la tabla de Tickets_Averias relacionada con Clientes?",
    "opciones": [
      "Impide que cualquier usuario pueda eliminar un cliente de la base de datos.",
      "Al eliminar un registro de la tabla Clientes, el motor eliminará automáticamente y sin previo aviso todos los tickets de avería históricos asociados a ese cliente .",
      "Copia los tickets eliminados a una hoja de cálculo de Microsoft Excel.",
      "Dispara un correo de alerta al ente regulador INDOTEL."
    ],
    "correcta": 1,
    "explicacion": "ON DELETE CASCADE propaga el borrado: si se suprime el registro padre (Cliente), el motor purga silenciosamente todos los registros hijos dependientes (Tickets), lo que puede destruir evidencia de auditoría si no se controla."
  },
  {
    "id": 100,
    "categoria": "Telecom & Auditoría INDOTEL",
    "pregunta": "¿Cuál es el principio rector de gobernanza y seguridad de datos bajo el estándar bancario y de telecomunicaciones del Ing. Juancito Peña?",
    "opciones": [
      "Dejar las credenciales de administración 'sa' con contraseña en blanco para facilitar pruebas.",
      "Principio de Menor Privilegio (PoLP), auditoría inmutable de transacciones, cero código en producción sin validación estricta y blindaje continuo contra pérdida accidental de datos .",
      "Permitir acceso directo a todas las tablas desde cualquier conexión pública sin VPN.",
      "Deshabilitar los índices durante el horario laboral para no recalentar los servidores."
    ],
    "correcta": 1,
    "explicacion": "La gobernanza empresarial moderna exige mínima superficie de ataque (Least Privilege), trazabilidad auditable inmutable, despliegues seguros, cero deuda técnica y salvaguarda absoluta de los activos de información."
  }
];

// Exportación en contexto global para uso en quiz-engine.js
window.BANCO_PREGUNTAS_100 = BANCO_PREGUNTAS_100;
