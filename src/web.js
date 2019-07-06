import App from "./app";
import './db_connection'
import './model'
import 'babel-core/register'
import 'babel-polyfill'
import 'babel-plugin-transform-runtime'
const port = 3000

App.listen(port, () => console.log(`Example app listening on port ${port}`))