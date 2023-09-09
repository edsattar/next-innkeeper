## Nextjs

#### 1. create new nextjs app

```sh
npx create-next-app@latest cms --ts --tailwind --eslint
```
const formSchema = z.object({
  id: z.number(),
  room_id: z.number(),
  guest_name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(30, { message: "Name must not be longer than 30 characters." }),
  room_rate: z.number(),
  check_in: z.date({ required_error: "A date of birth is required." }),
  check_out: z.date(),
  status: z.string(),
  source: z.string(),
  country: z.string({ required_error: "Required." }),
});