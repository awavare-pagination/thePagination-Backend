import {z} from 'zod'

export const formSchema = z.object({
  name : z.string().min(1),
  email : z.email(),
  subject : z.string(),
  message : z.string()
})


export type FormInputType = z.infer<typeof formSchema>