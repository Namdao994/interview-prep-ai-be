import rateLimiter from '@middlewares/rate-limiter'
import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import corsOptions from '@configs/cors'
import cookieParser from 'cookie-parser'
import V1Router from '@routes/v1/'
import AsyncExitHook from 'async-exit-hook'
import { closeDb, connectDb } from '@configs/mongodb'
import errorHandlingMiddleware from '@middlewares/error-handling'
import passport from 'passport'
const startServer = () => {
  const app = express()

  app.use((_req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })

  app.use(cors(corsOptions))

  app.use(express.json())

  app.use(express.urlencoded({ extended: true }))

  app.use(cookieParser())
  app.use(
    compression({
      threshold: 1024
    })
  )

  app.use(helmet())

  app.use(passport.initialize())

  app.use(rateLimiter)

  app.use('/api/v1', V1Router)

  app.use(errorHandlingMiddleware)

  app.listen(3000, () => {
    console.log('Listening on 3000')
  })

  AsyncExitHook(async (callback) => {
    console.log('4. disconnecting db...')
    await closeDb()
    console.log('5. disconnected db.')
    callback() // báo cho Node rằng hook đã xong
  })
}

;(async () => {
  try {
    console.log('1. Connecting to MongoDB.')
    await connectDb()
    console.log('2. connected to mongoDB.')
    startServer()
  } catch (error) {
    // lỗi không kết nối được db thì sẽ ngắt luôn bằng process.exit(0)
    console.log(error)
    process.exit(0)
  }
})()
