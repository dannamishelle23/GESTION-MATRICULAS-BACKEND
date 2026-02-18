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

    // Si quieres validar rol:
    if (rol !== "Admin") {
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

export {
    crearTokenJWT,
    verificarTokenJWT
}