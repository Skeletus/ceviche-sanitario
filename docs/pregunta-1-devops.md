# Pregunta 1 - Metodología DevOps y stack tecnológico

Este documento consolida la explicación de DevOps y el stack tecnológico elegido para el sistema web de supervisión sanitaria de vendedores ambulantes de ceviche de pota.

## DevOps aplicado al proyecto

DevOps se aplica como una metodología de colaboración entre desarrollo, operaciones y calidad. Para el MVP, el flujo contempla planificación ágil, control de versiones con GitHub, integración continua con GitHub Actions, despliegue posterior en Vercel y monitoreo básico mediante logs de Vercel y Supabase.

## Stack tecnológico

- **Frontend:** Next.js, React, TypeScript y Tailwind CSS.
- **Backend/API:** API Routes o funciones server-side de Next.js.
- **Base de datos y servicios:** Supabase Auth, Supabase PostgreSQL y Supabase Storage.
- **Despliegue:** Vercel Hosting y Vercel Serverless Functions.
- **CI/CD:** GitHub y GitHub Actions.

## Relación con el caso

El enfoque DevOps permite entregar incrementos funcionales verificables para registrar vendedores, consultar puestos autorizados, reportar riesgos sanitarios y gestionar inspecciones municipales. Además, facilita corregir errores y desplegar mejoras con trazabilidad, algo necesario en un sistema vinculado a salud pública y supervisión sanitaria.
