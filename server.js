import path from 'path'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { loggerService } from './services/logger.service.js'
import { toyService } from './services/toy.service.js'

const app = express()
// console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
//* App Configuration
app.use(cookieParser()) // for res.cookies
app.use(express.json()) // for req.body

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'))
} else {
    const corsOptions = {
        origin: [
            'http://127.0.0.1:3000',
            'http://localhost:3000',
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            'http://localhost:5174',
            'http://127.0.0.1:5174',
        ],
        credentials: true,
    }
    app.use(cors(corsOptions))
}




// // Fallback
// app.get('/**', (req, res) => {
//   res.sendFile(path.resolve('public/index.html'))
// })

// Listen will always be the last line in our server!



import { authRoutes } from './api/auth/auth.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import { toyRoutes } from './api/toy/toy.routes.js'

// routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/toy', toyRoutes)

// Make every unmatched server-side-route fall back to index.html
// So when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue-router to take it from there

app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})

const port = process.env.PORT || 3030
app.listen(port, () => {
  loggerService.info(`Server listening on port http://127.0.0.1:${port}/`)
})
