import Joi from "joi";

export const inputProductValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    qty: Joi.number().required(),
    price: Joi.number().required(),
  });
  const { error, value } = schema.validate(payload);
  return error ? { error } : { value };
};
