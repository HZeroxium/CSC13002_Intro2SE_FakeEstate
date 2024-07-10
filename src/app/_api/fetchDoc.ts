// #include from "./FakeEstate/node_modules/..."
import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

// #include from "./FakeEstate/src/..."
import type { Config } from '../../payload/payload-types'
import { ORDER } from '../../app/_graphql/orders'
import { PAGE } from '../../app/_graphql/pages'
import { PRODUCT } from '../../app/_graphql/products'
import { GRAPHQL_API_URL } from '../../app/_api/shared'
import { payloadToken } from '../../app/_api/token'

const queryMap = {
  pages: {
    query: PAGE,
    key: 'Pages',
  },
  products: {
    query: PRODUCT,
    key: 'Products',
  },
  orders: {
    query: ORDER,
    key: 'Orders',
  },
}

export const fetchDoc = async <T>(args: {
  collection: keyof Config['collections']
  slug?: string
  id?: string
  draft?: boolean
}): Promise<T> => {
  const { collection, slug, draft } = args || {}

  if (!queryMap[collection]) throw new Error(`Collection ${collection} not found`)

  let token: RequestCookie | undefined

  if (draft) {
    const { cookies } = await import('next/headers')
    token = cookies().get(payloadToken)
  }

  const doc: T = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token?.value && draft ? { Authorization: `JWT ${token.value}` } : {}),
    },
    cache: 'no-store',
    next: { tags: [`${collection}_${slug}`] },
    body: JSON.stringify({
      query: queryMap[collection].query,
      variables: {
        slug,
        draft,
      },
    }),
  })
    ?.then(res => res.json())
    ?.then(res => {
      if (res.errors) throw new Error(res?.errors?.[0]?.message ?? 'Error fetching doc')
      return res?.data?.[queryMap[collection].key]?.docs?.[0]
    })

  return doc
}
