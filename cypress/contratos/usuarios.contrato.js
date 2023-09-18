const Joi = require ('joi')

const usuariosSchema = Joi.object({
    quantidade: Joi.number(),
    usuarios: Joi.array().items({
        nome: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        administrados: Joi.boolean(),
        _id: Joi.string()

    })

})

export default usuariosSchema;