// #include from "./FakeEstate/node_modules/..."
import type { FieldHook } from 'payload/types'

// #include from "./FakeEstate/src/payload/..."
import type { Order } from '../../../payload-types'

export const populateOrderedBy: FieldHook<Order> = async ({ req, operation, value }) => {
  if ((operation === 'create' || operation === 'update') && !value) {
    return req.user.id
  }

  return value
}
