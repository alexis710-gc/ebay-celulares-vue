#!/usr/bin/env bash
# Ejecutar en la raíz del proyecto (donde está package.json):
#   bash setup-services.sh
set -e

if [ ! -f package.json ]; then
  echo "Ejecuta este script en la raíz del proyecto (donde está package.json)."
  exit 1
fi

# Crea un archivo con lo que llega por stdin, sin pisar uno que ya exista
write_file() {
  if [ -e "$1" ]; then
    echo "Ya existe $1, no lo toco"
    cat > /dev/null
  else
    cat > "$1"
    echo "Creado $1"
  fi
}

mkdir -p src/services

write_file src/firebase.js <<'EOF'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
})

export const db = getFirestore(app)
EOF

write_file src/services/imageStorage.js <<'EOF'
import axios from 'axios'

const PREFIX = import.meta.env.VITE_STORAGE_PREFIX

const api = axios.create({
  baseURL: import.meta.env.VITE_COUCHDB_URL,
  auth: {
    username: import.meta.env.VITE_COUCHDB_USER,
    password: import.meta.env.VITE_COUCHDB_PASS
  }
})

export async function uploadAdImage (adId, file) {
  const docId = `${PREFIX}_${adId}_${Date.now()}`
  const { data: doc } = await api.put(`/${docId}`, {
    adId,
    name: file.name,
    createdAt: new Date().toISOString()
  })
  await api.put(`/${docId}/${encodeURIComponent(file.name)}`, file, {
    params: { rev: doc.rev },
    headers: { 'Content-Type': file.type }
  })
  return { docId, fileName: file.name }
}

export const imageUrl = ({ docId, fileName }) =>
  `${import.meta.env.VITE_COUCHDB_URL}/${docId}/${encodeURIComponent(fileName)}`
EOF

write_file src/services/ads.js <<'EOF'
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
EOF

write_file .env <<'EOF'
VITE_STORAGE_PREFIX=adilson
VITE_COUCHDB_URL=
VITE_COUCHDB_USER=
VITE_COUCHDB_PASS=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
EOF

touch .gitignore
if ! grep -qx '.env' .gitignore; then
  printf '\n.env\n' >> .gitignore
  echo "Agregado .env a .gitignore"
fi

echo
echo "Listo. Falta llenar los valores en .env y reiniciar npm run dev."
