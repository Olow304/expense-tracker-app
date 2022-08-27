import { registerInputSchema } from '../inputs/registerInput';
import { createRouter } from './context';
import bcrypt from 'bcryptjs';

// create a function that will hash and compare passwords return string not promise
const hashPasswordSync = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export const registerRouter = createRouter()
.mutation("register", {
    input: registerInputSchema,
    async resolve({ctx, input}) {
        //check if user already exists in db with same email
        const findUser = await ctx.prisma.user.findUnique({
            where: {
                email: input.email
            },
        });
        
        if (findUser) {
            throw new Error("User already exist");
        }

        //hash password
        const hashed = hashPasswordSync(input.password);

        return await ctx.prisma.user.create({   
            data: {
                name: input.name,
                email: input.email,
                password: hashed,
            },
        });
    }
})