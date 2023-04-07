import { prismaClient } from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import jwtConfig from "../../config/jwtConfig";


interface AuthRequest {
    email: string;
    password: string;
}



class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("User/Password incorrect")
        };
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("User/Password incorrect")
        }

        const token = sign({ id: user.id, name: user.name, email: user.email }, jwtConfig.secretKey, { expiresIn: jwtConfig.expirenTime });
        return { id: user.id, email: user.email, token };
    }
};


export { AuthUserService };