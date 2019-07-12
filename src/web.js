import App from "./app";
import './db_connection'
import './model'
import 'babel-core/register'
import 'babel-polyfill'
import 'babel-plugin-transform-runtime'
let port = 8001

let env = process.env.NODE_ENV;

if (env == 'dev') {
    port = 3000
}


App.listen(port, () => console.log(`Example app listening on port ${port}`))