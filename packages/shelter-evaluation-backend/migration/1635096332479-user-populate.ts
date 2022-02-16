import { ROLE } from "../src/configuration/role";
import { ProvinceEntity, QuestionEntity, ShelterEntity, UserEntity, UserPositionEntity, UserRoleEntity } from "src/package";
import { MigrationInterface, QueryRunner } from "typeorm";
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

    private questionList = [
        "Acceso rodado adecuado para buses, camiones/furgos y ambulancias",
        "Aparcamiento junto al edificio para mínimo 1 coche, 1 bus y 1 ambulancia",
        "Calcular capacidad orientativa de alojamiento a razón de 35 m2/persona	Calcular capacidad orientativa de alojamiento a razón de 45 m2/persona",
        "Suministro de agua garantizado. ¿Es potable?",
	    "> 1 ducha/20 personas, o espacio donde instalar unas portátiles (2 m2/ducha)",
        "Suministro de agua caliente para duchas garantizado.",
	    "Conexión en buen estado a sistema de saneamiento (red o fosa séptica…)",
        "> 1 inodoro/20 personas o espacio donde instalar unos portátiles (1 m2/inodoro)",
        "Suministro de electricidad garantizado (red eléctrica, generadores…)",
        "Luz natural o artificial en todas las estancias	Luz natural en las áreas de estancia y trabajo, y luz artificial en todos los espacios",
        "Ventilación continua, natural o forzada, en todas las estancias.",
        "Sistema de calefacción en climas fríos para garantizar una temperatura de 18-21º para el tiempo de estancia (72 h-2semanas). Calefacción general, no individual.",
        "Al menos 2 salidas de evacuación si se prevén más de 50 personas. Salidas a espacio exterior seguro, esto es, o via pública, o espacio al aire libre que quepa al menos un círculo de radio de (0.5 x nºpersonas) y que tenga una superficie > 0.5 m2/persona.",
        "Posibilidad de funcionar con 1 solo acceso al edificio, para seguridad y control (entrada-salida)",
        "Aspecto del edificio de uso seguro y salubre, con ITE favorable.",
        "Primera aproximación a la accesibilidad: Espacios comunes accesibles para usuarios en sillas de ruedas, mayores, niños, embarazadas…",
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        const organization = await this.storageOrganizations(queryRunner);
        const position = await this.storagePosition(queryRunner);
        const role = await this.storageRoles(queryRunner);
        const province = await this.storageProvince(queryRunner);
        await this.createDefaultUser(position, role, organization, province, queryRunner);
        await this.storageQuestions(queryRunner);
        await this.sotorageShelter(queryRunner, province);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.clearDatabase('user');
        queryRunner.clearDatabase('shelter');
        queryRunner.clearDatabase('question');
        queryRunner.clearDatabase('user_role');
        queryRunner.clearDatabase('user_position');
        queryRunner.clearDatabase('province');
        queryRunner.clearDatabase('organization');
    }

    private async storageOrganizations(queryRunner: QueryRunner) {
        const organization1 = new OrganizationEntity();
        organization1.name = 'Cruz roja';
        const organization = await queryRunner.manager.save(organization1);
        const organization2 = new OrganizationEntity();
        organization2.name = 'Protecció';
        await queryRunner.manager.save(organization2);
        return organization;
    }

    private async storagePosition(queryRunner: QueryRunner) {
        const position1 = new UserPositionEntity();
        position1.name = 'Jefe de Equipo';
        return await queryRunner.manager.save(position1);
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

    private async createDefaultUser(
        position: UserPositionEntity, 
        organization: OrganizationEntity, 
        role: UserRoleEntity, 
        province: ProvinceEntity,
        queryRunner: QueryRunner
    ) {
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

    private async storageQuestions(queryRunner: QueryRunner) {
        for (let questionText of this.questionList) {
            const question = new QuestionEntity();
            question.question = questionText;
            await queryRunner.manager.save(question);
        }
    }

    private async sotorageShelter(queryRunner: QueryRunner, province: ProvinceEntity) {
        const shelter = new ShelterEntity();
        shelter.name = 'Root house';
        shelter.owner = 'root';
        shelter.coordinate = {
            type: 'Point',
            coordinates: [-74.534, 39.123]
        };
        shelter.province = province;
        shelter.validate = false;
        shelter.note = 'Root is super user';
        return await queryRunner.manager.save(shelter);
    }

}
