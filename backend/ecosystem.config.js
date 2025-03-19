module.exports = {
  apps : [{
    name   : "AmericaAwards",
    script : "./src/server.js",
    env:{
      NODE_ENV: "production",
      PORT: 3000,
      JWT_SECRET: "america_awards_app_objetivos_secret_key",

    }
  }]
}
