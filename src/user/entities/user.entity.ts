import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { userRoleEnum } from "../user-roles-enum/user-role-enum"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: string
    @Column()
    username: string
    @Column()
    firstName: string
    @Column()
    lastName: string
    @Column(
        {
            type : 'enum',
            enum: userRoleEnum,
            default : userRoleEnum.USER1
        }
    )
    
    role: string
    @Column()
    salt: string
    @Column()
    email: string
    @Column()
    password: string

}
