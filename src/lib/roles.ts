import type { RoleMenuItem, UserRole } from "@/types/auth";

export const ROLES = ["citizen", "vendor", "inspector", "admin"] as const;

export const ROLE_LABELS: Record<UserRole, string> = {
  citizen: "Ciudadano",
  vendor: "Vendedor",
  inspector: "Inspector",
  admin: "Administrador"
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  citizen: "Puede consultar puestos autorizados y comunicar riesgos sanitarios.",
  vendor: "Puede mantener sus datos, puestos, licencias y estado sanitario.",
  inspector: "Puede revisar puestos, reportes e inspecciones municipales.",
  admin: "Puede consultar el panel administrativo, reportes y trazabilidad."
};

export const ROLE_MENU_ITEMS: Record<UserRole, RoleMenuItem[]> = {
  citizen: [
    {
      title: "Consultar puestos autorizados",
      description: "Acceso ciudadano al listado publico de puestos autorizados.",
      href: "/stalls"
    },
    {
      title: "Reportar riesgo sanitario",
      description: "Comunicacion ciudadana de riesgos sanitarios observados en la via publica."
    }
  ],
  vendor: [
    {
      title: "Panel de vendedor",
      description: "Resumen del estado del registro y siguientes pasos.",
      href: "/dashboard/vendor"
    },
    {
      title: "Mis datos de vendedor",
      description: "Registro de identificacion y contacto del vendedor.",
      href: "/vendor/register"
    },
    {
      title: "Mis puestos",
      description: "Listado de puestos ambulantes asociados al vendedor.",
      href: "/dashboard/vendor/stalls"
    },
    {
      title: "Mis licencias",
      description: "Licencias municipales asociadas a puestos propios.",
      href: "/dashboard/vendor/licenses"
    },
    {
      title: "Registrar puesto",
      description: "Alta de puestos ambulantes asociados al vendedor.",
      href: "/vendor/stalls/new"
    },
    {
      title: "Actualizar licencia",
      description: "Gestion de vigencia y datos de licencia municipal.",
      href: "/vendor/licenses"
    },
    {
      title: "Consultar estado propio",
      description: "Revision consolidada del estado sanitario de los puestos propios."
    }
  ],
  inspector: [
    {
      title: "Puestos pendientes",
      description: "Revision de puestos que requieren evaluacion municipal."
    },
    {
      title: "Registrar inspeccion",
      description: "Carga de resultados y observaciones de inspeccion sanitaria."
    },
    {
      title: "Revisar reportes",
      description: "Seguimiento de reportes ciudadanos pendientes."
    },
    {
      title: "Cambiar estado sanitario",
      description: "Actualizacion del estado sanitario posterior a una inspeccion."
    }
  ],
  admin: [
    {
      title: "Panel administrativo",
      description: "Resumen administrativo y verificacion de permisos.",
      href: "/dashboard/admin"
    },
    {
      title: "Gestionar reportes",
      description: "Revision administrativa de reportes sanitarios recibidos."
    },
    {
      title: "Exportar CSV",
      description: "Salida administrativa de datos para supervision."
    },
    {
      title: "Trazabilidad",
      description: "Consulta de historial auditable de cambios sanitarios."
    }
  ]
};

export function isUserRole(role: string | null | undefined): role is UserRole {
  return ROLES.includes(role as UserRole);
}

export function hasRole(role: UserRole, allowedRoles: readonly UserRole[]) {
  return allowedRoles.includes(role);
}

export function getRoleLabel(role: UserRole) {
  return ROLE_LABELS[role];
}

export function getRoleMenuItems(role: UserRole) {
  return ROLE_MENU_ITEMS[role];
}
