import { errors } from "./errorsList";

// export function HandleError(code_error: string) {
//   return errors.find((error) => error.code === code_error);
// }

export function HandleError(code_error: String, more?: any) {
    console.log(" more -- ", more);
    let extraError = {};
    if (more) {
        extraError = {
            description: more[0]?.message,
            key: more[0]?.context?.key,
        };
    }
    return {
        ...errors.find((error) => error.code === code_error),
        ...extraError,
    };
}
