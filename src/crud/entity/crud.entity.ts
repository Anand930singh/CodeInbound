import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()

export class Crud{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstName:String;

    @Column()
    lastName:String;

    @Column()
    email:String;
}