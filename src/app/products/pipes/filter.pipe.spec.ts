import { Product } from '../interfaces/product.interface';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {

  const productsArray : Product[] = [
    { id: 'pdt1', name: 'Tarjeta de Credito', logo: 'https://link.to.image/img', description: 'Product Desciption', date_release: new Date('01/02/2012'), date_revision: new Date('01/02/2012') },
    { id: 'pdt2', name: 'Cuenta de Ahorros', logo: 'https://link.to.image/img', description: 'Product Desciption', date_release: new Date('01/02/2012'), date_revision: new Date('01/02/2012') },
    { id: 'pdt3', name: 'Tarjeta de Debito', logo: 'https://link.to.image/img', description: 'Product Desciption', date_release: new Date('01/02/2012'), date_revision: new Date('01/02/2012') },
  ];
  let pipe: FilterPipe;

  beforeEach(() => {
      pipe = new FilterPipe();
  });

  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter products by name based on search term', () => {
      
    const result = pipe.transform(productsArray, 0, 5, 'ahorros');
    expect(result).toEqual([{
      id: 'pdt2',
      name: 'Cuenta de Ahorros',
      logo: 'https://link.to.image/img',
      description: 'Product Desciption',
      date_release: new Date('01/02/2012'),
      date_revision: new Date('01/02/2012'),
    }]);

    console.log("✅ FilterPipe should filter products by name based on search term ✅");
  });

  it('should return all products if no search term', () => {
      
    const result = pipe.transform(productsArray, 0, 5, '');
    expect(result.length).toEqual(3);

    console.log("✅ FilterPipe should return all products if no search term ✅");
  });

  it('should return empty array if no products match search term', () => {
      
    const result = pipe.transform(productsArray, 0, 5, 'producto bancario');
    expect(result).toEqual([]);

    console.log("✅ FilterPipe should return empty array if no products match search term ✅");
  });

  it('should handle incorrect page numbers returning empty array', () => {
      
    const result = pipe.transform(productsArray, 10, 5, '');
    expect(result).toEqual([]);

    console.log("✅ FilterPipe should handle incorrect page numbers returning empty array ✅");
  });
});
