import { type } from "os";
import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export class setup1635081217246 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const communityTable = new Table({
            name: 'community',
            columns: [
                new TableColumn({ name: 'id', type: 'INT', isPrimary: true}),
                new TableColumn({ name: 'name', type: 'VARCHAR(250)' }),
            ]
        });
        await queryRunner.createTable(communityTable, true);
        const provinceTable = new Table({
            name: 'province',
            columns: [
                new TableColumn({ name: 'id', type: 'INT', isPrimary: true}),
                new TableColumn({ name: 'name', type: 'VARCHAR(250)' }),
                new TableColumn({ name: 'community_id', type: 'INT'}),
            ],
            foreignKeys: [
                { columnNames: ['community_id'], referencedTableName: 'community', referencedColumnNames: ['id'] },
            ]
        });
        await queryRunner.createTable(provinceTable, true);
        const organizationTable = new Table({
            name: 'organization',
            columns: [
                new TableColumn({ name: 'id', type: 'INT', isPrimary: true, generationStrategy: 'increment', isGenerated: true}),
                new TableColumn({ name: 'name', type: 'VARCHAR(250)' })
            ],
        });
        await queryRunner.createTable(organizationTable, true);
        const userPositionTable = new Table({
            name: 'user_position',
            columns: [
                new TableColumn({ name: 'id', type: 'INT', isPrimary: true, generationStrategy: 'increment', isGenerated: true }),
                new TableColumn({ name: 'name', type: 'VARCHAR(250)'}),
            ],
        });
        await queryRunner.createTable(userPositionTable, true);
        const userRoleTable = new Table({
            name: 'user_role',
            columns: [
                new TableColumn({ name: 'id', type: 'INT', isPrimary: true, generationStrategy: 'increment', isGenerated: true }),
                new TableColumn({ name: 'name', type: 'VARCHAR(250)' }),
            ],
        });
        await queryRunner.createTable(userRoleTable, true);
        const userTable = new Table({
            name: 'user',
            columns: [
                new TableColumn({ name: 'id', type: 'INT', isPrimary: true, generationStrategy: 'increment', isGenerated: true }),
                new TableColumn({ name: 'name', type: 'VARCHAR(250)', }),
                new TableColumn({ name: 'surname', type: 'VARCHAR(250)' }),
                new TableColumn({ name: 'email', type: 'VARCHAR(250)', isUnique: true }),
                new TableColumn({ name: 'password', type: 'VARCHAR(250)' }),
                new TableColumn({ name: 'agree_term', type: 'tinyint(4)', default: true }),
                new TableColumn({ name: 'is_active', type: 'tinyint(4)', default: true }),
                new TableColumn({ name: 'provinceId', type: 'INT' }),
                new TableColumn({ name: 'organizationId', type: 'INT' }),
                new TableColumn({ name: 'roleId', type: 'INT' }),
                new TableColumn({ name: 'positionId', type: 'INT' }),
                new TableColumn({ name: 'create_date', type: 'datetime', default: 'CURRENT_TIMESTAMP' }),
                new TableColumn({ name: 'udpate_date', type: 'datetime', default: 'CURRENT_TIMESTAMP' }),
            ],
            foreignKeys: [
                { columnNames: ['provinceId'], referencedTableName: 'province', referencedColumnNames: ['id'] },
                { columnNames: ['organizationId'], referencedTableName: 'organization', referencedColumnNames: ['id'] },
                { columnNames: ['roleId'], referencedTableName: 'user_role', referencedColumnNames: ['id'] },
                { columnNames: ['positionId'], referencedTableName: 'user_position', referencedColumnNames: ['id'] },
            ],
        });
        await queryRunner.createTable(userTable, true);

        const shelterTable = new Table({
            name: 'shelter',
            columns: [
                new TableColumn({ name: 'id', type: 'INT', isPrimary: true, generationStrategy: 'increment', isGenerated: true }),
                new TableColumn({ name: 'name', type: 'VARCHAR(250)' }),
                new TableColumn({ name: 'owner', type: 'VARCHAR(250)' }),
                new TableColumn({ name: 'municipality', type: 'VARCHAR(250)'}),
                new TableColumn({ name: 'coordinate', type: 'POINT'}),
                new TableColumn({ name: 'province_id', type: 'INT' }),
                new TableColumn({ name: 'community_id', type: 'INT' }),
                new TableColumn({ name: 'validate', type: 'BOOLEAN' }),
                new TableColumn({ name: 'note', type: 'VARCHAR(250)', isNullable: true }),
                new TableColumn({ name: 'create_date', type: 'datetime', default: 'CURRENT_TIMESTAMP' }),
                new TableColumn({ name: 'udpate_date', type: 'datetime', default: 'CURRENT_TIMESTAMP' }),
                new TableColumn({ name: 'is_active', type: 'tinyint(4)', default: true }),
                new TableColumn({ name: 'surface', type: 'FLOAT' }),
                new TableColumn({ name: 'exterior_surface', type: 'FLOAT' }),
                new TableColumn({ name: 'bathroom_surface', type: 'FLOAT' }),
                new TableColumn({ name: 'shower_quantity', type: 'INT' }),
                new TableColumn({ name: 'sink_quantity', type: 'INT' }),
                new TableColumn({ name: 'toilet_quantity', type: 'INT' }),
                new TableColumn({ name: 'washing_machine_quantity', type: 'INT' }),
                new TableColumn({ name: 'cac_surface', type: 'INT' }),
                new TableColumn({ name: 'shower_quantity_cac', type: 'INT' }),
                new TableColumn({ name: 'portable_shower_space_quantity_cac', type: 'INT' }),
                new TableColumn({ name: 'toilet_quantity_cac', type: 'INT' }),
                new TableColumn({ name: 'how_many_surface_for_toilet_cac', type: 'INT' }),
                new TableColumn({ name: 'how_many_wahsing_machine_can_install_cac', type: 'INT' }),
                new TableColumn({ name: 'there_are_toilet_for_20_person_cac', type: 'INT' }),
                new TableColumn({ name: 'portable_washing_machine_surface_cac', type: 'INT' }),
                new TableColumn({ name: 'ap_surface', type: 'INT' }),
                new TableColumn({ name: 'shower_quantity_ap', type: 'INT' }),
                new TableColumn({ name: 'portable_shower_space_quantity_ap', type: 'INT' }),
                new TableColumn({ name: 'toilet_quantity_ap', type: 'INT' }),
                new TableColumn({ name: 'how_many_surface_for_toilet_ap', type: 'INT' }),
                new TableColumn({ name: 'how_many_wahsing_machine_can_install_ap', type: 'INT' }),
                new TableColumn({ name: 'there_are_toilet_for_20_person_ap', type: 'INT' }),
                new TableColumn({ name: 'portable_washing_machine_surface_ap', type: 'INT' }),
                new TableColumn({ name: 'surface_washing_machine_cac', type: 'INT' }),
                new TableColumn({ name: 'surface_washing_machine_ap', type: 'INT' }),
                new TableColumn({ name: 'is_cac', type: 'BOOLEAN' }),
                new TableColumn({ name: 'is_ap', type: 'BOOLEAN' }),
            ],
            foreignKeys: [
                { columnNames: ['community_id'], referencedTableName: 'community', referencedColumnNames: ['id'] },
                { columnNames: ['province_id'], referencedTableName: 'province', referencedColumnNames: ['id'] },
            ]
        });
        await queryRunner.createTable(shelterTable, true);

        const questionTable = new Table({
            name: 'question',
            columns: [
                new TableColumn({ name: 'id', type: 'INT', isPrimary: true, generationStrategy: 'increment', isGenerated: true }),
                new TableColumn({ name: 'question', type: 'TEXT' }),
            ],
        });
        await queryRunner.createTable(questionTable, true);

        const responseTable = new Table({
            name: 'shelter_response',
            columns: [
                new TableColumn({ name: 'shelter_id', type: 'INT', isPrimary: true, }),
                new TableColumn({ name: 'question_id', type: 'INT', isPrimary: true, }),
                new TableColumn({ name: 'response', type: 'BOOLEAN' }),
                new TableColumn({ name: 'note', type: 'TEXT', isNullable: true }),
            ],
            foreignKeys: [
                { columnNames: ['shelter_id'], referencedTableName: 'shelter', referencedColumnNames: ['id'] },
                { columnNames: ['question_id'], referencedTableName: 'question', referencedColumnNames: ['id'] },
            ]
        });
        await queryRunner.createTable(responseTable, true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('shelter_response', true);
        await queryRunner.dropTable('user', true);
        await queryRunner.dropTable('shelter', true);
        await queryRunner.dropTable('question', true);
        await queryRunner.dropTable('province', true);
        await queryRunner.dropTable('community', true);
        await queryRunner.dropTable('organization', true);
        await queryRunner.dropTable('user_position', true);
        await queryRunner.dropTable('user_role', true);     
    }

}
