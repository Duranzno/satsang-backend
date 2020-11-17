import {
  handleBodyRequestParsing,
  handleCaching,
  handleCompression,
  handleCors,
  handleTimeout,
} from "./common"
import { handleAPIDocs } from "./apiDocs"
import {
  handleHTTPHeaders,
  // handleCSRF,
  // handleRateLimit
} from "./security"
import { handleLogging } from "./logging"
import { handleAuth } from "./authentication"

export default [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleAPIDocs,
  handleCaching,
  handleHTTPHeaders,
  handleLogging,
  handleTimeout,
  handleAuth,
  // handleRateLimit,
  // handleCSRF,
]
