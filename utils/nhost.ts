import { NhostClient } from "@nhost/nhost-js";

export const nhost = new NhostClient({
  //subdomain: import.meta.env.NUXT_PUBLIC_NHOST_SUBDOMAIN,
  //region: import.meta.env.NUXT_PUBLIC_NHOST_REGION,
  subdomain: import.meta.env.NUXT_PUBLIC_NHOST_SUBDOMAIN,
  region: import.meta.env.NUXT_PUBLIC_NHOST_REGION,
});
