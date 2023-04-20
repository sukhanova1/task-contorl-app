import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'nameFilter'
})

export class NameFilterPipe implements PipeTransform{
  transform(values: any, searchString: any) {
    if (searchString !== '') {
      let boards = [];

      for (let board of values) {
        if (board.name.startsWith(searchString)) {
          boards.push(board);
        }
      }
      
      return boards;
    }
    
    return values;
  }
}