const MaterialDAO =require('../persistencia/MaterialDAO.js')

class MaterialModel{ 
    #id;
    #item;
    #quantidade;
    #valor;

    constructor(id,item,quantidade,valor){
        this.#id = id;
        this.#item = item;
        this.#quantidade = quantidade;
        this.#valor = valor;
    }

    get id(){
        return this.#id;
    }

    set id (value){
        this.#id=value;
    }

    get item(){
        return this.#item;
    }

    set item (value){
        this.#item=value;
    }

    get quantidade(){
        return this.#quantidade;
    }

    set quantidade (value){
        this.#quantidade=value;
    }

    get valor(){
        return this.#valor;
    }

    set valor (value){
        this.#valor=value;
    }

toJSON(){
    return{
        id:this.#id,
        item:this.#item,
        quantidade:this.#quantidade,
        valor:this.#valor,
    }   
}

static async criar (materialData){
    const dao = new MaterialDAO();
    const material = new MaterialModel(
        null,
        materialData.item,
        materialData.quantidade,
        materialData.valor
    )

    material.#id =await dao.inserir(material)
    return material;
    
}

static async buscaPorFiltro (termo){
    const dao = new MaterialDAO();
    const rows = await dao.buscarPorTermo(termo);
    return rows.map((row)=>
    new MaterialModel(
        row.id,
        row.item,
        row.quantidade,
        row.valor

    )
)
}
async atualizar(){
    const dao = new MaterialDAO();
    return await dao.atualizar(this.#id,this);
}


async deletar(){
    const dao = new MaterialDAO();
    return await dao.deletar(this.#id);
}

static async buscarPorId(id){
    const dao = new MaterialDAO();
    const data = await dao.buscarPorId(id);
    if(!data) return null;
    return new MaterialModel(
        data.id,
        data.item,
        data.quantidade,
        data.valor
    );
}

}
module.exports = MaterialModel