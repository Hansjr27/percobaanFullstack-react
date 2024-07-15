import Joi from "joi";

export const inputUserValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
  });
  return schema.validate(payload);
};
