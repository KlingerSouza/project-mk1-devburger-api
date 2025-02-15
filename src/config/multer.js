import multer from 'multer';
import { v4 as uuidv4 } from 'uuid'; // 📌 Gera identificadores únicos para os arquivos
import { extname, resolve } from 'node:path';

export default {
    storage: multer.diskStorage({
        // 📌 Define o diretório onde os arquivos serão armazenados
        destination: resolve(__dirname, '..', '..', process.env.UPLOADS_FOLDER || 'uploads'),

        // 📌 Define o nome único do arquivo ao salvar
        filename: (request, file, callback) => {
            const uniqueName = uuidv4() + extname(file.originalname);
            callback(null, uniqueName);
        },
    }),
};
