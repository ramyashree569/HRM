import {
  Entity,
  PrimaryGeneratedColumn,
  Index,
  Column,
  Unique,
  BaseEntity,
} from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

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

  @Column()
  @Index()
  phone_number: number;

  @Column({
    type: "enum",
    enum: ["+91", "+92"],
  })
  country_code: string;

  isValidPassword = (password: string) => {
    return bcrypt.compareSync(password, this.password);
  };

  setPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hashSync(password, salt);
  };

  generate_JWT = async () => {
    return await jwt.sign(
      {
        email: this.email,
      },
      "SECRET",
      { expiresIn: "1h" }
    );
  };
}
