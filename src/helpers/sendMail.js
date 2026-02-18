import sendMail from '../config/nodemailer.js';

const sendMailToRecoveryPassword = (userMail, token) => {

    return sendMail(
        userMail,
        "Recupera tu contraseña",
        `
            <h1>ESFOT Matrículas</h1>
            <p>Has solicitado restablecer tu contraseña.</p>
            <a href="${process.env.URL_BACKEND}recuperarpassword/${token}">
            Clic para restablecer tu contraseña
            </a>
            <hr>
            <footer>El equipo de ESFOT Matrículas te da la más cordial bienvenida.</footer>
        `
        )
}

export {
    sendMailToRecoveryPassword
}
