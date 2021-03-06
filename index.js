const express = require('express')
const config = require('config')
const pg = require('pg')
const port = process.env.PORT || config.get("server.port")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const listaPedidos = []
const pool = new pg.Pool ({
     connectionString: "postgres://gpqacetduwgnub:53735fff5efdf0ab75c377b31a78172c7be5858731212a15f74c45dfaf373a0e@ec2-3-211-37-117.compute-1.amazonaws.com:5432/d7o937nhirr1pm",
       ssl: { © 2021 GitHub, Inc.
    Terms
    Privacy
    Security
    Status
    Docs

    Contact GitHub
    Pricing
    API
    Training
    Blog
    About


        rejectUnauthorized: false
    }
})

app.route('/reset').get((req, res) => { 
    let qry = "DROP TABLE IF EXISTS pedidos;"
    qry += "CREATE TABLE pedidos ("
    qry += "cliente char(100),"
    qry += "sabor char(50),"
    qry += "quantidade int,"
    qry += "tamanho char(25)"
    qry += ");"
    pool.query(qry, (err, dbres) => {
        if (err) { 
            res.status(500).send(err)
        } else { 
            res.status(200).send("Banco de dados resetado")
        }
    })
})

app.route('/pedidos').get((req, res) => {
    console.log("/pedidos acionado")
    let qry = "SELECT * FROM pedidos;"
    pool.query(qry, (err, dbres) => { 
        if(err) { 
            res.status(500).send(err)
        } else { 
            res.status(200).json(dbres.rows)
        }
    });
})

app.route('/pedido/adicionar').post((req, res) => { 
    console.log("/pedido/adicionar acionado")
    let qry = "INSERT INTO pedidos (cliente, sabor, quantidade, tamanho) "
    qry += ` VALUES ('${req.body.cliente}', '${req.body.sabor}', ${req.body.quantidade}, '${req.body.tamanho}');`
    pool.query(qry, (err, dbres) => { 
        if (err) { 
            res.status(500).send(err)
        } else { 
            res.status(200).send("Pedido adicionado com sucesso")
        }
    });
})

app.listen(port, () => { 
    console.log("Iniciando o servidor na porta ", port)
})

console.log("Inicio do projeto")
