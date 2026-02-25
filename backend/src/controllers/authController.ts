import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/jwt'
import { prisma } from '../prisma/client'

const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: 'lax' as const,
  maxAge: 1000 * 60 * 60 * 24
}

export const login = async (req: Request, res: Response) => {
    const { email, senha } = req.body

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' })
    }

    const senhaValida = await bcrypt.compare(senha, user.senha)

    if (!senhaValida) {
        return res.status(401).json({ message: 'Credenciais inválidas' })
    }

    const token = generateToken({
        id: user.id,
        email: user.email
    })

    res.cookie('token', token, cookieOptions)
    return res.json({ message: 'Logado com sucesso', token: token })
}

export const register = async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
  }

  // verifica se já existe
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return res.status(409).json({ message: 'Email já cadastrado' })
  }

  const hashedPassword = await bcrypt.hash(senha, 10)

  const user = await prisma.user.create({
    data: {
      nome,
      email,
      senha: hashedPassword
    }
  })

  const token = generateToken({
    id: user.id,
    email: user.email
  })

  res.cookie('token', token, cookieOptions)
  return res.status(201).json({ message: 'Cadastro realizado com sucesso' })
}

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token', { ...cookieOptions });
  return res.json({ message: 'Logout realizado' });
};