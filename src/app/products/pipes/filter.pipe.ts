import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: Product[], page: number, recordsPerPage: number, search: string): Product[] {

    if (search.length === 0 )
      return products.slice(page * recordsPerPage, (page * recordsPerPage) + recordsPerPage);

    const filteredBySearch = products.filter(pdt => pdt.name.toLowerCase().includes(search.toLowerCase()));
    return filteredBySearch.slice(page, page + recordsPerPage);
  }

}
