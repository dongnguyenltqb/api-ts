export class Cat {
  name: string;
  age: number;
  address: string;

  constructor(cat?: Partial<Cat>) {
    if (cat) {
      this.name = cat.name;
      this.age = cat.age;
      this.address = cat.address;
    }
  }
}
