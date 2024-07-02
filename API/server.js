/*
get: acessar usuarios
post: criar usuarios
put: editar varios
patch: editar um
delete: deletar
*/

/*
req: request
res: response
*/

/*
Query Params (GET) -> aparece as informações no navegador
- servidor.com/usuarios?estado=parana&cidade=curitiba

Route Params (GET/PUT/DELETE) -> acessar uma informação específica (pesquisar um usuario especifico)
- get/put/delete servidor.com/usuarios/22

Body Params (POST/PUT) -> enviar informações pelo body (Senha do cartao, informaçãoes mais delicadas)
{
 "nome": "Tiago","id":22
}
*/

/*
2xx -> Sucesso
4xx -> Erro Cliente
5xx -> Erro Servidor
*/

/* Gvb76p2GJ98QfNbH */


/*
Criar API de usuário

 1. Criar um usuário
 2. Listar todos os usuários
 3. Editar um usuário
 4. Deletar um usuário
 */

import cors from 'cors'
import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

/* Criação do usuário | Post */
app.post('/usuarios', async (req, res) => {
    
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.get('/usuarios', async (req, res) => {

    let users = []

    if(req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.body.email,
                age: req.body.age
            }
        })
    } else{
        users = await prisma.user.findMany()
    }

    res.status(200).json(users)
})

app.listen(4000)

/* Criação da edição do usuário | Put */
app.put('/usuarios/:id', async (req, res) => {
    
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

/* Criação do delete do usuário | Put */
app.delete('/usuarios/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ message: 'Usuário deletado com sucesso!' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erro ao deletar usuário' })
    }
})
