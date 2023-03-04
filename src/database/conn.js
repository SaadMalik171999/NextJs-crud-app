const { default: mongoose } = require("mongoose")

const MONGO_URL = "mongodb+srv://SaadMalik:saad03212710920@cluster0.124ticf.mongodb.net/NextJS-CRUD?retryWrites=true&w=majority"


const connectMongo = async () => {
    try {
        console.log(process.env.MONGO_URL);
        const { connection } = await mongoose.connect(MONGO_URL);

        if (connection.readyState == 1) {
            console.log("Connection is successfully");
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

export default connectMongo;