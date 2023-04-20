export class Board {
  public creationDate: string;
  
  public toDoColumnColor: string;
  public inProgressColumnColor: string;
  public doneColumnColor: string;
  public id!: string;
  
  constructor(public name: string, readonly description: string, public user_id: string) {
    this.creationDate = new Date().toLocaleString();
    this.toDoColumnColor = '#fff';
    this.inProgressColumnColor = '#fff';
    this.doneColumnColor = '#fff';    
  }
}
