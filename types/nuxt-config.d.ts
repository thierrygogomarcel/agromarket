declare module '@nuxt/schema' {
  interface RuntimeConfig {
    jwtSecret: string
    jwtExpiresIn?: string
    mongodbUri?: string
  }
}

export {}
