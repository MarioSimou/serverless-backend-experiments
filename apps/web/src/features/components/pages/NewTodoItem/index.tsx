import React from 'react'
import type { Page, TodoItem } from '@types'
import { Field } from '@features/components/shared'
import { useFormValues } from '@features/hooks'
import { useRouter } from 'next/router'
import { POST_TODO, GET_TODOS } from '@features/realm'
import { useMutation } from '@apollo/client'

const NewTodoItem: Page = () => {
  const router = useRouter()
  const [postTodo] = useMutation(POST_TODO)
  const { formValues, handleOnBlur, handleOnChange } = useFormValues({
    title: '',
    description: '',
    completed: false,
  })

  const onClickCreate = async () => {
    const { title, description, completed } = formValues
    const isTouched = title.touched

    if (!isTouched) {
      return window.alert('Please fill in the form')
    }

    if (title.error || description.error) {
      return window.alert(title.error || description.error)
    }

    await postTodo({
      variables: {
        data: {
          title: title.value,
          description: description.value,
          completed: completed.value,
        },
      },
      update: (cache, mutationResult) => {
        const { todos }: { todos: TodoItem[] } = cache.readQuery({
          query: GET_TODOS,
        }) ?? { todos: [] }
        const { todo }: { todo: TodoItem } = mutationResult.data
        cache.writeQuery({
          query: GET_TODOS,
          data: { todos: [...todos, todo] },
        })
      },
      onCompleted: () => {
        router.push('/todos')
      },
    })
  }

  return (
    <form>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Field id='title' label='Title:'>
          <input
            id='title'
            value={formValues.title.value}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
          />
        </Field>
        <Field id='description' label='Description:'>
          <textarea
            id='description'
            value={formValues.description.value}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            rows={10}
          />
        </Field>
        <Field
          id='completed'
          label='Completed:'
          style={{ flexDirection: 'row', columnGap: '0.5rem' }}
        >
          <input
            type='checkbox'
            id='completed'
            checked={formValues.completed.value}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
          />
        </Field>
      </div>
      <button type='button' onClick={onClickCreate}>
        Create
      </button>
    </form>
  )
}

export default NewTodoItem
