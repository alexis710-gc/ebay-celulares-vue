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
