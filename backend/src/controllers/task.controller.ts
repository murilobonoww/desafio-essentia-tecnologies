import type { Request, Response } from 'express'
import { prisma } from '../prisma/client';
import { AuthRequest } from '../middlewares/authMiddleware'

export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, due_date, priority, description } = req.body
  const userId = req.user?.id
  if (!userId) return res.status(401).json({ message: 'Usuário não autenticado' })

  const task = await prisma.task.create({
    data: {
      title,
      description: description ?? null,
      due_date: due_date ? new Date(due_date) : null,
      priority: priority ?? null,
      userId
    }
  })

  res.status(201).json(task)
}

export const getTasks = async (_req: Request, res: Response) => {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' }
  })

  res.json(tasks)
}

export const updateTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  const data: any = {}

  if (req.body.title !== undefined) {
    data.title = req.body.title
  }

  if (req.body.completed !== undefined) {
    data.completed = req.body.completed
  }

  if (req.body.due_date !== undefined) {
    data.due_date = req.body.due_date
      ? new Date(req.body.due_date)
      : null
  }

  if (req.body.priority !== undefined) {
    data.priority = req.body.priority
  }

  if (req.body.description !== undefined) {
    data.description = req.body.description
  }

  const task = await prisma.task.update({
    where: { id },
    data
  })

  res.json(task)
}

export const deleteTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  await prisma.task.delete({
    where: { id }
  })

  res.status(204).send()
}