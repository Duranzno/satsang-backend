import { Router } from "express"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

export const handleAPIDocs = (router: Router) => {
  const swaggerSpec = swaggerJSDoc({
    definition: {
      info: {
        title: "Satsang Backend API",
        version: `${process.env.npm_package_version}`,
      },
      host: "localhost:3000",
      openapi: "3.0.0",
      servers: [{ url: "/api" }],
    },
    apis: ["src/routes/*.ts"],
  })
  const options: swaggerUi.SwaggerUiOptions = {}
  router.use("/", swaggerUi.serve)
  router.get("/", swaggerUi.setup(swaggerSpec, options))
}
