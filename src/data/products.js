const img = (t) => `https://placehold.co/600x600/eeeeee/333333?text=${encodeURIComponent(t)}`

export const products = [
  { id: 1, title: 'iPhone 13 128GB Medianoche', brand: 'Apple', storage: 128, color: 'Negro', condition: 'Reacondicionado', price: 489.99, rating: 4.5, freeShipping: true, seller: 'TechSV', stock: 5, image: img('iPhone 13') },
  { id: 2, title: 'iPhone 14 Pro 256GB Morado', brand: 'Apple', storage: 256, color: 'Morado', condition: 'Usado', price: 749.0, rating: 4, freeShipping: true, seller: 'MovilPlus', stock: 2, image: img('iPhone 14 Pro') },
  { id: 3, title: 'iPhone 15 128GB Rosa', brand: 'Apple', storage: 128, color: 'Rosa', condition: 'Nuevo', price: 799.0, rating: 5, freeShipping: true, seller: 'AppleStoreSV', stock: 8, image: img('iPhone 15') },
  { id: 4, title: 'Samsung Galaxy S23 256GB', brand: 'Samsung', storage: 256, color: 'Verde', condition: 'Nuevo', price: 699.0, rating: 4.5, freeShipping: true, seller: 'GalaxyHub', stock: 10, image: img('Galaxy S23') },
  { id: 5, title: 'Samsung Galaxy A54 128GB', brand: 'Samsung', storage: 128, color: 'Lima', condition: 'Nuevo', price: 349.0, rating: 4, freeShipping: false, seller: 'GalaxyHub', stock: 15, image: img('Galaxy A54') },
  { id: 6, title: 'Samsung Galaxy S21 128GB', brand: 'Samsung', storage: 128, color: 'Gris', condition: 'Usado', price: 259.5, rating: 3.5, freeShipping: false, seller: 'UsadosCel', stock: 1, image: img('Galaxy S21') },
  { id: 7, title: 'Xiaomi Redmi Note 12 128GB', brand: 'Xiaomi', storage: 128, color: 'Azul', condition: 'Nuevo', price: 199.0, rating: 4, freeShipping: true, seller: 'MiStoreSV', stock: 20, image: img('Redmi Note 12') },
  { id: 8, title: 'Xiaomi 13T 256GB', brand: 'Xiaomi', storage: 256, color: 'Negro', condition: 'Nuevo', price: 549.0, rating: 4.5, freeShipping: true, seller: 'MiStoreSV', stock: 6, image: img('Xiaomi 13T') },
  { id: 9, title: 'Motorola Edge 40 256GB', brand: 'Motorola', storage: 256, color: 'Azul', condition: 'Reacondicionado', price: 329.0, rating: 4, freeShipping: false, seller: 'TechSV', stock: 4, image: img('Moto Edge 40') },
  { id: 10, title: 'Motorola Moto G54 128GB', brand: 'Motorola', storage: 128, color: 'Gris', condition: 'Nuevo', price: 179.0, rating: 3.5, freeShipping: true, seller: 'MovilPlus', stock: 0, image: img('Moto G54') },
  { id: 11, title: 'Google Pixel 8 128GB', brand: 'Google', storage: 128, color: 'Obsidiana', condition: 'Nuevo', price: 599.0, rating: 5, freeShipping: true, seller: 'PixelSV', stock: 7, image: img('Pixel 8') },
  { id: 12, title: 'Google Pixel 7a 128GB', brand: 'Google', storage: 128, color: 'Blanco', condition: 'Reacondicionado', price: 289.0, rating: 4, freeShipping: false, seller: 'PixelSV', stock: 3, image: img('Pixel 7a') },
  { id: 13, title: 'OnePlus 11 256GB', brand: 'OnePlus', storage: 256, color: 'Verde', condition: 'Usado', price: 429.0, rating: 4, freeShipping: true, seller: 'UsadosCel', stock: 2, image: img('OnePlus 11') },
  { id: 14, title: 'iPhone SE 64GB Rojo', brand: 'Apple', storage: 64, color: 'Rojo', condition: 'Usado', price: 169.0, rating: 3.5, freeShipping: false, seller: 'UsadosCel', stock: 3, image: img('iPhone SE') }
]

export const findProductById = (id) => products.find((p) => p.id === Number(id)) || null