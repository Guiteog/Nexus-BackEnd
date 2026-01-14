const { z } = require('zod');

//Validação dos Dados
const valDespesa = z.object({
    description:z.string()
        .min(3,"A descrição deve ter no mínimo 3 caracteres")
        .max(100,"Descrição muito longa"),
    
    amount:z.number({
        required_error:"O valor é obrigatório",
        invalid_type_error:"O valor deve ser um número"
    }).positive("O valor deve ser maior que zero"),

    category:z.string()
        .min(1,"Deve selecionar uma categoria")
});

const editorDespesa = valDespesa.partial();

module.exports ={
    valDespesa,
    editorDespesa
}