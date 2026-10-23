<template>
  <q-card flat bordered class="product-card cursor-pointer" @click="emit('view-detail', product.id)">
    <q-img :src="product.image" :ratio="1" fit="contain" class="bg-grey-2">
      <q-badge v-if="product.condition" :color="conditionColor" class="absolute-top-left q-ma-sm">
        {{ product.condition }}
      </q-badge>
      <template #error>
        <div class="absolute-full flex flex-center bg-grey-3 text-grey-7">
          <q-icon name="smartphone" size="48px" />
        </div>
      </template>
    </q-img>

    <q-card-section class="q-pb-none">
      <div class="text-subtitle1 text-weight-medium ellipsis-2-lines">{{ product.title }}</div>
      <div class="text-caption text-grey-7">
        {{ product.brand }} · {{ product.storage }} GB · {{ product.color }}
      </div>
      <q-rating
        v-if="product.rating"
        :model-value="product.rating"
        readonly
        size="16px"
        color="amber"
        class="q-mt-xs"
      />
    </q-card-section>

    <q-card-section class="q-pt-sm">
      <div class="text-h6 text-weight-bold">{{ formattedPrice }}</div>
      <div class="text-caption" :class="product.freeShipping ? 'text-positive' : 'text-grey-7'">
        {{ product.freeShipping ? 'Envío gratis' : 'Envío no incluido' }}
      </div>
      <div class="text-caption text-grey-7">Vendedor: {{ product.seller }}</div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="between">
      <q-btn flat color="primary" icon="visibility" label="Ver" @click.stop="emit('view-detail', product.id)" />
      <q-btn
        unelevated
        color="primary"
        icon="add_shopping_cart"
        label="Agregar"
        :disable="product.stock === 0"
        @click.stop="emit('add-to-cart', product)"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    validator: (p) => ['id', 'title', 'price', 'image'].every((k) => k in p)
  }
})

const emit = defineEmits(['view-detail', 'add-to-cart'])

const formattedPrice = computed(() =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.product.price)
)

const conditionColor = computed(() => {
  const map = { Nuevo: 'positive', Reacondicionado: 'info', Usado: 'warning' }
  return map[props.product.condition] || 'grey'
})
</script>

<style scoped>
.product-card {
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.product-card:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}
</style>