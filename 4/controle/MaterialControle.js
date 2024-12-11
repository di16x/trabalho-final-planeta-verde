const MaterialModel = require('../modelo/Material.model.js')
class MaterialControle{

async inserir(req,res){
    try{
        const{item,quantidade,valor} =req.body;
        const materialData = {item,quantidade,valor};
        const material = await MaterialModel.criar(materialData);
        res.status(201).json({
            message:'Sucesso ao inserir o matérial! ',
            data:material.toJSON()
        });

    } catch(error){
        res.status(500).json({
            message:'Falha ao inserir o matérial! ',
            error:error.message
        });
        

    }
}
async buscarPorFiltro(req,res){
    try{
        const{termo} = req.query;
        const materiais = await MaterialModel.buscaPorFiltro(termo)

        if(materiais.length ===0){
            return res.status(404).json({
                message:'Material não encontrado!',
            });
        }
        return res.status(200).json({
            message:'Material encontrado! com sucesso',
            data: materiais.map(material=> material.toJSON()),
        });

    }catch(error){
        console.error('Erro ao buscar material:', error);
    res.status(500).json({
        message:'Material não encontrado!',
        error:error.message,

            });
        }
    }

async deletar (req,res){
    try{
        const{id} = req.params;
        const material = await MaterialModel.buscarPorId(id);

        if(!material){
            return res.status(404).json({
                message:'Material não encontrado! '
            });
        }

        await material.deletar();
        res.status(200).json({
            message: 'Item excluída com sucesso'
        });
    } catch (error){
        console.error('Erro ao excluir o item: ',error);
        res.status(500).json({
            message:'Erro ao excluir o item ',
            error:error.message,
        });
    }
}

async obter(req, res) {
    try {
        const { id } = req.params;
        const material = await MaterialModel.buscarPorId(id); 

        if (!material) {
            return res.status(404).json({
                message: 'Material não encontrado!'
            });
        }

        res.status(200).json({
            message:'Item encontrado!',
            data:material.toJSON(),
        });
    } catch (error) {
        console.error('Erro ao obter o material: ', error);
        res.status(500).json({
            message: 'Erro ao obter o material',
            error: error.message,
        });
    }
}

async atualizar(req, res){
    try{
        const{id} =req.params;
        const{item,quantidade,valor} = req.body;
        const materialData ={item,quantidade,valor};
        const material = await MaterialModel.buscarPorId(id);

        if(!material){
            return res.status(401).json({
                message:'Item não encontrado'
            });
        }
        console.log('item', material.item)
        material.item = item;
        material.quantidade = quantidade;
        material.valor = valor;

        await material.atualizar();

        res.status(200).json({
            message :'Objeto encontrado com sucesso!',
            data: material.toJSON(),
        });

    }catch (error){
        console.error('Erro ao encontrar o objeto:',error);
        res.status(500).json({
            message:'Erro ao atualizar o objeto',
            error:error.message,
        });
    }
}

async filtrar(req,res){
    const filtro =req.body;
     
    try{
        const result = await item.filtrar(filtro)
        return res.status(200).json(result);

    } catch(error){

    }
}


}
module.exports = new MaterialControle()