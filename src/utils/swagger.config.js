module.exports= {
  definition:{
    openapi: "3.0.1",
    info: {
      title: "App Investimento em ações",
      description: "API desenvolvida simulando um aplicativo de investimentos em ações",
      contact: {
        email: "barbaraluizasr@gmail.com"
      },
      version: "1.0.0"
    },
    servers: [{
      url: "http://localhost:3000",
      descriprion:"servidor local"
    }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          name: 'Authorization',
          bearerFormat: 'JWT'
        }
      }
    }
},
  apis: ["./src/routers/index.js"],
}