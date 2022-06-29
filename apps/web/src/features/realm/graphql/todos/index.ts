import { gql } from 'graphql-tag'

export const GET_TODOS = gql`
  query getTodos {
    todos: items {
      _id
      title
      description
      completed
    }
  }
`

export const GET_TODO = gql`
  query getTodo($id: ObjectId!) {
    todo: item(query: { _id: $id }) {
      _id
      title
      description
      completed
    }
  }
`

export const DELETE_TODO = gql`
  mutation deleteTodo($id: ObjectId) {
    todo: deleteOneItem(query: { _id: $id }) {
      _id
      title
      description
      completed
    }
  }
`

export const POST_TODO = gql`
  mutation postTodo($data: ItemInsertInput!) {
    todo: insertOneItem(data: $data) {
      _id
      title
      description
      completed
    }
  }
`

export const UPDATE_TODO = gql`
  mutation updateTodo($id: ObjectId!, $data: ItemUpdateInput!) {
    todo: updateOneItem(query: { _id: $id }, set: $data) {
      _id
      title
      description
      completed
    }
  }
`
