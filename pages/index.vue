<template>
  <main>
    <!-- Section principale avec image visible -->
    <section class="relative bg-transparent ">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block text-white drop-shadow-lg">La marketplace des</span>
            <span class="block text-primary-500 drop-shadow-lg">produits agricoles</span>
          </h1>
          <p class="mt-4 max-w-md mx-auto text-base text-gray-200 sm:text-lg md:mt-6 md:text-xl md:max-w-3xl">
            Connectez-vous directement avec les producteurs locaux et achetez des produits frais
            en toute simplicité.
          </p>
          <div class="mt-8 max-w-md mx-auto sm:flex sm:justify-center">
            <div class="rounded-md shadow">
              <NuxtLink
                to="/explorer"
                class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
              >
                Explorer les produits
              </NuxtLink>
            </div>
            <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <NuxtLink
                to="/inscription"
                class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white bg-opacity-70 hover:bg-opacity-90 md:py-4 md:text-lg md:px-10"
              >
                S'inscrire
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section "Comment ça marche" -->
    <section class="relative bg-opacity-50 py-5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-white drop-shadow-lg">
            Comment ça marche
          </h2>
        </div>
        <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Card 1 -->
          <div class="bg-white bg-opacity-70 overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="text-center">
                <div class="flex items-center justify-center h-12 w-12 rounded-full bg-primary-500 text-white mx-auto">
                  1
                </div>
                <h3 class="mt-4 text-lg font-medium text-gray-900">Inscrivez-vous</h3>
                <p class="mt-2 text-base text-gray-500">
                  Créez votre compte en tant que producteur ou acheteur en quelques clics.
                </p>
              </div>
            </div>
          </div>
          <!-- Card 2 -->
          <div class="bg-white bg-opacity-70 overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="text-center">
                <div class="flex items-center justify-center h-12 w-12 rounded-full bg-primary-500 text-white mx-auto">
                  2
                </div>
                <h3 class="mt-4 text-lg font-medium text-gray-900">Publiez ou explorez</h3>
                <p class="mt-2 text-base text-gray-500">
                  Publiez vos produits ou parcourez les annonces disponibles.
                </p>
              </div>
            </div>
          </div>
          <!-- Card 3 -->
          <div class="bg-white bg-opacity-70 overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="text-center">
                <div class="flex items-center justify-center h-12 w-12 rounded-full bg-primary-500 text-white mx-auto">
                  3
                </div>
                <h3 class="mt-4 text-lg font-medium text-gray-900">Payez en toute sécurité</h3>
                <p class="mt-2 text-base text-gray-500">
                  Effectuez vos transactions via MTN MoMo ou Orange Money.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Rendre l'image d'arrière-plan visible partout */
main {
  background-image: url('/bg.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

section {
  position: relative;
  z-index: 1;
}
</style>
