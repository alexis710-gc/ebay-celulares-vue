<script setup>
import { ref } from 'vue'

const busquedaGlobal = ref('')
const categoriaSeleccionada = ref('celulares')
</script>

<template>
  <header class="navbar">
    <div class="navbar-container">
      <!-- Logo / Marca -->
      <router-link to="/" class="brand-logo">
        <span class="logo-e">e</span>
        <span class="logo-b">b</span>
        <span class="logo-a">a</span>
        <span class="logo-y">y</span>
        <span class="brand-sub">Celulares</span>
      </router-link>

      <!-- Barra de Búsqueda Principal -->
      <div class="search-bar">
        <select v-model="categoriaSeleccionada" class="category-select">
          <option value="celulares">Celulares</option>
          <option value="accesorios">Accesorios</option>
          <option value="repuestos">Repuestos</option>
        </select>
        <input 
          type="text" 
          v-model="busquedaGlobal" 
          placeholder="Buscar cualquier marca, modelo o especificación..." 
          class="search-input"
        />
        <button class="search-btn">
          Buscar
        </button>
      </div>

      <!-- Iconos y Accesos Rápidos -->
      <nav class="navbar-actions">
        <button class="action-btn">
          <span class="icon">❤️</span>
          <span class="text">Favoritos</span>
        </button>
        <button class="action-btn cart-btn">
          <span class="icon">🛒</span>
          <span class="badge">3</span>
          <span class="text">Carrito</span>
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 12px 24px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

/* Estilos del Logo estilo eBay */
.brand-logo {
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: 800;
  display: flex;
  align-items: baseline;
  letter-spacing: -1px;
}

.logo-e { color: #e53238; }
.logo-b { color: #0064d2; }
.logo-a { color: #f5af02; }
.logo-y { color: #86b817; }

.brand-sub {
  font-size: 0.85rem;
  color: #4b5563;
  margin-left: 6px;
  font-weight: 500;
  letter-spacing: normal;
}

/* Barra de búsqueda */
.search-bar {
  display: flex;
  flex: 1;
  max-width: 650px;
  border: 2px solid #111827;
  border-radius: 24px;
  overflow: hidden;
  background: #ffffff;
}

.category-select {
  border: none;
  background: #f3f4f6;
  padding: 0 14px;
  font-size: 0.85rem;
  color: #374151;
  outline: none;
  border-right: 1px solid #d1d5db;
  cursor: pointer;
}

.search-input {
  flex: 1;
  border: none;
  padding: 8px 16px;
  font-size: 0.9rem;
  outline: none;
}

.search-btn {
  background-color: #0064d2;
  color: white;
  border: none;
  padding: 0 24px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-btn:hover {
  background-color: #004b99;
}

/* Acciones */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.action-btn {
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: #4b5563;
  font-size: 0.75rem;
  position: relative;
}

.action-btn .icon {
  font-size: 1.2rem;
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #e53238;
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  border-radius: 50%;
  padding: 2px 6px;
}
</style>