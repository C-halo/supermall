import { axios } from './request'

export function getHomeMutidata() {
  return axios({
    url: './home/multidata'
  })
}

export function getHomedata(type, page) {
  return axios({
    url: './home/data',
    params: {
      type,
      page
    }
  })
}