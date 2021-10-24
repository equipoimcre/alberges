import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export class setup1635081217246 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const provinceTable = new Table({
            name: 'province',
            columns: [
                new TableColumn({ name: 'id', type: 'INT', isPrimary: true}),
                new TableColumn({ name: 'name', type: 'VARCHAR(250)' }),
            ],
        });
        await queryRunner.createTable(provinceTable, true);
        const organizationTable = new Table({
            name: 'organization',
            columns: [
                new TableColumn({ name: 'id', type: 'INT', isPrimary: true }),
                new TableColumn({ name: 'name', type: 'VARCHAR(250)' })
            ],
        });
        await queryRunner.createTable(organizationTable, true);
        const userPositionTable = new Table({
            name: 'user_position',
            columns: [
                new TableColumn({ name: 'id', type: 'INT', isPrimary: true }),
                new TableColumn({ name: 'name', type: 'INT'}),
            ],
        });
        await queryRunner.createTable(userPositionTable, true);
        const userRoleTable = new Table({
            name: 'user_role',
            columns: [
                new TableColumn({ name: 'id', type: 'INT', isPrimary: true }),
                new TableColumn({ name: 'name', type: 'VARCHAR(250)' }),
            ],
        });
        await queryRunner.createTable(userRoleTable, true);
        const userTable = new Table({
            name: 'user',
            columns: [
                new TableColumn({ name: 'id', type: 'INT', isPrimary: true }),
                new TableColumn({ name: 'name', type: 'VARCHAR(250)' }),
                new TableColumn({ name: 'surname', type: 'VARCHAR(250)' }),
                new TableColumn({ name: 'email', type: 'VARCHAR(250)' }),
                new TableColumn({ name: 'password', type: 'VARCHAR(250)' }),
                new TableColumn({ name: 'agree_term', type: 'tinyint(4)' }),
                new TableColumn({ name: 'is_active', type: 'tinyint(4)' }),
                new TableColumn({ name: 'province', type: 'INT' }),
                new TableColumn({ name: 'organization', type: 'INT' }),
                new TableColumn({ name: 'role', type: 'INT' }),
                new TableColumn({ name: 'position', type: 'INT' }),
                new TableColumn({ name: 'create_date', type: 'datetime' }),
                new TableColumn({ name: 'udpate_date', type: 'datetime' }),
            ],
            foreignKeys: [
                { columnNames: ['province'], referencedTableName: 'province', referencedColumnNames: ['id'] },
                { columnNames: ['organization'], referencedTableName: 'organization', referencedColumnNames: ['id'] },
                { columnNames: ['role'], referencedTableName: 'user_role', referencedColumnNames: ['id'] },
                { columnNames: ['position'], referencedTableName: 'user_position', referencedColumnNames: ['id'] },
            ],
            indices: [
                { columnNames: [ 'province', ] },
                { columnNames: [ 'organization', ] },
                { columnNames: [ 'role',] },
                { columnNames: [ 'position', ] },
            ],
        });
        await queryRunner.createTable(userTable, true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user', true);
        await queryRunner.dropTable('province', true);
        await queryRunner.dropTable('organization', true);
        await queryRunner.dropTable('user_position', true);
        await queryRunner.dropTable('user_role', true);        
    }

}
