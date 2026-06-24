# Práctica Calificada 2 — Proyecto Final de Carrera III

**Facultad:** Facultad de Ingeniería e Inteligencia Artificial  
**Programas:** Ingeniería de Sistemas de Información, Ingeniería de Software, Ciencia de Datos e IA, Ingeniería en Ciberseguridad, Ingeniería en Inteligencia Artificial  
**Fecha del documento:** 26/04/26  

---

## Datos generales de la evaluación

| Campo | Información |
|---|---|
| **Curso / Clase** | Proyecto Final de Carrera III |
| **Actividad** | Práctica Calificada 2 |
| **Docente** | Ing. Kenny Neira |
| **Duración** | 120 minutos |
| **Semestre** | 2026 – 1 |
| **Ciclo** | I |
| **Tipo** | “D” |
| **Fecha** | 30/04/26 |
| **Apellidos y Nombres** |  |
| **Calificación** |  |

---

# Caso 4 — Vendedores de ceviche de pota

La pota, también conocida como calamar gigante, es una alternativa barata al pescado, lo que permite vender ceviche a precios muy bajos en carretillas y puestos ambulantes.

Es comida accesible y popular, pero su preparación con marisco crudo, sin cadena de frío garantizada ni control sanitario, implica riesgos de salud. Además, muchos vendedores operan sin licencia y a veces la pota se ofrece como si fuera otro pescado.

---

## Reglas de evaluación

- Todo lo entregado, incluyendo código, diagramas y tablero Scrum, debe ser entregado en un informe detallado.
- La solución desplegada debe estar accesible mediante una URL pública.

---

# Pregunta 1 — Metodología DevOps y stack tecnológico

**Puntaje:** 2 puntos

## Enunciado

Explicar cómo se aplica DevOps al proyecto de solución, detallando el stack tecnológico elegido y justificando cada componente.

## Rúbrica

| Criterio | Qué se evalúa | Puntos |
|---|---|---:|
| **Explicación de DevOps** | Define principios y fases con claridad, no solo lista herramientas. | 0.75 |
| **Stack justificado** | Cada herramienta se elige con argumento y coherencia con el caso. | 0.75 |
| **Vínculo con el problema** | Conecta DevOps con la solución del caso elegido. | 0.5 |
| **TOTAL** |  | **2** |

---

# Pregunta 2 — Diagramas: casos de uso y arquitectura

**Puntaje:** 2 puntos

## Enunciado

Presentar los diagramas que modelan la solución. Deben usar notación correcta y ser consistentes con lo que luego se implementa.

## Diagramas solicitados

### 1. Diagrama de casos de uso UML

Debe incluir:

- Actores.
- Interacciones principales con el sistema.
- Casos de uso completos y coherentes con la solución.

### 2. Arquitectura lógica

Debe representar las capas y componentes del sistema, por ejemplo:

- Frontend.
- Backend / API.
- Base de datos.
- Servicios.
- Autenticación.
- Comunicación entre componentes.

### 3. Arquitectura física en nube

Debe mostrar los servicios reales del proveedor elegido, por ejemplo:

- Balanceador de carga.
- Instancias de cómputo o contenedores.
- Base de datos gestionada.
- Almacenamiento.
- Red / VPC.
- CDN.
- Despliegue real de la solución.

## Rúbrica

| Criterio | Qué se evalúa | Puntos |
|---|---|---:|
| **Diagrama de casos de uso** | Notación UML correcta, actores y casos completos. | 0.5 |
| **Arquitectura lógica** | Componentes y relaciones claras y coherentes. | 0.75 |
| **Arquitectura física en nube** | Servicios reales del proveedor, no genéricos. | 0.75 |
| **TOTAL** |  | **2** |

---

# Pregunta 3 — Planificación con Scrum

**Puntaje:** 6 puntos

## Enunciado

Planificar el desarrollo del proyecto aplicando el marco Scrum. Se evalúa la calidad de la planificación y la evidencia: tablero, backlog y capturas.

## Elementos solicitados

### Product Backlog

Debe incluir historias de usuario bien formuladas.

### Estimación

Debe incluir:

- Story points.
- Planning poker u otra técnica de estimación.
- Definición de la velocidad esperada.

### Sprints

Debe incluir:

- Número de sprints.
- Duración de cada sprint.
- Objetivo del sprint, también llamado *Sprint Goal*.
- Sprint Backlog de al menos el primer sprint.

### Ceremonias Scrum

Deben estar descritas y aplicadas:

- Sprint Planning.
- Daily Scrum.
- Sprint Review.
- Sprint Retrospective.

### Artefactos

