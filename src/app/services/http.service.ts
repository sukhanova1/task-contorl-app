import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '../Board';
import { Task } from '../Task';

@Injectable()
export class HttpService {
  private baseUrl: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getAllBoards(): Observable<Board[]> {   
    return this.http.get<Board[]>(this.baseUrl + 'dashboard');
  }

  postBoard(board: Board): Observable<any> {   
    const body = JSON.stringify(board);
    return this.http.post<any>(this.baseUrl + 'dashboard', body);
  }

  patchBoardNameById(board: any): Observable<any> {  
    const body = JSON.stringify({ name: board.name });
    return this.http.patch<any>(`${this.baseUrl}dashboard/${board.id}`, body);
  }
  
  patchColumnColorByBoardId(data: any, boardId: number): Observable<any> {   
    const body = JSON.stringify(data);    
    return this.http.patch<any>(`${this.baseUrl}dashboard/${boardId}`, body);
  }

  deleteBoardById(boardId: number): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}dashboard/${boardId}`);
  }
  
  getBoardById(boardId: number): Observable<Board>{
    return this.http.get<Board>(`${this.baseUrl}dashboard/${boardId}`);
  }

  postTask(task: Task, id: number): Observable<any> {  
    const body = JSON.stringify(task); 
    return this.http.post<any>(`${this.baseUrl}dashboard/${id}/tasks`, body);
  }

  getTasks(boardId: number): Observable<Task[]> {   
    return this.http.get<Task[]>(`${this.baseUrl}dashboard/${boardId}/tasks`);
  }
  
  getTaskById(id: number): Observable<Task> { 
    return this.http.get<Task>(`${this.baseUrl}tasks/${id}`);
  }

  updateTask(data: any, id: number): Observable<any> { 
    const body = JSON.stringify(data);
    return this.http.patch<any>(`${this.baseUrl}tasks/${id}`, body);
  }

  deleteTaskbyId(taskId: number): Observable<unknown> { 
    return this.http.delete(`${this.baseUrl}tasks/${taskId}`);
  }
}
