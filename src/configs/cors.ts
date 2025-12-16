import type { CorsOptions } from 'cors'
import env from './env'

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (
      env.NODE_ENV === 'development' ||
      !origin ||
      env.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true)
    } else {
      //Reject request from non-whitelisted origins
      callback(new Error(`CORS error: ${origin} is not allowed by CORS`), false)
    }
  }
}

export default corsOptions