Debe incluir:

- Definition of Done.
- Criterios de aceptación.
- Tablero con columnas **To Do / In Progress / Done**.
- Evidencia del tablero mediante capturas.
- Burndown chart, si es posible.

## Rúbrica

| Criterio | Qué se evalúa | Puntos |
|---|---|---:|
| **Product Backlog e historias** | Historias bien formuladas y priorizadas. | 2 |
| **Sprints y estimación** | Sprint goals, sprint backlog y story points. | 2 |
| **Ceremonias Scrum** | Planning, daily, review y retrospectiva aplicadas. | 1 |
| **DoD, criterios y tablero** | Definition of Done, criterios de aceptación y evidencia del tablero. | 1 |
| **TOTAL** |  | **6** |

---

# Pregunta 4 — Implementación y despliegue en nube

**Puntaje:** 10 puntos

## Enunciado

Construir y desplegar el MVP de la solución. Esta es la parte central del examen y requiere evidencia funcional.

## Elementos solicitados

### Base de datos

Debe incluir:

- Modelo entidad-relación.
- Esquema normalizado.
- Implementación con datos de prueba.
- Justificación de la elección entre base de datos relacional o NoSQL.

### MVP funcional

Debe presentar al menos las funcionalidades núcleo del caso elegido, operativas y demostrables.

### Estrategia de branching en el repositorio

Debe estar acorde al stack elegido e incluir:

- Flujo de ramas aplicado.
- Ramas como `main`, `develop` y `feature`.
- Commits descriptivos.
- Pull Requests revisados.
- Evidencia del uso del flujo de trabajo.

### Despliegue en la nube

Debe cumplir con:

- Solución desplegada.
- Acceso mediante URL pública o demostración en vivo.
- Estabilidad de la solución en la nube.

### Pipeline CI/CD

Debe incluir automatización de:

- Build.
- Pruebas.
- Despliegue.
- Evidencia de ejecuciones exitosas.

## Rúbrica

| Criterio | Qué se evalúa | Puntos |
|---|---|---:|
| **Base de datos** | Modelo ER, normalización e implementación con datos. | 2 |
| **MVP funcional** | Funcionalidades núcleo operativas y demostrables. | 3 |
| **Estrategia de branching** | Flujo de ramas aplicado, commits y PRs con evidencia. | 2 |
| **Despliegue en nube** | Solución accesible y estable en la nube. | 2 |
| **Pipeline CI/CD** | Automatización de build, test y deploy funcionando. | 1 |
| **TOTAL** |  | **10** |

---

# Resumen de puntajes

| Pregunta | Tema | Puntaje |
|---:|---|---:|
| 1 | Metodología DevOps y stack tecnológico | 2 |
| 2 | Diagramas: casos de uso y arquitectura | 2 |
| 3 | Planificación con Scrum | 6 |
| 4 | Implementación y despliegue en nube | 10 |
|  | **TOTAL GENERAL** | **20** |

---

# Lista de entregables esperados

A partir de las instrucciones del documento, el informe final debería contener como mínimo:

1. Explicación de la metodología DevOps aplicada al proyecto.
2. Stack tecnológico elegido y justificado.
3. Relación entre DevOps y el problema de vendedores de ceviche de pota.
4. Diagrama de casos de uso UML.
5. Diagrama de arquitectura lógica.
6. Diagrama de arquitectura física en nube con servicios reales.
7. Product Backlog con historias de usuario.
8. Estimación con story points.
9. Velocidad esperada del equipo.
10. Planificación de sprints.
11. Sprint Goal de cada sprint.
12. Sprint Backlog del primer sprint.
13. Descripción de ceremonias Scrum.
14. Definition of Done.
15. Criterios de aceptación.
16. Evidencia del tablero Scrum.
17. Burndown chart, si es posible.
18. Modelo entidad-relación de la base de datos.
19. Esquema normalizado de la base de datos.
20. Datos de prueba.
21. Justificación de base de datos relacional o NoSQL.
22. MVP funcional.
23. Evidencia de funcionalidades núcleo.
24. Estrategia de branching.
25. Evidencia de ramas `main`, `develop` y `feature`.
26. Commits descriptivos.
27. Pull Requests revisados.
28. Despliegue en nube.
29. URL pública de la solución.
30. Pipeline CI/CD.
31. Evidencia de build, pruebas y despliegue exitosos.

---

# Observación importante

La evaluación no se limita a entregar documentos. El estudiante debe poder explicar y defender presencialmente cada parte implementada. Si no puede responder satisfactoriamente sobre una pregunta, se elimina el puntaje correspondiente a esa sección.
