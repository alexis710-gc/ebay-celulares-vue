import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { uploadAdImage } from './imageStorage'

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
