import {Router} from 'express'
import { authController } from '../controllers/auth.controller'

const dashboardAuthRoutes = Router()

// Login route
dashboardAuthRoutes.post('/login', authController.login)

// Refresh token route
dashboardAuthRoutes.post('/refresh', authController.refreshToken)

// Logout route
dashboardAuthRoutes.post('/logout', authController.logout)   

export default dashboardAuthRoutes