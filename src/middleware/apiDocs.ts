import path from "path"
import fs from "fs"

import { Router } from "express"
import YAML from "yamljs"
import swaggerUi from "swagger-ui-express"

import { BASE_URL, IS_PRODUCTION, logger } from "../utilities"

export const getYamlFile = (): null | swaggerUi.JsonObject => {
  let swaggerSpec: swaggerUi.JsonObject = {}
  const specLocation = path.join(__dirname, "..", "openapi.yaml")
  if (fs.existsSync(specLocation)) {
    swaggerSpec = YAML.load(specLocation)
    return swaggerSpec
  }
  return null
}
export const handleAPIDocs = (router: Router) => {
  const options: swaggerUi.SwaggerUiOptions = {}
  const swaggerSpec = getYamlFile()

  if (swaggerSpec) {
    swaggerSpec.host = BASE_URL
    swaggerSpec.info.version = `${process.env.npm_package_version}`
    if (!IS_PRODUCTION) {
      swaggerSpec.servers.unshift({
        url: BASE_URL,
        description: "Localhost, only for development",
      })
    }
    router.use("/json", (_req, res) => {
      res.json(swaggerSpec)
    })
    router.use("/", swaggerUi.serve)
    router.get("/", swaggerUi.setup(swaggerSpec, options))
  } else {
    logger.error("Error loading OpenAPI Spec File")
  }
}
