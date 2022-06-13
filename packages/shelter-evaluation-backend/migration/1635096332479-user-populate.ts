import { ProvinceEntity, QuestionEntity, ShelterEntity, UserEntity, UserPositionEntity, RoleEntity } from "../src/package";
import { MigrationInterface, QueryRunner } from "typeorm";
import { OrganizationEntity } from '../src/package/user/entity/organization.entity';
import { CommunityEntity } from "../src/package/user/entity/community.entity";
import { ROLE } from "shelter-evaluation-dto";

export class userPopulate1635096332479 implements MigrationInterface {

    private communityList = [
        {
          id: 1,
          name: "Andalucía",
        },
        {
          id: 2,
          name: "Aragón",
        },
        {
          id: 3,
          name: "Asturias",
        },
        {
          id: 4,
          name: "Islas baleares",
        },
        {
          id: 5,
          name: "Canarias",
        },
        {
          id: 6,
          name: "Cantabria",
        },
        {
          id: 7,
          name: "Castilla y León",
        },
        {
          id: 8,
          name: "Castilla-La Mancha",
        },
        {
          id: 9,
          name: "Cataluña",
        },
        {
          id: 10,
          name: "Comunidad Valenciana",
        },
        {
          id: 11,
          name: "Extremadura",
        },
        {
          id: 12,
          name: "Galicia",
        },
        {
          id: 13,
          name: "Madrid",
        },
        {
          id: 14,
          name: "Murcia",
        },
        {
          id: 15,
          name: "Navarra",
        },
        {
          id: 16,
          name: "País Vasco",
        },
        {
          id: 17,
          name: "Rioja",
        },
        {
          id: 18,
          name: "Ceuta",
        },
        {
          id: 19,
          name: "Melilla",
        }
    ];

    private provinceList = [
        {
          id: 4,
          name: "Almería",
          communityId: 1,
        },
        {
          id: 11,
          name: "Cádiz",
          communityId: 11,
        },
        {
          id: 14,
          name: "Córdoba",
          communityId: 1,
        },
        {
          id: 18,
          name: "Granada",
          communityId: 1,
        },
        {
          id: 21,
          name: "Huelva",
          communityId: 1,
        },
        {
          id: 23,
          name: "Jaén",
          communityId: 1,
        },
        {
          id: 29,
          name: "Málaga",
          communityId: 1,
        },
        {
          id: 41,
          name: "Sevilla",
          communityId: 1,
        },
        {
          id: 22,
          name: "Huesca",
          communityId: 2,
        },
        {
          id: 44,
          name: "Teruel",
          communityId: 2,
          
        },
        {
          id: 50,
          name: "Zaragoza",
          communityId: 2,
        },
        {
          id: 33,
          name: "Asturias",
          communityId: 3,
        },
        {
          id: 7,
          name: "Balears, Illes",
          communityId: 4,
        },
        {
          id: 35,
          name: "Palmas, Las",
          communityId: 5,
        },
        {
          id: 38,
          name: "Santa Cruz de Tenerife",
          communityId: 5,
        },
        {
          id: 39,
          name: "Cantabria",
          communityId: 6,
        },
        {
          id: 5,
          name: "Ávila",
          communityId: 7,
        },
        {
          id: 9,
          name: "Burgos",
          communityId: 7,
        },
        {
          id: 24,
          name: "León",
          communityId: 7,
        },
        {
          id: 34,
          name: "Palencia",
          communityId: 7,
        },
        {
          id: 37,
          name: "Salamanca",
          communityId: 7,
        },
        {
          id: 40,
          name: "Segovia",
          communityId: 7,
        },
        {
          id: 42,
          name: "Soria",
          communityId: 7,
        },
        {
          id: 47,
          name: "Valladolid",
          communityId: 7,
        },
        {
          id: 49,
          name: "Zamora",
          communityId: 7,
        },
        {
          id: 2,
          name: "Albacete",
          communityId: 8,
        },
        {
          id: 13,
          name: "Ciudad Real",
          communityId: 8,
        },
        {
          id: 16,
          name: "Cuenca",
          communityId: 8,
        },
        {
          id: 19,
          name: "Guadalajara",
          communityId: 8,
        },
        {
          id: 45,
          name: "Toledo",
          communityId: 8,
        },
        {
          id: 8,
          name: "Barcelona",
          communityId: 9,
        },
        {
          id: 17,
          name: "Girona",
          communityId: 9,
        },
        {
          id: 25,
          name: "Lleida",
          communityId: 9,
        },
        {
          id: 43,
          name: "Tarragona",
          communityId: 9,
        },
        {
          id: 3,
          name: "Alicante",
          communityId: 10,
        },
        {
          id: 12,
          name: "Castellón",
          communityId: 10,
        },
        {
          id: 46,
          name: "Valencia",
          communityId: 10,
        },
        {
          id: 6,
          name: "Badajoz",
          communityId: 11,
        },
        {
          id: 10,
          name: "Cáceres",
          communityId: 11,
        },
        {
          id: 15,
          name: "Coruña",
          communityId: 12,
        },
        {
          id: 27,
          name: "Lugo",
          communityId: 12,
        },
        {
          id: 32,
          name: "Ourense",
          communityId: 12,
        },
        {
          id: 36,
          name: "Pontevedra",
          communityId: 12,
        },
        {
          id: 28,
          name: "Madrid",
          communityId: 13,
        },
        {
          id: 30,
          name: "Murcia",
          communityId: 14,
        },
        {
          id: 31,
          name: "Navarra",
          communityId: 15,
        },
        {
          id: 1,
          name:"Araba",
          communityId: 16,
        },
        {
          id: 48,
          name: "Bizkaia",
          communityId: 16,
        },
        {
          id: 20,
          name: "Gipuzkoa",
          communityId: 16,
        },
        {
          id: 26,
          name: "Rioja",
          communityId: 17,
        },
        {
          id: 51,
          name: "Ceuta",
          communityId: 18,
        },
        {
          id: 52,
          name: "Melilla",
          communityId: 19,
        }
    ];

