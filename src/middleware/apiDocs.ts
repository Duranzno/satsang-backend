import path from "path"

import { Router } from "express"
import YAML from "yamljs"
import swaggerUi from "swagger-ui-express"

import { IS_PRODUCTION } from "../utilities"

export const handleAPIDocs = (router: Router) => {
  const options: swaggerUi.SwaggerUiOptions = {}
  const swaggerSpec = YAML.load(path.join(__dirname, "..", "openapi.yaml"))
  swaggerSpec.host = "localhost:3000"
  swaggerSpec.info.version = `${process.env.npm_package_version}`
  if (!IS_PRODUCTION) {
    swaggerSpec.servers.unshift({
      url: "http://localhost:3000/",
      description: "Localhost, only for development",
    })
  }
  router.use("/", swaggerUi.serve)
  router.get("/", swaggerUi.setup(swaggerSpec, options))
}
