import { Column, PrimaryGeneratedColumn, Entity, getRepository } from "typeorm";

type Position = "seller" | "buyer";
type SingupData = {
  email: string;
  useranem: string;
  password: string;
  position: Position;
};

export interface UserEntity {
  signup(data: SingupData): Promise<Object>;
}

@Entity()
export class User implements UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  position: Position;

  async signup(data: SingupData): Promise<Object> {
    try {
      const userRepository = getRepository(User);
      return userRepository.save(data);
    } catch (error) {
      console.error("error");
    }
  }
}
