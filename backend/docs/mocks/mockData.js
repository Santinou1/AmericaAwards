// Mock data para pruebas de frontend
const mockData = {
    // Usuarios con diferentes roles y estados
    usuarios: [
      {
        nombre: "Admin Principal",
        email: "admin@empresa.com",
        rol: "administrador",
        saldo_puntos_canjeables: 5000,
        saldo_puntos_transferibles: 1000,
        fecha_creacion: "2023-01-01T00:00:00.000Z",
        fecha_actualizacion: "2023-01-01T00:00:00.000Z"
      },
      {
        nombre: "Juan Pérez",
        email: "juan@empresa.com",
        rol: "empleado",
        saldo_puntos_canjeables: 2500,
        saldo_puntos_transferibles: 500,
        fecha_creacion: "2023-01-02T00:00:00.000Z",
        fecha_actualizacion: "2023-01-02T00:00:00.000Z"
      },
      {
        nombre: "María García",
        email: "maria@empresa.com",
        rol: "empleado",
        saldo_puntos_canjeables: 100,
        saldo_puntos_transferibles: 0,
        fecha_creacion: "2023-01-03T00:00:00.000Z",
        fecha_actualizacion: "2023-01-03T00:00:00.000Z"
      },
      {
        nombre: "Carlos López",
        email: "carlos@empresa.com",
        rol: "empleado",
        saldo_puntos_canjeables: 0,
        saldo_puntos_transferibles: 100,
        fecha_creacion: "2023-01-04T00:00:00.000Z",
        fecha_actualizacion: "2023-01-04T00:00:00.000Z"
      }
    ],
  
    // Premios con diferentes características
    premios: [
      {
        nombre: "Día Libre",
        descripcion: "Un día libre para usar cuando quieras",
        costo_puntos: 1000,
        stock: 5,
        fecha_creacion: "2023-01-01T00:00:00.000Z",
        fecha_actualizacion: "2023-01-01T00:00:00.000Z"
      },
      {
        nombre: "Bono de Almuerzo",
        descripcion: "Vale por 5 almuerzos en restaurantes asociados",
        costo_puntos: 500,
        stock: 10,
        fecha_creacion: "2023-01-01T00:00:00.000Z",
        fecha_actualizacion: "2023-01-01T00:00:00.000Z"
      },
      {
        nombre: "Curso Online",
        descripcion: "Acceso a un curso online a elección",
        costo_puntos: 2000,
        stock: 3,
        fecha_creacion: "2023-01-01T00:00:00.000Z",
        fecha_actualizacion: "2023-01-01T00:00:00.000Z"
      },
      {
        nombre: "Premio Agotado",
        descripcion: "Premio sin stock para pruebas",
        costo_puntos: 100,
        stock: 0,
        fecha_creacion: "2023-01-01T00:00:00.000Z",
        fecha_actualizacion: "2023-01-01T00:00:00.000Z"
      }
    ],
  
    // Transferencias con diferentes estados y mensajes
    transferencias: [
      {
        emisor: {
          nombre: "Juan Pérez",
          email: "juan@empresa.com"
        },
        receptor: {
          nombre: "María García",
          email: "maria@empresa.com"
        },
        puntos: 100,
        mensaje: "¡Gracias por tu ayuda en el proyecto!",
        fecha: "2023-01-15T10:00:00.000Z"
      },
      {
        emisor: {
          nombre: "María García",
          email: "maria@empresa.com"
        },
        receptor: {
          nombre: "Carlos López",
          email: "carlos@empresa.com"
        },
        puntos: 50,
        mensaje: "Excelente trabajo en equipo",
        fecha: "2023-01-16T11:00:00.000Z"
      },
      {
        emisor: {
          nombre: "Juan Pérez",
          email: "juan@empresa.com"
        },
        receptor: {
          nombre: "Carlos López",
          email: "carlos@empresa.com"
        },
        puntos: 200,
        mensaje: null,
        fecha: "2023-01-17T12:00:00.000Z"
      }
    ],
  
    // Canjes con diferentes estados y cantidades
    canjes: [
      {
        usuario: {
          nombre: "Juan Pérez",
          email: "juan@empresa.com"
        },
        premio: {
          nombre: "Día Libre",
          descripcion: "Un día libre para usar cuando quieras",
          costo_puntos: 1000
        },
        cantidad: 1,
        fecha: "2023-01-20T10:00:00.000Z",
        estado: "pendiente"
      },
      {
        usuario: {
          nombre: "María García",
          email: "maria@empresa.com"
        },
        premio: {
          nombre: "Bono de Almuerzo",
          descripcion: "Vale por 5 almuerzos en restaurantes asociados",
          costo_puntos: 500
        },
        cantidad: 2,
        fecha: "2023-01-21T11:00:00.000Z",
        estado: "aprobado"
      },
      {
        usuario: {
          nombre: "Carlos López",
          email: "carlos@empresa.com"
        },
        premio: {
          nombre: "Curso Online",
          descripcion: "Acceso a un curso online a elección",
          costo_puntos: 2000
        },
        cantidad: 1,
        fecha: "2023-01-22T12:00:00.000Z",
        estado: "rechazado"
      }
    ],
  
    // Respuestas de error comunes para simular casos de error
    errores: {
      auth: {
        noToken: {
          msg: "No hay token, autorización denegada"
        },
        tokenInvalido: {
          msg: "Token no válido"
        }
      },
      usuarios: {
        noEncontrado: {
          msg: "Usuario no encontrado"
        },
        emailDuplicado: {
          msg: "El email ya está registrado"
        }
      },
      transferencias: {
        saldoInsuficiente: {
          msg: "Saldo insuficiente para realizar la transferencia"
        },
        autoTransferencia: {
          msg: "No puedes transferirte puntos a ti mismo"
        }
      },
      canjes: {
        stockInsuficiente: {
          msg: "Stock insuficiente"
        },
        saldoInsuficiente: {
          msg: "Saldo insuficiente para realizar el canje"
        },
        yaProcesado: {
          msg: "Este canje ya fue procesado anteriormente"
        }
      },
      premios: {
        noEncontrado: {
          msg: "Premio no encontrado"
        }
      }
    }
  };
  
  export default mockData;