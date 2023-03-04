import connectMongo from "@/database/conn"
import { getUsers, postUser } from "@/database/controller";

export default async function handler(req, res) {
    connectMongo().catch(() => res.status(405).json({ error: "Error in Connection" }));

    const { method } = req;

    switch (method) {
        case 'GET':
            getUsers(req, res)
            break;
        case 'POST':
            postUser(req, res);
            break;
        default:
            // res.setHeader("Allow", ['GET', 'PUT', 'POST', 'DELETE']);
            res.status(200).end(`Method ${method} not allowed`);

    }

}
