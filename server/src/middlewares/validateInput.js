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

const LoginSchema = Joi.object({
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

const UpdateProfileSchema = Joi.object({
  name: Joi.string().min(3).messages({
    'string.min': 'The name must be at least 3 characters long',
  }),
  username: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
    'string.pattern.base':
      'The username must be alphanumeric and between 3 and 30 characters long',
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'string.email': 'The email must be a valid email',
    }),
  bio: Joi.string().min(3).messages({
    'string.min': 'The bio must be at least 3 characters long',
  }),
});

const ChangePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().messages({
    'string.empty': 'The old password is required',
  }),
  newPassword: Joi.string().required().min(6).messages({
    'string.empty': 'The new password is required',
    'string.min': 'The new password must be at least 6 characters long',
  }),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref('newPassword'))
    .messages({
      'string.empty': 'The password confirmation is required',
      'any.only': 'The passwords are not the same',
    }),
});

const PostSchema = Joi.object({
  title: Joi.string().required().min(5).max(60).messages({
    'string.empty': 'The title is required',
    'string.min': 'The title must be at least 5 characters long',
    'string.max': 'The title must be at most 60 characters long',
  }),
  content: Joi.string().required().min(10).messages({
    'string.empty': 'The content is required',
    'string.min': 'The content must be at least 10 characters long',
  }),
  category_id: Joi.required().messages({
    'string.empty': 'The category is required',
  }),
  image: Joi.any().optional(),
});

const validateUser = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });

    next();
  } catch (error) {
    next(error);
  }
};

export const validateRegister = validateUser(RegisterSchema);
export const validateLogin = validateUser(LoginSchema);
export const validateUpdateProfile = validateUser(UpdateProfileSchema);
export const validateChangePassword = validateUser(ChangePasswordSchema);
export const validatePost = validateUser(PostSchema);
