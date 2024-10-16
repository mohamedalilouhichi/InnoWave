export class Competences {
  public idCompetences: number;
  public name: string;
  public description: string;
  public importanceLevel: number;
  public selected: boolean;

  constructor(
    idCompetences: number,
    name: string,
    description: string,
    importanceLevel: number,
    selected: boolean = false
  ) {
    this.idCompetences = idCompetences;
    this.name = name;
    this.description = description;
    this.importanceLevel = importanceLevel;
    this.selected = selected;
  }
}
