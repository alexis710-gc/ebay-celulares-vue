<!-- src/pages/PhoneDetailPage.vue -->
<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-white text-dark">
      <q-toolbar>
        <q-btn flat round dense icon="arrow_back" aria-label="Volver" @click="goBack" />
        <q-btn flat no-caps dense class="text-weight-bold text-h6" to="/" aria-label="Inicio">
          <q-icon name="smartphone" color="primary" class="q-mr-xs" />
          <span class="text-primary">Cel</span><span class="text-dark">Shop</span>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <div v-if="loading" class="flex felx-center q-pa-xl">
          <q-spinner color="primary" size="48px"/>
          </div>
          <div v-else-if="product" class="detail-wrapper">
          <q-breadcrumbs class="q-mb-md" active-color="primary">
            <q-breadcrumbs-el label="Inicio" to="/" icon="home" />
            <q-breadcrumbs-el :label="product.brand" />
            <q-breadcrumbs-el :label="product.title" />
          </q-breadcrumbs>

          <div class="row q-col-gutter-lg">
            <div class="col-12 col-md-6">
              <q-card flat bordered>
                <q-img :src="product.image" :ratio="1" fit="contain" class="bg-grey-2">
                  <q-badge :color="conditionColor" class="absolute-top-left q-ma-sm">
                    {{ product.condition }}
                  </q-badge>
                  <template #error>
                    <div class="absolute-full flex flex-center bg-grey-3 text-grey-7">
                      <q-icon name="smartphone" size="96px" />
                    </div>
                  </template>
                </q-img>
              </q-card>
            </div>

            <div class="col-12 col-md-6">
              <div class="text-h5 text-weight-medium">{{ product.title }}</div>

              <div class="row items-center q-gutter-x-sm q-mt-sm">
                <q-rating :model-value="product.rating" readonly size="20px" color="amber" />
                <span class="text-caption text-grey-7">{{ product.rating }} / 5</span>
              </div>

              <div class="text-h4 text-weight-bold q-mt-md">{{ formattedPrice }}</div>
              <div class="text-subtitle2 q-mt-xs" :class="product.freeShipping ? 'text-positive' : 'text-grey-7'">
                <q-icon name="local_shipping" class="q-mr-xs" />
                {{ product.freeShipping ? 'Envío gratis' : 'Envío no incluido' }}
              </div>

              <div class="q-mt-sm">
                <q-chip v-if="product.stock === 0" color="negative" text-color="white" icon="remove_shopping_cart" label="Agotado" />
                <q-chip v-else-if="product.stock <= 3" color="warning" text-color="dark" icon="warning" :label="`¡Solo quedan ${product.stock}!`" />
                <q-chip v-else color="positive" text-color="white" icon="check_circle" :label="`${product.stock} disponibles`" />
              </div>

              <q-select
                v-model="quantity"
                :options="quantityOptions"
                :disable="product.stock === 0"
                outlined
                dense
                label="Cantidad"
                class="q-mt-md"
                style="max-width: 140px"
              />

              <div class="row q-gutter-sm q-mt-md">
                <q-btn
                  unelevated
                  color="primary"
                  size="lg"
                  icon="flash_on"
                  label="Comprar ahora"
                  :disable="product.stock === 0"
                  @click="buyNow"
                />
                <q-btn
                  outline
                  color="primary"
                  size="lg"
                  icon="add_shopping_cart"
                  label="Agregar al carrito"
                  :disable="product.stock === 0"
                  @click="addToCart"
                />
              </div>

              <q-separator class="q-my-lg" />

              <div class="row items-center">
                <q-avatar color="primary" text-color="white" icon="storefront" size="40px" />
                <div class="q-ml-md">
                  <div class="text-caption text-grey-7">Vendido por</div>
                  <div class="text-subtitle1 text-weight-medium">{{ product.seller }}</div>
                </div>
              </div>
            </div>
          </div>

          <q-card flat bordered class="q-mt-lg">
            <q-tabs v-model="tab" align="left" active-color="primary" indicator-color="primary" dense>
              <q-tab name="description" label="Descripción" no-caps />
              <q-tab name="specs" label="Especificaciones" no-caps />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="description">
                <p class="q-mb-none">
                  {{ product.brand }} {{ product.title }} en color {{ product.color.toLowerCase() }}
                  con {{ product.storage }} GB de almacenamiento. Condición:
                  {{ product.condition.toLowerCase() }}. Vendido por {{ product.seller }}.
                </p>
              </q-tab-panel>
              <q-tab-panel name="specs" class="q-pa-none">
                <q-markup-table flat>
                  <tbody>
                    <tr v-for="row in specs" :key="row.label">
                      <td class="text-weight-medium" style="width: 40%">{{ row.label }}</td>
                      <td>{{ row.value }}</td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>

        <div v-else class="column items-center q-pa-xl text-grey-7">
          <q-icon name="error_outline" size="72px" />
          <div class="text-h6 q-mt-md">Producto no encontrado</div>
          <q-btn class="q-mt-md" color="primary" unelevated icon="arrow_back" label="Volver al catálogo" to="/" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import {getAdById} from '../services/ads'
const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

const $q = useQuasar()
const router = useRouter()

const product = ref(null)
const loading = ref(true)

async function loadProduct(id) {
  loading.value = true
  try{
    product.value = await getAdById(id)
  } catch(error){
    console.error(error)
    product.value=null
  }finally{
    loading.value=false
  }
  
}



const quantity = ref(1)
const tab = ref('description')

watch(() => props.id, (id) => {
  quantity.value = 1
  tab.value = 'description'
  loadProduct(id)
},{immediate: true})

const quantityOptions = computed(() =>
  Array.from({ length: Math.min(product.value?.stock || 0, 10) }, (_, i) => i + 1)
)

const formattedPrice = computed(() =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.value.price)
)

const conditionColor = computed(() => {
  const map = { Nuevo: 'positive', Reacondicionado: 'info', Usado: 'warning' }
  return map[product.value.condition] || 'grey'
})

const specs = computed(() => [
  { label: 'Marca', value: product.value.brand },
  { label: 'Modelo', value: product.value.title },
  { label: 'Almacenamiento', value: `${product.value.storage} GB` },
  { label: 'Color', value: product.value.color },
  { label: 'Condición', value: product.value.condition },
  { label: 'Envío', value: product.value.freeShipping ? 'Gratis' : 'No incluido' },
  { label: 'Vendedor', value: product.value.seller }
])

function goBack () {
  if (window.history.state?.back) router.back()
  else router.push('/')
}

function addToCart () {
  $q.notify({
    type: 'positive',
    message: `${quantity.value} × ${product.value.title} agregado al carrito`,
    position: 'top-right',
    timeout: 1800
  })
}

function buyNow () {
  $q.notify({
    type: 'info',
    message: 'Compra directa pendiente de implementar',
    position: 'top-right',
    timeout: 1800
  })
}
</script>

<style scoped>
.detail-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}
</style>