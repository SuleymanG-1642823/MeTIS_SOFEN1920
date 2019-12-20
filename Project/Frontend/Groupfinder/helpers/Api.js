import { API_PORT } from '~/helpers/Constants'

export default function (url) {
  return `http://` + window.location.hostname + API_PORT + url
}
