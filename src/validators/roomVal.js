const { z } = require('zod');

const roomSchema = z.object({
    name: z.string().min(3, "O nome da sala deve ter pelo menos 3 caracteres"),
    status: z.enum(['public', 'private']),
    password: z.string().optional(),
}).refine((data) =>{
    if(data.status === 'private' && !data.password || data.password.length() < 4){
        return false;
    }
    return true
}, {
  message: "Salas privadas precisam de uma senha (mínimo 4 caracteres)",
  path: ["password"], 
});

module.exports = roomSchema