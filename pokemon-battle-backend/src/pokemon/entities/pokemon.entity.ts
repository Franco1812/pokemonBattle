import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  attack: number;

  @Column()
  defense: number;

  @Column()
  hp: number;

  @Column()
  speed: number;

  @Column()
  type: string;

  @Column()
  imageUrl: string;

  constructor(id: string, name: string, attack: number, defense: number, hp: number, speed: number, type: string, imageUrl: string) {
	this.id = id;
	this.name = name;
	this.attack = attack;
	this.defense = defense;
	this.hp = hp;
	this.speed = speed;
	this.type = type;
	this.imageUrl = imageUrl;
  }
}