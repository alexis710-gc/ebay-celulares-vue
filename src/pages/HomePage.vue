<template>
  <q-layout view="hHh LpR fFf">
    <Navbar
      v-model:search="search"
      :cart-count="cart.length"
      @toggle-filters="drawerOpen = !drawerOpen"
    />

    <q-drawer v-model="drawerOpen" show-if-above bordered :width="280" :breakpoint="1024">
      <SidebarFilters
        v-model="filters"
        :brand-options="brandOptions"
        :storage-options="storageOptions"
        :price-limits="priceLimits"
        @reset="resetFilters"
      />
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-md">
        <div class="row items-center q-mb-md q-col-gutter-sm">
          <div class="col-12 col-sm">
            <div class="text-h6">Celulares</div>
            <div class="text-caption text-grey-7">{{ filteredProducts.length }} resultados</div>
          </div>
          <div class="col-12 col-sm-4 col-md-3">
            <q-select
              v-model="sortBy"
              :options="sortOptions"
              option-value="value"
              option-label="label"
              emit-value
              map-options
              outlined
              dense
              label="Ordenar por"
            />
          </div>
        </div>

        <div v-if="paginatedProducts.length" class="row q-col-gutter-md">
          <div
            v-for="p in paginatedProducts"
            :key="p.id"
            class="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <ProductCard :product="p" @view-detail="goToDetail" @add-to-cart="addToCart" />
          </div>
        </div>

        <div v-else class="column items-center q-pa-xl text-grey-7">
          <q-icon name="search_off" size="64px" />
          <div class="text-h6 q-mt-md">Sin resultados</div>
          <div class="q-mb-md">Prueba con otra búsqueda o ajusta los filtros.</div>
          <q-btn color="primary" unelevated icon="filter_alt_off" label="Limpiar filtros" @click="clearAll" />
        </div>

        <div v-if="totalPages > 1" class="flex flex-center q-mt-lg">
          <q-pagination
            v-model="page"
            :max="totalPages"
            :max-pages="6"
            direction-links
            boundary-links
            color="primary"
          />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import Navbar from 'src/components/Navbar.vue'
import SidebarFilters from 'src/components/SidebarFilters.vue'
import ProductCard from 'src/components/ProductCard.vue'

const $q = useQuasar()
const router = useRouter()

import { products as catalog } from 'src/data/products'

const products = ref(catalog)

const PER_PAGE = 8

const brandOptions = computed(() => [...new Set(products.value.map((p) => p.brand))].sort())
const storageOptions = computed(() => [...new Set(products.value.map((p) => p.storage))].sort((a, b) => a - b))
const priceLimits = computed(() => ({
  min: 0,
  max: Math.ceil(Math.max(...products.value.map((p) => p.price)) / 100) * 100
}))

const createDefaultFilters = () => ({
  brands: [],
  conditions: [],
  storage: [],
  freeShipping: false,
  priceRange: { min: priceLimits.value.min, max: priceLimits.value.max }
})

const search = ref('')
const sortBy = ref('relevance')
const page = ref(1)
const drawerOpen = ref(false)
const filters = ref(createDefaultFilters())
const cart = ref([])

const sortOptions = [
  { label: 'Relevancia', value: 'relevance' },
  { label: 'Precio: menor a mayor', value: 'price-asc' },
  { label: 'Precio: mayor a menor', value: 'price-desc' },
  { label: 'Mejor valorados', value: 'rating' }
]

const filteredProducts = computed(() => {
  const q = search.value.trim().toLowerCase()
  const f = filters.value

  const list = products.value.filter((p) => {
    if (q && !`${p.title} ${p.brand}`.toLowerCase().includes(q)) return false
    if (f.brands.length && !f.brands.includes(p.brand)) return false
    if (f.conditions.length && !f.conditions.includes(p.condition)) return false
    if (f.storage.length && !f.storage.includes(p.storage)) return false
    if (f.freeShipping && !p.freeShipping) return false
    if (p.price < f.priceRange.min || p.price > f.priceRange.max) return false
    return true
  })

  const sorters = {
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    rating: (a, b) => b.rating - a.rating
  }
  return sorters[sortBy.value] ? [...list].sort(sorters[sortBy.value]) : list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / PER_PAGE)))

const paginatedProducts = computed(() => {
  const start = (page.value - 1) * PER_PAGE
  return filteredProducts.value.slice(start, start + PER_PAGE)
})

watch([search, sortBy, filters], () => {
  page.value = 1
}, { deep: true })

function resetFilters () {
  filters.value = createDefaultFilters()
}

function clearAll () {
  search.value = ''
  sortBy.value = 'relevance'
  resetFilters()
}

function goToDetail (id) {
  router.push(`/phone/${id}`)
}

function addToCart (product) {
  cart.value.push(product)
  $q.notify({
    type: 'positive',
    message: `${product.title} agregado al carrito`,
    position: 'top-right',
    timeout: 1800
  })
}
</script>