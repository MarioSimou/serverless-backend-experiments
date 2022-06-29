import React from 'react'
import type { Page, TodoItem } from '@types'
import { useRouter } from 'next/router'
import { GET_TODO, DELETE_TODO, GET_TODOS } from '@features/realm'
import Link from 'next/link'
import { useQuery, useMutation } from '@apollo/client'

const TodoItem: Page = () => {
  const router = useRouter()
  const id = router.query.id as string | undefined
  const {
    data: getTodoData,
    error: getTodoError,
    loading: getTodoLoading,
  } = useQuery<{ todo: TodoItem }>(GET_TODO, { variables: { id: id } })
  const [deleteTodo] = useMutation(DELETE_TODO)
  const onClickDelete = () => {
    deleteTodo({
      variables: { id },
      update: cache => {
        const { todos }: { todos: TodoItem[] } = cache.readQuery({
          query: GET_TODOS,
        }) ?? { todos: [] }
        const newTodos = todos.filter(todo => todo._id !== id)
        cache.writeQuery({ query: GET_TODOS, data: { todos: newTodos } })
      },
      onCompleted: () => router.push('/todos'),
    })
    router.push('/todos')
  }

  if (getTodoLoading) {
    return <div>Loading...</div>
  }
  if (getTodoError) {
    return <div>{getTodoError.message}</div>
  }

  const { todo } = getTodoData!

  return (
    <div>
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
      <input type='checkbox' readOnly checked={todo.completed} />
      <div style={{ display: 'flex', marginTop: '1rem', columnGap: '1rem' }}>
        <button type='button' onClick={onClickDelete}>
          Delete
        </button>
        <Link href={`/todos/${id}/edit`}>
          <button type='button'>Edit</button>
        </Link>
      </div>
    </div>
  )
}

export default TodoItem
