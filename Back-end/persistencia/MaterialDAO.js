const db = require('../configuracao/db.js')

class MaterialDAO {
    async inserir(material){
        const {item, quantidade, valor} = material;
        const query ='INSERT INTO material (item,quantidade, valor) VALUES (?,?,?)';
        const[result] = await db.execute(query,[item, quantidade, valor])
        return result
    }

    async buscarPorTermo(termo){
        if(!termo || termo.trim()===''){
            const query = `SELECT * FROM material ORDER BY item ASC`;
            const[rows] = await db.execute(query);
            return rows;
        } else{
            const query =`SELECT * FROM material WHERE item LIKE ? OR id LIKE? ORDER BY item ASC`;
            const [rows] =await db.execute(query,[`%${termo}%`, `%${termo}%`]);
            return rows;
        }
    }

   

    async buscarPorId(id){
        const query = `SELECT * FROM material WHERE id = ?`;
        const [rows] = await db.execute(query,[id]);
        return rows[0];
    }

    async deletar(id){
        const query =`DELETE FROM material WHERE id =?;`
        const[result] = await db.execute (query,[id]);
        return result;
    }

    async atualizar(id,material){
        const {item,quantidade,valor} = material
        const query =  `UPDATE material SET item = ?, quantidade = ?, valor = ? WHERE id = ?`;
        const[result]= await db.execute(query,[item,quantidade,valor,id]);
        return result;

    }
}
module.exports=MaterialDAO