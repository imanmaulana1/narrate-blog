import Joi from 'joi';

const RegisterSchema = Joi.object({
  name: Joi.string().required().min(3).messages({
    'string.empty': 'The name is required',
    'string.min': 'The name must be at least 3 characters long',
  }),
  username: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .messages({
      'string.empty': 'The username is required',
      'string.pattern.base':
        'The username must be alphanumeric and between 3 and 30 characters long',
    }),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'string.empty': 'The email is required',
      'string.email': 'The email must be a valid email',
    }),
  password: Joi.string().required().min(6).messages({
    'string.empty': 'The password is required',
    'string.min': 'The password must be at least 6 characters long',
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'string.empty': 'The password confirmation is required',
    'any.only': 'The passwords are not the same',
  }),
});

const loginSchema = Joi.object({
  credential: Joi.alternatives()
    .try(
      Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
        'string.pattern.base':
          'The username must be alphanumeric and between 3 and 30 characters long',
      }),
      Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .messages({
          'string.email': 'Please enter a valid email',
        })
    )
    .required()
    .messages({
      'any.required': 'Username or email is required',
    }),
  password: Joi.string().required().min(6).messages({
    'string.empty': 'The password is required',
    'string.min': 'The password must be at least 6 characters long',
  }),
});

const validateUser = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((err) => ({
      field: err.path[0],
      message: err.message,
    }));

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

export const validateRegister = validateUser(RegisterSchema);
export const validateLogin = validateUser(loginSchema);
