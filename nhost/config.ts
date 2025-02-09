import { NhostClient } from '@nhost/nhost-js'

const nhost = new NhostClient({
  subdomain: process.env.NHOST_SUBDOMAIN || '',
  region: process.env.NHOST_REGION || 'eu-central-1',
})

export default nhost