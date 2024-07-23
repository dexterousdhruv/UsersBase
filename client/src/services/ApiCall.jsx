import axios from 'axios'

export const commonRequest = async (method, url, body, header) => {
  const headers = header || { "Content-Type": "application/json" }
  
  let config = { method, url, headers, data: body }
  
  return axios(config)
    .then( data => data)
    .catch( e => e)
}