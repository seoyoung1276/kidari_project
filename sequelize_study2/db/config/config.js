// 데이터베이스 연결에 필요한 정보들을 담아둔 폴더

require('dotenv').config(); // 모듈스에서 직접 불러옴.. 경로가 너무너무 헷갈린다. 
const env = process.env;

module.exports = {
  development: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_DB,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    dialect: 'mysql',  	// 사용하는 DB 종류
  },
  test: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_DB,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    dialect: 'mysql',
  },
  production: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_DB,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    dialect: 'mysql',
  },
}


