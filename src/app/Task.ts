import { Comment } from "./Comment";

export class Task {
  public creationDate: string;
  public id!: string;
  public dashboard_id!: string;
  public status: 'ToDo' | 'In Progress' | 'Done' | 'Archived';
  
  public comments: Comment[] = [];

  constructor(public name: string, status:any) { 
    this.status = status;
    this.creationDate = new Date().toLocaleString();
  }
}