import { ROLE } from "../src/configuration/role";
import { ProvinceEntity, UserEntity, UserPositionEntity, UserRoleEntity } from "src/package";
import {MigrationInterface, QueryRunner } from "typeorm";
import { OrganizationEntity } from '../src/package/user/entity/organization.entity';

export class userPopulate1635096332479 implements MigrationInterface {

    private provinceList = [
        "Almería",
        "Cádiz",
        "Córdoba",
        "Granada",
        "Huelva",
        "Jaén",
        "Málaga",
        "Sevilla",
        "Huesca",
        "Teruel",
        "Zaragoza",
        "Asturias",
        "Balears, Illes",
        "Palmas, Las",
        "Santa Cruz de Tenerife",
        "Cantabria",
        "Ávila",
        "Burgos",
        "León",
        "Palencia",
        "Salamanca",
        "Segovia",
        "Soria",
        "Valladolid",
        "Zamora",
        "Albacete",
        "Ciudad Real",
        "Cuenca",
        "Guadalajara",
        "Toledo",
        "Barcelona",
        "Girona",
        "Lleida",
        "Tarragona",
        "Alicante/Alacant",
        "Castellón/Castelló",
        "Valencia/València",
        "Badajoz",
        "Cáceres",
        "Coruña, A",
        "Lugo",
        "Ourense",
        "Pontevedra",
        "Madrid",
        "Murcia",
        "Navarra",
        "Araba/Álava",
        "Bizkaia",
        "Gipuzkoa",
        "Rioja, La",
        "Ceuta",
        "Melilla"
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        const organization1 = new OrganizationEntity();
        organization1.name = 'Cruz roja';
        const organization = await queryRunner.manager.save(organization1);
        const organization2 = new OrganizationEntity();
        organization2.name = 'Protecció';
        await queryRunner.manager.save(organization2);
        const position1 = new UserPositionEntity();
        position1.name = 'Jefe de Equipo';
        const position = await queryRunner.manager.save(position1);
        const role = await this.storageRoles(queryRunner);
        const province = await this.storageProvince(queryRunner);
        const root = new UserEntity();
        root.email = 'root@shelterevaluation.com';
        root.password = '$2b$10$UV1oSMt9jebwaHo5BlMmoe4GFjC3USl6dxUoa/AG0fbWDu.eIgpim';
        root.name = 'root';
        root.surname = 'root';
        root.position = position;
        root.organization = organization;
        root.role = role;
        root.province = province;
        await queryRunner.manager.save(root);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.clearDatabase('user');
        queryRunner.clearDatabase('user_role');
        queryRunner.clearDatabase('user_position');
        queryRunner.clearDatabase('province');
        queryRunner.clearDatabase('organization');
    }

    private async storageRoles(queryRunner: QueryRunner) {
        let administrator: UserRoleEntity;
        for (let key of Object.keys(ROLE)) {
            const role = ROLE[key];
            const roleEntity = new UserRoleEntity();
            roleEntity.name = role;
            const auxRole = await queryRunner.manager.save(roleEntity);
            if (auxRole.name === ROLE.ADMINISTRATOR) {
                administrator = auxRole;
            }
        }
        return administrator;
    }

    private async storageProvince(queryRunner: QueryRunner) {
        let provinceEntity: ProvinceEntity;
        for (let provinceName of this.provinceList) {
            const province = new ProvinceEntity();
            province.name = provinceName;
            provinceEntity = await queryRunner.manager.save(province);
        }
        return provinceEntity;
    }

}
