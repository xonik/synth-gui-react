import path from 'node:path'
import { fileURLToPath } from 'node:url'
import cookieParser from 'cookie-parser'
import express from 'express'
import createError, { HttpError } from 'http-errors'
import logger from 'morgan'

import patchRouter from './routes/patch.js'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/patch', patchRouter)

// catch 404 and forward to error handler
app.use((_req: any, _res: any, next) => {
    next(createError(404))
})

// error handler
app.use((err: Error, req: express.Request, res: express.Response) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    if (err instanceof HttpError) {
        res.status(err.status)
    } else {
        res.status(500)
    }
})

export default app
