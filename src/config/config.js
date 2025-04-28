const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');
const { password } = require('../validations/custom.validation');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    // Environment
    NODE_ENV: Joi.string().valid('production', 'development').required(),
    PORT: Joi.number().default(5000),

    // MongoDB
    MONGODB_URL: Joi.string().required().description('MongoDB URL'),
    MONGODB_USER: Joi.string().allow('').description('Username'),
    MONGODB_PWD: Joi.string().allow('').description('Password'),

    // JWT
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),

    // SMTP
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),

    // Admin account
    ADMIN_EMAIL: Joi.string().required().email().description('admin email for first time setup'),
    ADMIN_PASSWORD: Joi.string().required().custom(password).description('admin password for first time setup'),

    // Server and Client URL
    SERVER_URL: Joi.string().required().description('Server URL'),
    CLIENT_URL: Joi.string().required().description('Client URL'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

let mongooseOptions = {};
if (envVars.MONGODB_USER && envVars.MONGODB_PWD) {
  mongooseOptions = {
    user: envVars.MONGODB_USER,
    pass: envVars.MONGODB_PWD,
  };
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
    options: mongooseOptions,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  admin: {
    email: envVars.ADMIN_EMAIL,
    password: envVars.ADMIN_PASSWORD,
    name: 'Admin',
    role: 'admin',
  },
  url: {
    server: envVars.SERVER_URL,
    client: envVars.CLIENT_URL,
  },
};
