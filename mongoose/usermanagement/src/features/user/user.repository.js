// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from "mongoose";
import userSchema from "./user.schema.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import { compareHashedPassword } from "../../utils/hashPassword.js";
import { hashPassword } from "../../utils/hashPassword.js";

const userModel = mongoose.model('Users', userSchema);
export const userRegisterationRepo = async(userData) => {
    // Write your code here
    try {
        const user = new userModel(userData)
        await user.save();
        return { "success": true, res: user };
    } catch (error) {
        return {
            "success": false,
            "error": {
                "statusCode": 400,
                "msg": error
            }
        };

    }


};
export const userLoginRepo = async(userData) => {
    // Write your code here
    console.log(userData);
    const { email, password } = userData;
    try {
        const user = await userModel.findOne({ email: email }).exec();
        if (user) {
            let isValidUser = await compareHashedPassword(password, user.password);
            if (isValidUser) {
                return { "success": true, res: user };
            } else {
                throw new customErrorHandler(400, "Incorrect password");
            }
        }
    } catch (error) {
        return {
            "success": false,
            "error": {
                "statusCode": 400,
                "msg": error
            }
        };
    }
};

export const updateUserPasswordRepo = async(_id, newpassword, next) => {
    // Write your code here
    try {
        const user = await userModel.findById(_id);
        if (user) {
            user.password = await hashPassword(newpassword, next);
            await user.save();
            return { "success": true, res: user };
        } else {
            throw new customErrorHandler(404, "User not found");
        }
    } catch (error) {
        return {
            "success": false,
            "error": {
                "statusCode": 400,
                "msg": error
            }
        };
    }
};