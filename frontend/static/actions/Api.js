import Cookies from "js-cookie"

const headers = {
  'Content-Type': 'application/json',
  'X-CSRFToken': Cookies.get('csrftoken'),
}

// base url without trailing slash 
const base="/api"

export const loginAPI = (data) => {
  return(
    fetch(`${base}/accounts/login/`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    }).then(response => response.json())
  )
}

export const registerAPI = (data) => {
  return(
    fetch(`${base}/accounts/register/`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    }).then(response => response.json())
  )
}

export const logoutAPI = () => {
  return(
    fetch(`${base}/accounts/logout/`, {
      method: 'GET',
      headers: headers,
    }).then(response => response.json())
  )
}

export const getAllAPI = (target) => {
  return(
    fetch(`${base}/${target}/`, {
      method: 'GET',
      headers: headers,
    }).then(response => response.json())
  )
}

export const createAPI = (target, data) => {
  return(
    fetch(`${base}/${target}/`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    }).then(response => response.json())
  )
}

export const updateAPI = (target, id, data) => {
  return(
    fetch(`${base}/${target}/${id}/`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(data),
    }).then(response => response.json())
  )
}

export const removeAPI = (target, id) => {
  return(
    fetch(`${base}/${target}/${id}/`, {
      method: 'DELETE',
      headers: headers,
    })
  )
}