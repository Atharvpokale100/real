const STORAGE_KEY = 'admission_applications'

export const saveApplication = (data) => {
  const applications = getAllApplications()
  applications.push(data)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
}

export const getAllApplications = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export const getApplication = (id, email) => {
  const applications = getAllApplications()
  return applications.find(app => 
    app.id === id && app.email.toLowerCase() === email.toLowerCase()
  )
}

export const updateApplicationStatus = (id, status) => {
  const applications = getAllApplications()
  const index = applications.findIndex(app => app.id === id)
  if (index !== -1) {
    applications[index].status = status
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
    return true
  }
  return false
}