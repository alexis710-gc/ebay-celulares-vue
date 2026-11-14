import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore'
import { db } from '../firebase'
import { imageUrl, uploadAdImage } from './imageStorage'

const PLACEHOLDER = 'https://placehold.co/600x600/eeeeee/333333?text=Sin+foto'

function toProduct (snap) {
  const data = snap.data()
  const images = data.images || []
  return {
    ...data,
    id: snap.id,
    images,
    image: images.length ? imageUrl(images[0]) : PLACEHOLDER
  }
}

export async function createAd (data, files) {
  const ref = await addDoc(collection(db, 'anuncios'), {
    ...data,
    images: [],
    createdAt: serverTimestamp()
  })
  const images = []
  for (const file of files) {
    images.push(await uploadAdImage(ref.id, file))
  }
  await updateDoc(doc(db, 'anuncios', ref.id), { images })
  return ref.id
}

export async function getAds () {
  const snap = await getDocs(query(collection(db, 'anuncios'), orderBy('createdAt', 'desc')))
  return snap.docs.map(toProduct)
}

export async function getAdById (id) {
  const snap = await getDoc(doc(db, 'anuncios', String(id)))
  return snap.exists() ? toProduct(snap) : null
}