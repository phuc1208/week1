import { Static } from '@sinclair/typebox';
export declare const schema: import("@sinclair/typebox").TObject<{
    username: import("@sinclair/typebox").TString;
    password: import("@sinclair/typebox").TString;
}>;
type User = Static<typeof schema>;
export default User;
