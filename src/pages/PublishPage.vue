<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-white text-dark">
      <q-toolbar>
        <q-btn flat round dense icon="arrow_back" aria-label="Volver" to="/" />
        <q-toolbar-title class="text-weight-bold text-primary">Publicar celular</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <q-card flat bordered class="publish-card">
          <q-form class="q-pa-md q-gutter-md" @submit.prevent="onSubmit">
            <q-input v-model="form.title" outlined label="Título *" :rules="[required]" />

            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-input v-model="form.brand" outlined label="Marca *" :rules="[required]" />
              </div>
              <div class="col-12 col-sm-6">
                <q-input v-model="form.color" outlined label="Color *" :rules="[required]" />
              </div>
              <div class="col-12 col-sm-6">
                <q-select
                  v-model="form.storage"
                  :options="storageOptions"
                  outlined
                  label="Almacenamiento (GB) *"
                  :rules="[required]"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-select
                  v-model="form.condition"
                  :options="conditionOptions"
                  outlined
                  label="Condición *"
                  :rules="[required]"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  v-model.number="form.price"
                  type="number"
                  min="0"
                  step="0.01"
                  outlined
                  label="Precio (USD) *"
                  :rules="[required, positive]"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  v-model.number="form.stock"
                  type="number"
                  min="0"
                  outlined
                  label="Stock *"
                  :rules="[required, nonNegative]"
                />
              </div>
            </div>

            <q-input v-model="form.seller" outlined label="Vendedor *" :rules="[required]" />

            <q-toggle v-model="form.freeShipping" color="primary" label="Envío gratis" />

            <q-file
              v-model="files"
              outlined
              multiple
              counter
              max-files="5"
              accept="image/*"
              label="Fotos (opcional, máx. 5)"
              hint="Sin fotos solo se guarda en Firestore"
            >
              <template #prepend>
                <q-icon name="photo_camera" />
              </template>
            </q-file>

            <div class="row justify-end q-gutter-sm">
              <q-btn flat no-caps label="Limpiar" :disable="loading" @click="resetForm" />
              <q-btn
                unelevated
                no-caps
                color="primary"
                icon="publish"
                label="Publicar"
                type="submit"
                :loading="loading"
              />
            </div>
          </q-form>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { createAd } from '../services/ads'

const $q = useQuasar()

const storageOptions = [64, 128, 256, 512, 1024]
const conditionOptions = ['Nuevo', 'Reacondicionado', 'Usado']

const createEmptyForm = () => ({
  title: '',
  brand: '',
  color: '',
  storage: null,
  condition: null,
  price: null,
  stock: null,
  seller: '',
  freeShipping: false
})

const form = reactive(createEmptyForm())
const files = ref([])
const loading = ref(false)

const required = (v) => (v !== null && v !== '' && v !== undefined) || 'Campo obligatorio'
const positive = (v) => v > 0 || 'Debe ser mayor a 0'
const nonNegative = (v) => v >= 0 || 'No puede ser negativo'

function resetForm () {
  Object.assign(form, createEmptyForm())
  files.value = []
}

async function onSubmit () {
  loading.value = true
  try {
    const id = await createAd(
      {
        title: form.title.trim(),
        brand: form.brand.trim(),
        color: form.color.trim(),
        storage: Number(form.storage),
        condition: form.condition,
        price: Number(form.price),
        stock: Number(form.stock),
        seller: form.seller.trim(),
        freeShipping: form.freeShipping,
        rating: 0
      },
      files.value || []
    )
    $q.notify({ type: 'positive', message: `Anuncio publicado (id: ${id})`, position: 'top-right' })
    resetForm()
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: `No se pudo publicar: ${error.message}`,
      position: 'top-right',
      timeout: 4000
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.publish-card {
  max-width: 720px;
  margin: 0 auto;
}
</style>