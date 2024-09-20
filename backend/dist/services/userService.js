"use strict";
// userService ansvarar för affärslogik och databasoperationer
// relaterade till användarhantering.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByName = exports.findUserByEmail = exports.deleteUser = exports.resetUserPassword = exports.updateUserPassword = exports.updateUser = exports.getAllUsers = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = async (name, email, password, roles) => {
    // hasha lösenord
    const salt = await bcrypt_1.default.genSalt(10);
    const hashedPassword = await bcrypt_1.default.hash(password, salt);
    const newUser = new userModel_1.default({ name, email, password: hashedPassword, roles });
    return await newUser.save();
};
exports.createUser = createUser;
// hämta alla users
const getAllUsers = async () => {
    return await userModel_1.default.find().select("-password");
};
exports.getAllUsers = getAllUsers;
// uppdatera user
const updateUser = async (id, name, email, roles) => {
    return await userModel_1.default.findOneAndUpdate({ _id: id }, { name, email, roles }, { new: true });
};
exports.updateUser = updateUser;
// uppdatera bara lösenord för user
const updateUserPassword = async (id, currentPassword, newPassword) => {
    try {
        // console.log(`Finding user with ID: ${id}`);
        const user = await userModel_1.default.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        // kolla att nuvarande lösenord är korrekt
        const isMatch = await bcrypt_1.default.compare(currentPassword, user.password);
        if (!isMatch) {
            throw new Error('Current password is incorrect');
        }
        // hasha det nya lösenordet
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(newPassword, salt);
        //uppdatera lösen i databasen
        const updatedUser = await userModel_1.default.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
        if (!updatedUser) {
            throw new Error('User password not updated');
        }
        console.log('Password updated successfully');
        return updatedUser;
    }
    catch (error) {
        throw new Error(`Error updating password: ${error.message}`);
    }
};
exports.updateUserPassword = updateUserPassword;
// reset lösenord för user om glömt lösen
const resetUserPassword = async (id, newPassword) => {
    try {
        const user = await userModel_1.default.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        // hasha det nya lösenordet
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(newPassword, salt);
        //uppdatera lösen i databasen
        const updatedUser = await userModel_1.default.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
        if (!updatedUser) {
            throw new Error('Users new password not updated');
        }
        console.log('New password updated successfully');
        return updatedUser;
    }
    catch (error) {
        throw new Error(`Error resetting password: ${error.message}`);
    }
};
exports.resetUserPassword = resetUserPassword;
// delete user
const deleteUser = async (id) => {
    return await userModel_1.default.findByIdAndDelete(id);
};
exports.deleteUser = deleteUser;
// hitta user mha email
const findUserByEmail = async (email) => {
    return await userModel_1.default.findOne({ email });
};
exports.findUserByEmail = findUserByEmail;
// hitta user mha name
const findUserByName = async (name) => {
    return await userModel_1.default.findOne({ name });
};
exports.findUserByName = findUserByName;
