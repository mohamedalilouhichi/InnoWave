export class Test {
    idTest: number;
    name: string;
    description: string;
    status: string;
    createdAt: Date;
    duration: number;
  
    constructor(
      idTest: number,
      name: string,
      description: string,
      status: string,
      createdAt: Date,
      duration: number
    ) {
      this.idTest = idTest;
      this.name = name;
      this.description = description;
      this.status = status;
      this.createdAt = createdAt;
      this.duration = duration;
    }
  }
  