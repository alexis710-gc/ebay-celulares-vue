<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

// 1. Accedemos a la información de la ruta activa
const route = useRoute()
const phoneId = route.params.id // Captura el :id enviado en la URL

// 2. Datos de los celulares (mismos datos para simular la búsqueda)
const celulares = ref([
  { id: 1, nombre: 'Nokia 2.3', marca: 'Nokia', sistema: 'Android', precio: 75.00, pantalla: '5.0"', ram: '2GB', almacenamiento: '32GB', color: 'Verde', imagen: 'https://via.placeholder.com/300x200?text=Nokia+2.3' },
  { id: 2, nombre: 'Huawei Y6', marca: 'Huawei', sistema: 'Android', precio: 90.00, pantalla: '6.0"', ram: '2GB', almacenamiento: '32GB', color: 'Azul', imagen: 'https://via.placeholder.com/300x200?text=Huawei+Y6' },
  { id: 3, nombre: 'Xiaomi Redmi', marca: 'Xiaomi', sistema: 'Android', precio: 110.00, pantalla: '5.5"', ram: '3GB', almacenamiento: '64GB', color: 'Gris', imagen: 'https://via.placeholder.com/300x200?text=Xiaomi+Redmi' },
  { id: 4, nombre: 'Samsung J6', marca: 'Samsung', sistema: 'Android', precio: 132.00, pantalla: '5.5"', ram: '2GB', almacenamiento: '64GB', color: 'Negro', imagen: 'https://via.placeholder.com/300x200?text=Samsung+J6' }
])

// 3. Buscamos el celular cuyo ID coincida con el de la URL
const celular = computed(() => {
  return celulares.value.find(item => item.id === Number(phoneId))
})
</script>

<template>
  <div class="detail-container">
    <router-link to="/" class="back-link">← Volver al catálogo</router-link>

    <div v-if="celular" class="detail-card">
      <img :src="celular.imagen" :alt="celular.nombre" class="detail-img" />
      <div class="detail-info">
        <h1>{{ celular.nombre }}</h1>
        <p class="price">${{ celular.precio.toFixed(2) }}</p>
        
        <ul class="specs">
          <li><strong>Marca:</strong> {{ celular.marca }}</li>
          <li><strong>Sistema Operativo:</strong> {{ celular.sistema }}</li>
          <li><strong>Tamaño de Pantalla:</strong> {{ celular.pantalla }}</li>
          <li><strong>Memoria RAM:</strong> {{ celular.ram }}</li>
          <li><strong>Almacenamiento:</strong> {{ celular.almacenamiento }}</li>
          <li><strong>Color:</strong> {{ celular.color }}</li>
        </ul>
      </div>
    </div>

    <div v-else class="not-found">
      <h2>⚠️ Celular no encontrado</h2>
      <p>El producto solicitado con ID {{ phoneId }} no existe.</p>
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: sans-serif;
}

.back-link {
  display: inline-block;
  margin-bottom: 20px;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.detail-card {
  display: flex;
  gap: 30px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.detail-img {
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
}

.price {
  font-size: 1.5rem;
  color: #28a745;
  font-weight: bold;
  margin: 10px 0;
}

.specs {
  list-style: none;
  padding: 0;
}

.specs li {
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.not-found {
  text-align: center;
  padding: 40px;
}
</style>