import axios from 'axios'
const baseUrl = '/api/users'

const users = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const exportedRequests = { users }

export default exportedRequests
