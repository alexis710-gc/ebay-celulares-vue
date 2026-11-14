// scripts/seed.mjs
import { initializeApp } from 'firebase/app'
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  where
} from 'firebase/firestore'

const app = initializeApp({
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
})

const db = getFirestore(app)
const anuncios = collection(db, 'anuncios')
const seeded = query(anuncios, where('seed', '==', true))

const samples = [
  { title: 'iPhone 13 128GB Medianoche', brand: 'Apple', storage: 128, color: 'Negro', condition: 'Reacondicionado', price: 489.99, rating: 4.5, freeShipping: true, seller: 'TechSV', stock: 5 },
  { title: 'iPhone 14 Pro 256GB Morado', brand: 'Apple', storage: 256, color: 'Morado', condition: 'Usado', price: 749, rating: 4, freeShipping: true, seller: 'MovilPlus', stock: 2 },
  { title: 'iPhone 15 128GB Rosa', brand: 'Apple', storage: 128, color: 'Rosa', condition: 'Nuevo', price: 799, rating: 5, freeShipping: true, seller: 'AppleStoreSV', stock: 8 },
  { title: 'Samsung Galaxy S23 256GB', brand: 'Samsung', storage: 256, color: 'Verde', condition: 'Nuevo', price: 699, rating: 4.5, freeShipping: true, seller: 'GalaxyHub', stock: 10 },
  { title: 'Samsung Galaxy A54 128GB', brand: 'Samsung', storage: 128, color: 'Lima', condition: 'Nuevo', price: 349, rating: 4, freeShipping: false, seller: 'GalaxyHub', stock: 15 },
  { title: 'Samsung Galaxy S21 128GB', brand: 'Samsung', storage: 128, color: 'Gris', condition: 'Usado', price: 259.5, rating: 3.5, freeShipping: false, seller: 'UsadosCel', stock: 1 },
  { title: 'Xiaomi Redmi Note 12 128GB', brand: 'Xiaomi', storage: 128, color: 'Azul', condition: 'Nuevo', price: 199, rating: 4, freeShipping: true, seller: 'MiStoreSV', stock: 20 },
  { title: 'Xiaomi 13T 256GB', brand: 'Xiaomi', storage: 256, color: 'Negro', condition: 'Nuevo', price: 549, rating: 4.5, freeShipping: true, seller: 'MiStoreSV', stock: 6 },
  { title: 'Motorola Edge 40 256GB', brand: 'Motorola', storage: 256, color: 'Azul', condition: 'Reacondicionado', price: 329, rating: 4, freeShipping: false, seller: 'TechSV', stock: 4 },
  { title: 'Motorola Moto G54 128GB', brand: 'Motorola', storage: 128, color: 'Gris', condition: 'Nuevo', price: 179, rating: 3.5, freeShipping: true, seller: 'MovilPlus', stock: 0 },
  { title: 'Google Pixel 8 128GB', brand: 'Google', storage: 128, color: 'Obsidiana', condition: 'Nuevo', price: 599, rating: 5, freeShipping: true, seller: 'PixelSV', stock: 7 },
  { title: 'Google Pixel 7a 128GB', brand: 'Google', storage: 128, color: 'Blanco', condition: 'Reacondicionado', price: 289, rating: 4, freeShipping: false, seller: 'PixelSV', stock: 3 },
  { title: 'OnePlus 11 256GB', brand: 'OnePlus', storage: 256, color: 'Verde', condition: 'Usado', price: 429, rating: 4, freeShipping: true, seller: 'UsadosCel', stock: 2 },
  { title: 'iPhone SE 64GB Rojo', brand: 'Apple', storage: 64, color: 'Rojo', condition: 'Usado', price: 169, rating: 3.5, freeShipping: false, seller: 'UsadosCel', stock: 3 }
]

async function seed () {
  const existing = await getDocs(seeded)
  if (!existing.empty) {
    console.log(`Ya hay ${existing.size} anuncios de ejemplo. Corre con --clear para borrarlos primero.`)
    return
  }
  for (const sample of samples) {
    await addDoc(anuncios, { ...sample, images: [], seed: true, createdAt: serverTimestamp() })
  }
  console.log(`Creados ${samples.length} anuncios de ejemplo`)
}

async function clear () {
  const existing = await getDocs(seeded)
  for (const snap of existing.docs) {
    await deleteDoc(snap.ref)
  }
  console.log(`Borrados ${existing.size} anuncios de ejemplo`)
}

const run = process.argv.includes('--clear') ? clear : seed

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })