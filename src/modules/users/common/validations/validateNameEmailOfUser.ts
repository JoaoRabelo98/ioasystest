import { Joi } from 'celebrate';

const validateNameAndEmailOfUser = {
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
};

export default validateNameAndEmailOfUser;
