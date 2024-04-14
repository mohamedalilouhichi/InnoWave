export class Competences {
  public idCompetences: number;
  public name: string;
  public description: string;
  public importanceLevel: number;
  public selected: boolean; // Déclaration sans point d'interrogation, pas initialisée dans le constructeur

  constructor(
    idCompetences: number,
    name: string,
    description: string,
    importanceLevel: number,
    selected: boolean = false  // Valeur par défaut définie ici
  ) {
    this.idCompetences = idCompetences;
    this.name = name;
    this.description = description;
    this.importanceLevel = importanceLevel;
    this.selected = selected; // Assignation de la valeur par défaut ou de la valeur fournie
  }
}
