import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'userSearch'
})
export class FlimTitlesPipe implements PipeTransform {
  transform(items: any[], args: string){
      if(!args){
          return items;
      }else{
          return items
          ? items.filter(item =>
            item.name && item.name.toString().toLowerCase().indexOf(args.toString().toLowerCase()) != -1):items;
      }
}
}
