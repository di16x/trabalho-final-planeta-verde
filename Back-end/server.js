const express = require('express')
const cors = require('cors')
const materialRotas = require('./rotas/materialRotas.js')
const app = express()

app.use(cors())
app.use(express.json())

app.use('/material',materialRotas)

app.listen(5000, ()=>console.log('Tudo ok com o servidor. Rotando na porta 5000'))
