import React from 'react'
import type { TodoItem } from '@types'
import Link from 'next/link'

export type TodoItemCard = {
  item: TodoItem
  href: string
}

const TodoItemCard: React.FC<TodoItemCard> = ({ item, href }) => {
  return (
    <Link href={href} passHref>
      <a
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'pink',
          borderRadius: '0.25rem',
          padding: '0.8rem 0.6rem',
          color: 'black',
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              textDecoration: item.completed ? 'line-through' : 'none',
            }}
          >
            {item.title}
          </h2>
          <p style={{ margin: '0.25rem 0 0 0' }}>{item.description}</p>
        </div>
        <div>
          <input disabled checked={item.completed} type='checkbox' />
        </div>
      </a>
    </Link>
  )
}

export default TodoItemCard
