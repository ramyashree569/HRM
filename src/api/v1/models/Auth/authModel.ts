import {
  Entity,
  PrimaryGeneratedColumn,
  Index,
  Column,
  Unique,
  BaseEntity,
} from "typeorm";
import { CountryCode_Enums } from "../../helpers/constants";

@Unique("unique_constraint", ["email", "phone_number"])
@Entity()
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  email: string;

  @Column()
  password: string;

  @Column({
    length: 255,
  })
  first_name: string;

  @Column({
    length: 255,
  })
  last_name: string;

  @Column({
    length: 255,
  })
  company_name: string;

  @Column(
    {
      length: 10,
    }
  )
  @Index()
  phone_number: string;

  @Column({
    type: "enum",
    enum: [...CountryCode_Enums],
  })
  country_code: string;
  
}
