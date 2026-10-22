<script setup>
// defineProps nos permite declarar qué datos espera recibir este componente desde su "padre" (HomeView)
defineProps({
  phone: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="product-card">
    <div class="card-image-wrapper">
      <img :src="phone.imagen" :alt="phone.nombre" class="product-img" />
      <span v-if="phone.condicion" class="badge-condition">
        {{ phone.condicion }}
      </span>
    </div>

    <div class="product-info">
      <span class="product-brand">{{ phone.marca }}</span>
      <h3 class="product-title">{{ phone.nombre }}</h3>
      
      <p class="product-specs">
        {{ phone.pantalla }} • {{ phone.ram }} RAM • {{ phone.almacenamiento }}
      </p>

      <div class="price-row">
        <span class="product-price">${{ phone.precio.toFixed(2) }}</span>
        <span v-if="phone.envioGratis" class="badge-shipping">Envío Gratis</span>
      </div>

      <!-- Enlace dinámico usando Vue Router -->
      <router-link :to="`/celular/${phone.id}`" class="detail-btn">
        Ver detalle
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  height: 180px;
  background: #f9fafb;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge-condition {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 0.7rem;
  padding: 3px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}

.product-info {
  padding: 14px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-brand {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #6b7280;
  font-weight: 600;
}

.product-title {
  font-size: 0.95rem;
  margin: 4px 0;
  font-weight: 600;
  color: #111827;
}

.product-specs {
  font-size: 0.8rem;
  color: #6b7280;
  margin-bottom: 12px;
}

.price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  margin-bottom: 12px;
}

.product-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0066cc;
}

.badge-shipping {
  font-size: 0.7rem;
  background: #e6f4ea;
  color: #137333;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.detail-btn {
  display: block;
  text-align: center;
  background: #0066cc;
  color: white;
  text-decoration: none;
  padding: 8px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: background 0.2s;
}

.detail-btn:hover {
  background: #004b99;
}
</style>