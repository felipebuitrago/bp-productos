import { Product } from '../interfaces/product.interface';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {

  const productsArray : Product[] = [
    {
      id: 'pdt1',
      name: 'Tarjeta de Credito',
      logo: 'https://link.to.image/img',
      description: 'Product Desciption',
      date_release: new Date('01/02/2012'),
      date_revision: new Date('01/02/2012'),
    },
    {
      id: 'pdt2',
      name: 'Cuenta de Ahorros',
      logo: 'https://link.to.image/img',
      description: 'Product Desciption',
      date_release: new Date('01/02/2012'),
      date_revision: new Date('01/02/2012'),
    },
    {
      id: 'pdt3',
      name: 'Tarjeta de Debito',
      logo: 'https://link.to.image/img',
      description: 'Product Desciption',
      date_release: new Date('01/02/2012'),
      date_revision: new Date('01/02/2012'),
    },
  ];
  let pipe: FilterPipe;

  beforeEach(() => {
      pipe = new FilterPipe();
  });

  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  // Test para comprobar que devolvera resultados segun la busqueda
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
  });

  // Test para comprobar que devolvera todos los productos si no hay termino de busqueda
  it('should return all products if no search term', () => {
      
    const result = pipe.transform(productsArray, 0, 5, '');
    expect(result.length).toEqual(3);
  });

  // Test para comprobar que devolvera un array vacio si no coinciden los resultados con la busqueda
  it('should return empty array if no products match search term', () => {
      
    const result = pipe.transform(productsArray, 0, 5, 'producto bancario');
    expect(result).toEqual([]);
  });

  // Test para comprobar que devolvera un array vacio si numero de paginas y resultados en incoherente
  it('should handle incorrect page numbers gracefully', () => {
      
    const result = pipe.transform(productsArray, 10, 5, '');
    expect(result).toEqual([]);
  });
});