    private questionList = [
      "Existe acceso rodado hasta una distancia máxima de 50 m del edificio, adecuado para buses, camiones/furgonetas y ambulancias",
      "Existe aparcamiento a una distancia máxima de 50 m del edificio, para mínimo 1 coche+1 bus+ 1 ambulancia.",
      "Suministro de agua de forma continuada garantizado.",
      "Suministro de agua caliente para duchas disponible",
      "Conexión a sistema de saneamiento en buen estado (red, fosa séptica…)",
      "Suministro de electricidad garantizado (red eléctrica, generadores…)",
      "Luz natural o artificial en todos los espacios",
      "¿Hay luz natural o artificial en todos los espacios?",
      "¿Hay luz natural en las áreas de estancia y trabajo?",
      "Hay ventilación asegurada en todos los espacios que se van a utilizar y de forma continuada. Puede ser natural (ventanas, puertas), forzada (impulsión/expulsión) o mixta.",
      "Sistema de calefacción en climas fríos para garantizar una temperatura de 18-21º.",
      "(Sistema general para todo el edificio, no sistemas para uso individual)",
      "Posibilidad de funcionamiento con 1 solo acceso al edificio o recinto, para seguridad y control",
      "Espacios comunes accesibles para usuarios en sillas de ruedas, personas mayores, niños, embarazadas…",
      "¿Los baños estan diferciados por genero?"
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        const organization = await this.storageOrganizations(queryRunner);
        const position = await this.storagePosition(queryRunner);
        const role = await this.storageRoles(queryRunner);
        const communityList = await this.storageCommunity(queryRunner);
        const province = await this.storageProvinceAndCommunity(queryRunner, communityList);
        await this.createDefaultUser(position, role, organization, province, queryRunner);
        await this.storageQuestions(queryRunner);
        await this.sotorageShelter(queryRunner, province, communityList[0]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.clearDatabase('user');
        queryRunner.clearDatabase('shelter');
        queryRunner.clearDatabase('question');
        queryRunner.clearDatabase('user_role');
        queryRunner.clearDatabase('user_position');
        queryRunner.clearDatabase('province');
        queryRunner.clearDatabase('community');
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
        let administrator: RoleEntity;
        for (let key of Object.keys(ROLE)) {
            const role = ROLE[key];
            const roleEntity = new RoleEntity();
            roleEntity.name = role;
            const auxRole = await queryRunner.manager.save(roleEntity);
            if (auxRole.name === ROLE.ADMINISTRATOR) {
                administrator = auxRole;
            }
        }
        return administrator;
    }

    private async storageCommunity(queryRunner: QueryRunner) {
      const communityEntityList: CommunityEntity[] = [];
      for (let community of this.communityList) {
        const communityEntity = new CommunityEntity();
        communityEntity.id = community.id;
        communityEntity.name = community.name;
        communityEntityList.push(await queryRunner.manager.save(communityEntity));
      }
      return communityEntityList;
    }

    private async storageProvinceAndCommunity(queryRunner: QueryRunner, communityEntityList: CommunityEntity[]) {
      let provinceEntityAux: ProvinceEntity;
      for (let province of this.provinceList) {
          const provinceEntity = new ProvinceEntity();
          provinceEntity.id = province.id;
          provinceEntity.name = province.name;
          provinceEntity.community = communityEntityList.find(community => community.id === province.communityId);
          provinceEntityAux = await queryRunner.manager.save(provinceEntity);
      }
      return provinceEntityAux;
    }

    private async createDefaultUser(
        position: UserPositionEntity, 
        organization: OrganizationEntity, 
        role: RoleEntity, 
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

    private async sotorageShelter(queryRunner: QueryRunner, province: ProvinceEntity, community: CommunityEntity) {
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
        shelter.municipality = 'test';
        shelter.community = community;
        shelter.surface = 100;
        shelter.exteriorSurface = 30;
        shelter.bathroomSurface = 20;
        shelter.showerQuantity = 1;
        shelter.sinkQuantity = 1;
        shelter.toiletQuantity = 1;
        shelter.washingMachineQuantity = 100;
        shelter.cacSurface = 0;
        shelter.showerQuantityCac = 0;
        shelter.potableShowerSpaceQuantityCac = 0;
        shelter.toiletQuantityCac = 0;
        shelter.howManySurfaceForToiletCac = 0;
        shelter.howManyWashingMachineCanInstallCac = 0;
        shelter.thereAreTolietFor20PersonCac = 0;
        shelter.potableWashingMachineSurfaceCac = 0;
        shelter.apSurface = 0;
        shelter.showerQuantitysAp = 0;
        shelter.portableShowerSpaceQuantityAp = 0;
        shelter.toiletQuantityAp = 0;
        shelter.howManySurfaceForToiletsAp = 0;
        shelter.howManyWashingMachineCanInstallAp = 0;
        shelter.thereAreTolietFor20PersonAp = 0;
        shelter.potableWashingMachineSurfaceAP = 0;
        shelter.sufarceWahsingMachineCac = 0;
        shelter.sufarceWahsingMachineAp = 0;
        return await queryRunner.manager.save(shelter);
    }

}
