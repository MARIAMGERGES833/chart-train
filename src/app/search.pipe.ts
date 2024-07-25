import { Pipe, PipeTransform } from '@angular/core';
import { Data } from './data';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {


  transform(users: Data[],searchKey: string): Data[] {
    return users.filter((ele)=>ele.name.toLowerCase().includes(searchKey.toLowerCase()))
   }

}
