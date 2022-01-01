import { host, user, password } from "./creds.js"

export let configFTP = {
    host: host,
    user: user,
    password: password,
    parallel: 5 // streams qnt
}