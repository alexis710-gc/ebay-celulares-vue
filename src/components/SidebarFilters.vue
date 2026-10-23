<!-- src/components/SidebarFilters.vue -->
<template>
  <q-scroll-area class="fit">
    <div class="q-pa-md">
      <div class="row items-center q-mb-sm">
        <div class="text-h6">Filtros</div>
        <q-badge v-if="activeCount" color="primary" rounded class="q-ml-sm">{{ activeCount }}</q-badge>
        <q-space />
        <q-btn
          flat
          dense
          no-caps
          color="primary"
          icon="filter_alt_off"
          label="Limpiar"
          :disable="!activeCount"
          @click="emit('reset')"
        />
      </div>

      <q-separator />

      <q-expansion-item default-opened label="Marca" header-class="text-weight-medium" expand-separator>
        <q-option-group
          :model-value="modelValue.brands"
          :options="brandItems"
          type="checkbox"
          color="primary"
          @update:model-value="update('brands', $event)"
        />
      </q-expansion-item>

      <q-expansion-item default-opened label="Condición" header-class="text-weight-medium" expand-separator>
        <q-option-group
          :model-value="modelValue.conditions"
          :options="conditionItems"
          type="checkbox"
          color="primary"
          @update:model-value="update('conditions', $event)"
        />
      </q-expansion-item>

      <q-expansion-item default-opened label="Almacenamiento" header-class="text-weight-medium" expand-separator>
        <q-option-group
          :model-value="modelValue.storage"
          :options="storageItems"
          type="checkbox"
          color="primary"
          @update:model-value="update('storage', $event)"
        />
      </q-expansion-item>

      <q-expansion-item default-opened label="Precio (USD)" header-class="text-weight-medium" expand-separator>
        <div class="q-px-sm q-pt-lg q-pb-sm">
          <q-range
            :model-value="modelValue.priceRange"
            :min="priceLimits.min"
            :max="priceLimits.max"
            :step="10"
            label-always
            color="primary"
            :left-label-value="`$${modelValue.priceRange.min}`"
            :right-label-value="`$${modelValue.priceRange.max}`"
            @update:model-value="update('priceRange', $event)"
          />
        </div>
      </q-expansion-item>

      <q-separator />

      <q-toggle
        :model-value="modelValue.freeShipping"
        label="Solo envío gratis"
        color="primary"
        class="q-mt-md"
        @update:model-value="update('freeShipping', $event)"
      />
    </div>
  </q-scroll-area>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  brandOptions: {
    type: Array,
    default: () => []
  },
  storageOptions: {
    type: Array,
    default: () => []
  },
  priceLimits: {
    type: Object,
    default: () => ({ min: 0, max: 1000 })
  }
})

const emit = defineEmits(['update:modelValue', 'reset'])

const brandItems = computed(() => props.brandOptions.map((b) => ({ label: b, value: b })))
const storageItems = computed(() => props.storageOptions.map((s) => ({ label: `${s} GB`, value: s })))
const conditionItems = [
  { label: 'Nuevo', value: 'Nuevo' },
  { label: 'Reacondicionado', value: 'Reacondicionado' },
  { label: 'Usado', value: 'Usado' }
]

const activeCount = computed(() => {
  const f = props.modelValue
  return (
    f.brands.length +
    f.conditions.length +
    f.storage.length +
    (f.freeShipping ? 1 : 0) +
    (f.priceRange.min > props.priceLimits.min || f.priceRange.max < props.priceLimits.max ? 1 : 0)
  )
})

function update (key, value) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
</script>