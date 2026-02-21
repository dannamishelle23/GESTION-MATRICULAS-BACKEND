import jwt from "jsonwebtoken"
import Usuarios from "../models/Usuarios.js"

const crearTokenJWT = (id,rol) => {
  return jwt.sign({id,rol}, process.env.JWT_SECRET, {expiresIn: "1d"})
}

const verificarTokenJWT = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization)
    return res.status(401).json({
      message: "Acceso denegado. Token inválido o expirado."
    })

  try {
    const token = authorization.split(" ")[1]

    const { id, rol } = jwt.verify(token, process.env.JWT_SECRET)

    const usuarioBDD = await Usuarios
      .findById(id)
      .select("-password")

    if (!usuarioBDD)
      return res.status(401).json({
        message: "Acceso denegado. Usuario no encontrado."
      })

    req.usuarioHeader = usuarioBDD

    // Validar que el rol sea válido
    if (rol !== "Admin" && rol !== "Estudiante") {
      return res.status(403).json({
        message: "Acceso denegado. No tienes permisos."
      })
    }

    next()

  } catch (error) {
    console.log(error)
    return res.status(401).json({
      message: "Acceso denegado. Token inválido o expirado."
    })
  }
}

// Middleware para validar que el usuario sea Admin
const autorizarAdmin = (req, res, next) => {
  if (req.usuarioHeader.rol !== "Admin") {
    return res.status(403).json({
      message: "Acceso denegado. Solo administradores pueden realizar esta acción."
    })
  }
  next()
}

// Middleware para validar que el usuario sea Estudiante
const autorizarEstudiante = (req, res, next) => {
  if (req.usuarioHeader.rol !== "Estudiante") {
    return res.status(403).json({
      message: "Acceso denegado. Solo estudiantes pueden realizar esta acción."
    })
  }
  next()
}

// Middleware para validar que el admin o estudiante vean las matrículas 
const autorizarAdminOEstudiante = (req, res, next) => {
  if (req.usuarioHeader.rol !== "Admin" && req.usuarioHeader.rol !== "Estudiante") {
    return res.status(403).json({
      message: "Acceso denegado. Debes tener un rol válido."
    })
  }
  next()
}

// Middleware para que Admin y Estudiante puedan leer materias, solo el admin puede modificar
const autorizarAdminOEstudianteLectura = (req, res, next) => {
  if (req.usuarioHeader.rol !== "Admin" && req.usuarioHeader.rol !== "Estudiante") {
    return res.status(403).json({
      message: "Acceso denegado. Debes tener un rol válido para consultar materias."
    })
  }
  next()
}

export {
    crearTokenJWT,
    verificarTokenJWT,
    autorizarAdmin,
    autorizarEstudiante,
    autorizarAdminOEstudiante,
    autorizarAdminOEstudianteLectura
}