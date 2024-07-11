export const inputUserValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    qty: Joi.number().required(),
    price: Joi.number().required(),
  });
  return schema.validate(payload);
};
