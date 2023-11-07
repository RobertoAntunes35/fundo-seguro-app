import UserRepository from "../repository/UserRepository.js";
import * as httpsStatus from "../../../config/constants/httpStatus.js"
import UserException from "../../exception/UserException.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as secrets from '../../../config/constants/secrets.js'
import AuthException from "../../../config/auth/AuthException.js";


class UserService {
    async findByEmail(req) {
        try {
            const { email } = req.params;
            const { authUser } = req
            
            let user_find = await UserRepository.findByEmail(email)

            this.validateRequestData(email)
            this.validateUserNotFound(user_find)
            this.validateAuthenticatedUser(user_find, authUser)
            
            return {
                status: httpsStatus.SUCESS,
                user: {
                    id: user_find.id,
                    name: user_find.name,
                    email: user_find.email,
                }
            }
        } catch (err) {
            return {
                status: err.status ? err.status : httpsStatus.INTERNAL_SERVER_ERROR,
                message: err.message
            }
        }
    }
    validateRequestData(email) {
        console.log(email)
        if(!email) {
            throw new UserException(
                httpsStatus.BAD_REQUEST,
                "User email was not informed"
            )
        }
    }
    validateUserNotFound(user) {
        if(!user) {
            throw new UserException(
                httpsStatus.BAD_REQUEST,
                "User was not informed"
            )
        }
    }
    async getAcessToken(req) {
        try {
            const {email, password} = req.body
            this.validadeAcessTokenData(email, password)
            let user = await UserRepository.findByEmail(email)
            this.validateUserNotFound(user);
            await this.validatePassword(password, user.password)
            let authUser = {id: user.id, name: user.name, email: user.email}
            const acessToken = jwt.sign({authUser}, secrets.API_SECRET, {
                expiresIn: "1d"
        
            });

            return {
                status: httpsStatus.SUCESS,
                acessToken, 
            }    
        } 
        catch (err){
            return {
                status: err.status ? err.status : httpsStatus.INTERNAL_SERVER_ERROR,
                message: err.message,
            }
        }
    }
    validadeAcessTokenData(email, password) {
        if(!email ||!password) {
            throw new UserException(httpsStatus.UNAUTHORIZED, "Email or password must be informed")
        }
    }
    async validatePassword(password, hashPassword) {
        if (! await bcrypt.compare(password, hashPassword)){
            throw new UserException(httpsStatus.UNAUTHORIZED, "Password doens't match")
        }
    }
    validateAuthenticatedUser(user, authUser) {
        if(!authUser || user.id !== authUser.id) {
            throw new AuthException(
                httpsStatus.BAD_REQUEST,
                "Error to authenticate the user"
            )
        }
    }
}

export default new UserService();