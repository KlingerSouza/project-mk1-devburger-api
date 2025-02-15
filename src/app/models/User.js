import Sequelize, { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.UUID, // ✅ Agora `id` está definido no Model
                    defaultValue: DataTypes.UUIDV4, // ✅ Garante geração automática
                    allowNull: false,
                    primaryKey: true,
                },
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                admin: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false, // ✅ Agora sempre será `false` se não enviado
                },
            },
            {
                sequelize,
                tableName: 'users', // ✅ Garante que o model aponta para a tabela correta
            }
        );

        // 🔐 Antes de salvar, criptografa a senha
        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 10);
            }
        });

        return this;
    }

    async checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;
