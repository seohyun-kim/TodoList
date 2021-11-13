const Sequelize = require('sequelize');

module.exports = class Todo extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // Todo의 id는 자동
            content: {
                type: Sequelize.STRING(45),
                allowNull: true
            },
            isCompleted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: true, //createdAt, updatedAt 자동 생성
            underscored: false,
            modelName: 'Todo', // js에서 쓰는 모델 명
            tableName: 'Todos', // sql에서 쓰는 table명
            paranoid: false, // deletedAt은 X (hard delete 할거임)
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        // Todo는 Member에 속해있음 (Member의 target key는 id)
        db.Todo.belongsTo(db.Member, { foreignKey: 'member', targetKey: 'id' });
    }
};