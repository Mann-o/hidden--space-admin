import createRepository from '@/api/repository'
import createAuthEndpoints from '@/api/auth'

export default ({ $auth, $axios }, inject) => {
  const repository = createRepository($axios)
  const auth = createAuthEndpoints($auth)

  const crudEndpoints = [
    'media',
    'posts',
    'spaces',
    'therapists',
    'users',
  ]

  inject('api', {
    auth,
    ...crudEndpoints.reduce((acc, curr) => {
      acc[curr] = repository(curr)
      return acc
    }, {}),
  })
}
