import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1744887586241 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'user',
              columns: [
                {
                  name: 'id',
                  type: 'serial',
                  isPrimary: true,
                },
                {
                  name: 'name',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'password',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'email',
                  type: 'varchar',
                  isNullable: false,
                },
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
