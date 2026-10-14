const getCurrentMode = () => process.env.NODE_ENV;

const MODES_ENUM = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production'
};

export {getCurrentMode, MODES_ENUM};