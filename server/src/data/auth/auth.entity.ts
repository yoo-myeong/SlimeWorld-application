import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import "express-async-errors";
import { ValidationEntity } from "../validation/validation.js";
import { IsEmail } from "class-validator";

type Position = "seller" | "buyer";
export type SingupData = {
  email: string;
  username: string;
  password: string;
  position: Position;
};

export interface UserEntity {
  createUser(data: SingupData): Promise<Object>;
}

@Entity()
export class User extends ValidationEntity implements UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  position: Position;

  async createUser(data: SingupData): Promise<Object> {
    const keys = Object.keys(data);
    keys.forEach((key) => {
      this[key] = data[key];
    });
    return this.save();
  }
}
