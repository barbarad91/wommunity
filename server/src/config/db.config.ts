import mongoose, { Error } from 'mongoose'

const dbConfig = () => {
  mongoose.connect(
    `mongodb://localhost/wommunity`,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err: Error) => {
      if (err) throw err
      console.log('Connected to Mongo')
    }
  )
}

export default dbConfig
