import joi from "joi";

export const emailValidation = joi.string().email().required();
export const usernameValidation = joi.string().min(3).max(30).required();
export const passwordValidation = joi.string().min(8).max(30).required();