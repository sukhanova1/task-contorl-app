export class Comment {
  public creationDate: string;
  public id!: string;

  constructor(public name: string) {
    this.creationDate = new Date().toLocaleString();
  }
}