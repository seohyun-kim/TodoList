const Sequelize = require('sequelize');

module.exports = class Member extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // id 자동이므로 생략
            email: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            age: {
                type: Sequelize.TINYINT.UNSIGNED,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            content: {
                type: Sequelize.STRING(45),
                allowNull: true
            },

        }, {
            sequelize,
            timestamps: true, //createdAt, updatedAt 자동 생성
            underscored: false,
            modelName: 'Member',
            tableName: 'Members',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        // 1: N 관계 ( Member의 id를 참조)
        db.Member.hasMany(db.Todo, { foreignKey: 'member', sourceKey: 'id' });
    }
};