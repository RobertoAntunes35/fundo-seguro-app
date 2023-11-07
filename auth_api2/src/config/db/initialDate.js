import bcrypt from "bcrypt";
import User from "../../modules/user/model/User.js";

export async function createInitialDate() {
    
    try {
        await User.sync({force: true });
        
        let password = await bcrypt.hash('123456', 10)
    
        await User.create({
            name: 'Teste Name1',
            email: 'testemail1@gmail.com',
            password: password
        })

        await User.create({
            name: 'Teste Name2',
            email: 'testemail2@gmail.com',
            password: password
        })

        await User.create({
            name: 'Teste Name3',
            email: 'testemail3@gmail.com',
            password: password
        })

    } catch (err) {
        console.log(err);
    }

}