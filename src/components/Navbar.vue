<template>
  <q-header elevated class="bg-white text-dark">
    <q-toolbar class="q-gutter-x-sm">
      <q-btn
        flat
        round
        dense
        icon="tune"
        class="lt-md"
        aria-label="Filtros"
        @click="emit('toggle-filters')"
      />

      <q-btn
        flat
        no-caps
        dense
        class="text-weight-bold text-h6"
        to="/"
        aria-label="Inicio"
      >
        <q-icon name="smartphone" color="primary" class="q-mr-xs" />
        <span class="text-primary">Cel</span><span class="text-dark">Shop</span>
      </q-btn>

      <q-space class="gt-xs" />

      <q-input
        :model-value="search"
        dense
        outlined
        clearable
        debounce="300"
        placeholder="Buscar celulares, marcas..."
        class="col"
        style="max-width: 640px"
        @update:model-value="onSearch"
      >
        <template #prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-space class="gt-xs" />

      <q-btn flat round dense icon="shopping_cart" aria-label="Carrito" @click="emit('open-cart')">
        <q-badge v-if="cartCount > 0" color="negative" floating rounded>
          {{ cartCount }}
        </q-badge>
        <q-tooltip>Carrito</q-tooltip>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup>
defineProps({
  search: {
    type: String,
    default: ''
  },
  cartCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:search', 'toggle-filters', 'open-cart'])

function onSearch (value) {
  emit('update:search', value ?? '')
}
</script>