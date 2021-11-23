import Joi from 'joi';

export const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().min(1).required()
})

export const userSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().min(6).required()
})

export const signatureSchema = Joi.object({
    userId: Joi.number().required(),
    productId: Joi.array().items(Joi.number()).required(),
    addressee: Joi.string().required(),
    cep: Joi.string().min(8).max(8).required(),
    day: Joi.number().required(),
    complement: Joi.string().allow(null, ''),
    planId: Joi.number().required()
})