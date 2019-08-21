import Vue from 'vue'

import * as filters from '@/filters'

Object.keys(filters).forEach((filter) => {
  Vue.filter(filter, filters[filter])
})
