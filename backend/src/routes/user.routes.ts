import { Router } from 'express'
import { login } from '../controllers/authController'
import { register } from '../controllers/authController'
import { logout } from '../controllers/authController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { AuthRequest } from '../middlewares/authMiddleware'

const router = Router()

router.post('/login', login)
router.post('/sign-up', register)

router.get('/me', authMiddleware, (req: AuthRequest, res) => {
  return res.json({
    id: req.user.id,
    email: req.user.email,
    nome: req.user.nome || null,
  });
})

router.post('/logout', logout);

export default router