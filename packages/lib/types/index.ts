export type Maybe<TData = unknown> = TData | undefined
export type Nullable<TData = unknown> = TData | null
export type Result<TData = unknown, TError = Error> =
  | [TError]
  | [undefined, TData]

export type Action<
  TPayload = undefined,
  TActionType = string
> = TPayload extends undefined
  ? {
      type: TActionType
    }
  : {
      type: TActionType
      payload: TPayload
    }

export type ActionCreator<
  TPayload = undefined,
  TActionType = string
> = TPayload extends undefined
  ? () => Action<undefined, TActionType>
  : (payload: TPayload) => Action<TPayload, TActionType>
