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