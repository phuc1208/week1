import { Type, Static } from '@sinclair/typebox';


export const schema = Type.Object({
    username: Type.String(),
    password: Type.String()
})

type User = Static<typeof schema>;
export default User;