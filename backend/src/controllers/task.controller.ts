import type { Request, Response } from 'express'
import { prisma } from '../prisma/client';

export const createTask = async (req: Request, res: Response) => {
  const { title, due_date } = req.body

  const task = await prisma.task.create({
    data: {
      title,
      due_date: due_date ? new Date(due_date) : null
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
  const { title, completed, due_date } = req.body

  const task = await prisma.task.update({
    where: { id },
    data: { title, completed, due_date: due_date ? new Date(due_date) : null }
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