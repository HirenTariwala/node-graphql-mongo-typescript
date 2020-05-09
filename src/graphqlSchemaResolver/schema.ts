import { buildSchema } from 'graphql';

export default buildSchema(`
type Event {
  _id: ID!
  title: String!
  desc: String!
  price: Float!
  date: String!
  createdBy: User!
  bookedBy: [User!]!
}

type User {
  _id: ID!
  username: String!
  password: String
  events: [Event!]
}

type AuthData {
  token: String!
}

input EventInput {
  title: String!
  desc: String!
  price: Float!
}

input UserInput {
  username: String!
  password: String!
}

input UpdateEventInput {
  eventId: ID!
}

type RootQuery {
  events: [Event!]!
  users: [User!]!
  login(username: String!, password: String!): AuthData!
}

type RootMutation {
  createEvent(eventInput: EventInput): Event
  createUser(userInput: UserInput): User
  bookEvent(bookInput: UpdateEventInput): Event
  cancelEvent(cancelInput: UpdateEventInput): Event
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
