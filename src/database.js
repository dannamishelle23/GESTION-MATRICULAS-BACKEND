import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

const connection = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Se ha conectado a la base de datos con éxito.`)
        } catch (error) {
            console.log('Error al conectar a la base de datos:', error);
        }
}

export default connection;