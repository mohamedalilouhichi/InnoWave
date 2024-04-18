export class Competences {
  public idCompetences: number;
  public name: string;
  public description: string;
  public importanceLevel: number;
  public selected: boolean; // Existing attribute

  // New attributes to align with the backend model
  public proficiencyLevel: number;
  public yearsOfExperience: number;
  public certification: boolean;
  public lastUsed: Date;
  public industryRelevance: string;

  constructor(
    idCompetences: number,
    name: string,
    description: string,
    importanceLevel: number,
    selected: boolean = false, // Default value
    proficiencyLevel: number = 0, // Default value for new attribute
    yearsOfExperience: number = 0, // Default value for new attribute
    certification: boolean = false, // Default value for new attribute
    lastUsed: Date = new Date(), // Default value for new attribute
    industryRelevance: string = '' // Default value for new attribute
  ) {
    this.idCompetences = idCompetences;
    this.name = name;
    this.description = description;
    this.importanceLevel = importanceLevel;
    this.selected = selected;
    this.proficiencyLevel = proficiencyLevel;
    this.yearsOfExperience = yearsOfExperience;
    this.certification = certification;
    this.lastUsed = lastUsed;
    this.industryRelevance = industryRelevance;
  }
}
