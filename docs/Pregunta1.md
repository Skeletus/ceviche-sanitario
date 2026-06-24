# Pregunta 1 - Metodología DevOps y stack tecnológico

## Aplicación de DevOps en el proyecto

Para el caso de los vendedores de ceviche de pota, se propone desarrollar una solución web que permita registrar vendedores, verificar condiciones sanitarias básicas, reportar riesgos, consultar puestos autorizados y mantener evidencia de inspecciones. DevOps se aplica como una forma de trabajo que integra desarrollo, operaciones, control de calidad y despliegue continuo para entregar una solución estable, verificable y fácil de mejorar.

La metodología DevOps no se limita al uso de herramientas. En este proyecto se aplica mediante un ciclo continuo:

1. **Planificación:** se definen historias de usuario orientadas al problema, como registrar un vendedor, validar licencia, reportar condiciones de riesgo, consultar puestos seguros y revisar inspecciones sanitarias. Estas historias se priorizan según impacto en la salud pública y viabilidad del MVP.
2. **Desarrollo:** el equipo trabaja con ramas `main`, `develop` y `feature`, usando commits descriptivos y pull requests para revisar cambios antes de integrarlos. Esto reduce errores y mantiene trazabilidad sobre cada funcionalidad.
3. **Integración continua:** cada cambio enviado al repositorio ejecuta automáticamente instalación de dependencias, validación de estilo, compilación y pruebas. Así se detectan fallos antes de publicar la solución.
4. **Entrega y despliegue continuo:** cuando una versión es aprobada, el pipeline despliega automáticamente la aplicación en la nube. Esto permite mostrar avances funcionales mediante una URL pública y evita despliegues manuales propensos a errores.
5. **Monitoreo y mejora:** la aplicación registra errores, rendimiento y actividad relevante. Con esa información se corrigen fallas, se mejora la experiencia de usuario y se agregan nuevas funciones según la retroalimentación de usuarios e inspectores.

Este enfoque es adecuado porque el sistema maneja información sensible para la salud pública. Si se detecta un error en el registro de vendedores, reportes o visualización de puestos seguros, DevOps permite corregirlo, probarlo y desplegarlo rápidamente.

## Stack tecnológico elegido y justificación

| Componente | Herramienta elegida | Justificación |
|---|---|---|
| Frontend | **Next.js con React y TypeScript** | Permite construir una interfaz web rápida y mantenible para ciudadanos, vendedores e inspectores. TypeScript ayuda a reducir errores en formularios, estados de inspección y validaciones. |
| Estilos e interfaz | **Tailwind CSS** | Facilita crear pantallas responsivas para celulares, que son importantes porque vendedores e inspectores pueden usar el sistema desde campo. |
| Backend / API | **API Routes de Next.js o funciones server-side** | Centraliza la lógica del MVP sin agregar una capa innecesaria al inicio. Permite validar registros, reportes, estados de inspección y consultas desde el mismo proyecto. |
| Base de datos | **PostgreSQL mediante Supabase** | El caso requiere datos estructurados: vendedores, puestos, licencias, inspecciones, reportes y usuarios. PostgreSQL permite relaciones, integridad referencial y consultas confiables. Supabase agrega gestión simple de base de datos, autenticación y despliegue rápido. |
| Autenticación | **Supabase Auth** | Permite manejar roles como administrador, inspector, vendedor y ciudadano. Esto ayuda a controlar que cada usuario acceda solo a las funciones que le corresponden. |
| Repositorio | **GitHub** | Permite control de versiones, ramas, pull requests, revisión de cambios y evidencia del proceso de desarrollo solicitado en la evaluación. |
| CI/CD | **GitHub Actions** | Automatiza build, pruebas y despliegue. Cada pull request puede validar que la aplicación compile y que las funciones principales no fallen antes de unir cambios. |
| Despliegue | **Vercel** | Es adecuado para aplicaciones Next.js, ofrece URL pública, despliegues automáticos por rama y rollback rápido si una versión falla. |
| Contenedorización local | **Docker** | Permite levantar servicios de forma consistente en desarrollo, especialmente si se necesita ejecutar una base de datos local o reproducir el entorno antes del despliegue. |
| Monitoreo | **Vercel Analytics, logs de Vercel y Supabase Logs** | Ayudan a revisar errores, tiempos de respuesta y fallos en operaciones como login, registro de vendedores o envío de reportes. |
| Pruebas | **Vitest / React Testing Library** | Permiten validar componentes, formularios y reglas de negocio del MVP, por ejemplo campos obligatorios, estados de inspección y filtros de búsqueda. |

## Vínculo entre DevOps y el problema del caso

El problema central del caso no es solo vender ceviche de pota, sino hacerlo en un contexto de riesgo sanitario, informalidad y falta de trazabilidad. Por eso la solución debe ser confiable, actualizable y transparente. DevOps aporta valor porque permite que el sistema evolucione de manera controlada y con evidencia técnica.

Por ejemplo, si se agrega una función para registrar inspecciones sanitarias, el flujo DevOps asegura que esa funcionalidad sea desarrollada en una rama, revisada mediante pull request, probada automáticamente y desplegada sin afectar la versión estable. Si luego se detecta que un reporte ciudadano no se guarda correctamente, el equipo puede corregirlo y publicar la mejora rápidamente.

Además, la integración continua ayuda a mantener la calidad del sistema, mientras que el despliegue continuo permite que municipalidades, inspectores y ciudadanos accedan siempre a la versión más reciente desde una URL pública. Esto es importante porque la información sobre vendedores autorizados, condiciones sanitarias y reportes de riesgo debe estar disponible y actualizada.

En conclusión, DevOps se aplica al proyecto como una metodología de trabajo colaborativa, automatizada y orientada a la mejora continua. El stack elegido permite construir un MVP web funcional, desplegarlo en la nube, controlar cambios mediante GitHub, automatizar pruebas y mantener una solución coherente con el objetivo del caso: reducir riesgos sanitarios y mejorar la supervisión de la venta ambulante de ceviche de pota.
