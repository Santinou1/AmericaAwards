# Documentación de la Base de Datos

## Tabla: `usuarios`
Gestiona la información de los usuarios registrados en el sistema.

### Columnas:
- **id** (`uuid`, primary key): Identificador único del usuario.
- **nombre** (`varchar`): Nombre completo del usuario.
- **email** (`varchar`): Dirección de correo electrónico del usuario. Debe ser único.
- **password** (`varchar`): Contraseña del usuario almacenada de forma encriptada.
- **rol** (`enum`): Rol del usuario en el sistema. Puede ser `empleado` o `admin`.
- **saldo_puntos_canjeables** (`integer`): Cantidad de puntos disponibles para canje.
- **saldo_puntos_transferibles** (`integer`): Cantidad de puntos que el usuario puede transferir.
- **fecha_creacion** (`timestamp`): Fecha y hora de creación del registro.
- **fecha_actualizacion** (`timestamp`): Fecha y hora de la última modificación del registro.

---

## Tabla: `transferencias`
Registra las transferencias de puntos entre usuarios.

### Columnas:
- **id** (`uuid`, primary key): Identificador único de la transferencia.
- **emisor_id** (`uuid`): Identificador del usuario que realiza la transferencia. Relación con `usuarios.id`.
- **receptor_id** (`uuid`): Identificador del usuario que recibe la transferencia. Relación con `usuarios.id`.
- **puntos** (`integer`): Cantidad de puntos transferidos.
- **mensaje** (`varchar`): Comentario o razón de la transferencia.
- **fecha** (`timestamp`): Fecha y hora de la transferencia.

---

## Tabla: `premios`
Gestiona el catálogo de premios disponibles para canje.

### Columnas:
- **id** (`uuid`, primary key): Identificador único del premio.
- **nombre** (`varchar`): Nombre del premio.
- **descripcion** (`text`): Descripción detallada o beneficios del premio.
- **costo_puntos** (`integer`): Cantidad de puntos necesarios para canjear el premio.
- **stock** (`integer`): Cantidad disponible del premio.
- **fecha_creacion** (`timestamp`): Fecha y hora de creación del premio.
- **fecha_actualizacion** (`timestamp`): Fecha y hora de la última modificación del premio.

---

## Tabla: `canjes`
Registra las solicitudes de canje de premios realizadas por los usuarios.

### Columnas:
- **id** (`uuid`, primary key): Identificador único del canje.
- **usuario_id** (`uuid`): Identificador del usuario que realiza el canje. Relación con `usuarios.id`.
- **premio_id** (`uuid`): Identificador del premio canjeado. Relación con `premios.id`.
- **cantidad** (`integer`): Cantidad de premios canjeados en la solicitud.
- **fecha** (`timestamp`): Fecha y hora del canje.
- **estado** (`enum`): Estado de la solicitud de canje. Puede ser `pendiente`, `aprobado` o `rechazado`.

---

## Relaciones entre las tablas:
- `usuarios.id` se relaciona con `transferencias.emisor_id` y `transferencias.receptor_id` para identificar al remitente y destinatario de una transferencia.
- `usuarios.id` se relaciona con `canjes.usuario_id` para identificar al usuario que realiza un canje.
- `premios.id` se relaciona con `canjes.premio_id` para identificar el premio que se está canjeando.

