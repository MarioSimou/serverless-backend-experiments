import React from 'react'
import type { Page, TodoItem } from '@types'
import { useFormValues } from '@features/hooks'
import { useRouter } from 'next/router'
import { Field } from '@features/components/shared'
import { useQuery, useMutation } from '@apollo/client'
import { GET_TODO, UPDATE_TODO } from '@features/realm'

const EditTodoItem: Page = () => {
  const router = useRouter()
  const id = router.query.id as string | undefined
  const { data, error, loading } = useQuery<{ todo: TodoItem }>(GET_TODO, {
    variables: { id },
  })
  const [updateTodo] = useMutation(UPDATE_TODO)
  const { formValues, handleOnBlur, handleOnChange } = useFormValues({
    title: data?.todo?.title ?? '',
    description: data?.todo?.description ?? '',
    completed: data?.todo?.completed ?? false,
  })
  const isAnyTouched =
    formValues.title.touched ||
    formValues.description.touched ||
    formValues.completed.touched

  const onClickUpdate = async () => {
    const { title, description, completed } = formValues
    if (title.error || description.error) {
      return window.alert(title.error || description.error)
    }

    await updateTodo({
      variables: {
        id,
        data: {
          title: title.value,
          description: description.value,
          completed: completed.value,
        },
      },
      onCompleted: () => router.push('/todos'),
    })
  }

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <div>
      <h1>Edit item</h1>
      <form>
        <div
          style={{
            marginBottom: '1rem',
            display: 'flex',
            flexDirection: 'column',
            rowGap: '0.25rem',
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
          <Field id='completed' label='Completed:'>
            <input
              type='checkbox'
              id='completed'
              checked={formValues.completed.value}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
            />
          </Field>
        </div>
        <div>
          <button
            type='button'
            onClick={onClickUpdate}
            disabled={!isAnyTouched}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditTodoItem
