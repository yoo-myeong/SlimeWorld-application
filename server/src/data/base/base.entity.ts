import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { ValidationEntity } from "../validation/validation.js";

export abstract class BasicEntity extends ValidationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;
}
