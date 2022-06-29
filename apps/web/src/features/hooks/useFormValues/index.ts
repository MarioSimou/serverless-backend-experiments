import React from 'react'

type FormValue<TValue = unknown> = {
  error: string
  touched: false
  value: TValue
}

type FormValues<TFields extends Fields> = {
  [K in keyof TFields]: FormValue<TFields[K]>
}

type Fields = Record<string, unknown>

const mapFieldsToFormValues = <TFields extends Fields>(
  fields: TFields
): FormValues<TFields> => {
  return Object.entries(fields).reduce((formValues, [fieldKey, fieldValue]) => {
    return {
      ...formValues,
      [fieldKey]: {
        touched: false,
        error: '',
        value: fieldValue,
      },
    }
  }, {} as FormValues<TFields>)
}

type FieldInput = HTMLInputElement | HTMLTextAreaElement

export const useFormValues = <
  TFields extends Fields = Fields,
  TKeys extends keyof TFields = keyof TFields
>(
  fields: TFields
) => {
  const [formValues, setFormValues] = React.useState(
    mapFieldsToFormValues(fields)
  )

  const setValue = React.useCallback(
    <TKey extends TKeys>(value: TFields[TKey], id: TKey) => {
      return setFormValues(prevFormValues => ({
        ...prevFormValues,
        [id]: {
          error: !value ? `${id.toString()} is required` : '',
          touched: true,
          value,
        },
      }))
    },
    [setFormValues]
  )

  const setError = React.useCallback(
    <TKey extends TKeys>(error: string, id: TKey) => {
      return setFormValues(prevFormValues => ({
        ...prevFormValues,
        [id]: {
          ...prevFormValues[id],
          touched: true,
          error,
        },
      }))
    },
    [setFormValues]
  )

  const setTouched = React.useCallback(
    <TKey extends TKeys>(id: TKey, touched: boolean = true) => {
      return setFormValues(prevFormValues => ({
        ...prevFormValues,
        [id]: {
          ...prevFormValues[id],
          touched,
        },
      }))
    },
    [setFormValues]
  )

  const isCheckbox = (target: FieldInput): target is HTMLInputElement => {
    return target.type === 'checkbox'
  }

  const handleOnChange = React.useCallback(
    <TKey extends TKeys, THTMLElement extends FieldInput = HTMLInputElement>(
      e: React.ChangeEvent<THTMLElement>
    ) => {
      const id = e.currentTarget.id as TKey
      const target = e.currentTarget

      if (isCheckbox(target)) {
        return setValue(Boolean(target.checked) as TFields[TKey], id)
      }

      return setValue(e.currentTarget.value as TFields[TKey], id)
    },
    [setValue, setError]
  )

  const handleOnBlur = React.useCallback(
    <TKey extends TKeys, THTMLElement extends FieldInput = HTMLInputElement>(
      e: React.ChangeEvent<THTMLElement>
    ) => {
      const id = e.currentTarget.id as TKey

      setTouched(id)
    },
    [setTouched]
  )

  return {
    formValues,
    setValue,
    setError,
    setTouched,
    handleOnChange,
    handleOnBlur,
  }
}
