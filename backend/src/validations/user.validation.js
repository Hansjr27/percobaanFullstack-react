import Joi from "joi";

export const inputUserValidation = () => {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
  });
  return schema.validate({ name: "", address: "" });
};
