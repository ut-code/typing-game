export default class Player {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  equals(other: Player): boolean {
    return this.name === other.name;
  }
}
