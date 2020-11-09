import { Router } from "express"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

export const handleAPIDocs = (router: Router) => {
  const swaggerSpec = swaggerJSDoc({
    definition: {
      info: {
        title: "Satsang Backend API",
        version: "0.0.1",
      },
      host: "localhost:3000",
      openapi: "3.0.0",
      servers: [{ url: "/api" }],
    },
    apis: ["src/routes/*.ts"],
  })
  const options: swaggerUi.SwaggerUiOptions = {}
  router.use("/docs", swaggerUi.serve)
  router.get("/docs", swaggerUi.setup(swaggerSpec, options))
}
