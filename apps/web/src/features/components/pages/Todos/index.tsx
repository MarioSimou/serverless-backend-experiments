import React from 'react'
import { TodoItemCard } from '@features/components/shared'
import type { Page, TodoItem } from '@types'
import { useQuery } from '@apollo/client'
import { GET_TODOS } from '@features/realm/graphql'

const Todos: Page = () => {
  const { loading, data, error } = useQuery<{ todos: TodoItem[] }>(GET_TODOS)

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{error.message}</div>
  }

  const { todos } = data!

  return (
    <div>
      <h1>Todo Items</h1>
      {todos.length === 0 && <div>Items not found</div>}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '0.5rem',
          padding: '0 0.5rem',
        }}
      >
        {todos.map(todo => {
          const href = `/todos/${todo._id}`
          return <TodoItemCard key={todo.title} href={href} item={todo} />
        })}
      </div>
    </div>
  )
}

export default Todos
