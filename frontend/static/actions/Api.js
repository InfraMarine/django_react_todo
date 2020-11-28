import Cookies from "js-cookie"

// base url without trailing slash 
const base="/api"

export const loginAPI = (data) => {
  return(
    fetch(`${base}/accounts/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
  )
}

export const registerAPI = (data) => {
  return(
    fetch(`${base}/accounts/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
  )
}

export const logoutAPI = () => {
  return(
    fetch(`${base}/accounts/logout/`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    }).then(response => response.json())
  )
}

export const getAllAPI = (target) => {
  return(
    fetch(`${base}/${target}/`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    }).then(response => response.json())
  )
}

export const createAPI = (target, data) => {
  return(
    fetch(`${base}/${target}/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
  )
}

export const updateAPI = (target, id, data) => {
  return(
    fetch(`${base}/${target}/${id}/`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
  )
}

export const removeAPI = (target, id) => {
  return(
    fetch(`${base}/${target}/${id}/`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    })
  )
}