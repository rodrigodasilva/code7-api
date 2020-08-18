import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';

@Entity('debts')
class Debt {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  value: number;

  @Column()
  reason: string;

  @Column()
  date: Date;

  @Column()
  client: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Debt;
