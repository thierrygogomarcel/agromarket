<template>
  <footer class="bg-white mt-auto w-full">
    <div class="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
            À propos
          </h3>
          <p class="mt-4 text-base text-gray-500">
            GoGoMarket connecte les producteurs agricoles aux acheteurs pour faciliter
            la vente de produits agricoles.
          </p>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
            Support
          </h3>
          <ul class="mt-4 space-y-4">
            <li>
              <NuxtLink to="/faq" class="text-base text-gray-500 hover:text-gray-900">
                FAQ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-base text-gray-500 hover:text-gray-900">
                Contact
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
            Légal
          </h3>
          <ul class="mt-4 space-y-4">
            <li>
              <NuxtLink to="/confidentialite" class="text-base text-gray-500 hover:text-gray-900">
                Politique de confidentialité
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/conditions" class="text-base text-gray-500 hover:text-gray-900">
                Conditions d'utilisation
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-8 border-t border-gray-200 pt-8">
        <p class="text-base text-gray-400 text-center">
          &copy; {{ new Date().getFullYear() }} GogoMarket 2.0. Tous droits réservés. Développeur : Thierry gogo 0758966156
        </p>
      </div>
    </div>
  </footer>
</template>