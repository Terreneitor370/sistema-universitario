# UMS Pro — Sistema de Gestión Universitaria

Sistema integral para la gestión académica y administrativa de la Universidad Central.
Proyecto académico para la materia de **Arquitectura de Software**.

## Stack tecnológico
- React 18 + Vite 6
- React Router v6 (rutas protegidas por rol)
- Zustand (estado global + persistencia)
- TanStack React Query (caché y fetching)
- React Hook Form + Zod (formularios y validación)
- Axios (HTTP client)
- Tailwind CSS v4 + CSS Variables (design tokens)
- Lucide React (iconos)

## Instalación

```bash
npm install
cp .env.example .env
npm run dev
```

Corre en http://localhost:5173

## Credenciales demo

En la pantalla de login, selecciona el rol y usa cualquier matrícula + contraseña de 6+ caracteres.

| Rol | Ruta |
|-----|------|
| Administrativo | /admin |
| Estudiante | /estudiante |
| Docente | /docente |

## Estructura

```
src/
├── components/ui/        # Button, Badge, Card, Avatar, KpiCard...
├── components/layout/    # PublicLayout, AppLayout
├── features/             # Módulos por dominio (FSD)
│   ├── auth/             # LoginPage
│   ├── landing/          # LandingPage, ContactPage
│   ├── dashboard/        # Admin, Student, Teacher dashboards
│   ├── students/         # Gestión de alumnos
│   ├── courses/          # Materias
│   ├── grades/           # Calificaciones
│   ├── schedule/         # Horarios
│   ├── finance/          # Pagos y colegiaturas
│   ├── notifications/    # Notificaciones
│   └── settings/         # Configuración
├── store/                # authStore (Zustand)
├── services/             # api.js (axios + servicios)
├── router/               # Rutas con guards por rol
└── styles/               # globals.css (design tokens)
```
