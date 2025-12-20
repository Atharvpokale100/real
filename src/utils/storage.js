// Utility functions for localStorage management

export const generateAppId = () => {
  return 'APP' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 5).toUpperCase()
}

export const saveApplication = (application) => {
  const applications = getApplications()
  applications.push(application)
  localStorage.setItem('applications', JSON.stringify(applications))
  return application
}

export const getApplications = () => {
  const stored = localStorage.getItem('applications')
  return stored ? JSON.parse(stored) : []
}

export const getApplication = (appId, email) => {
  const applications = getApplications()
  return applications.find(
    (app) => app.id.toUpperCase() === appId.toUpperCase() && app.email.toLowerCase() === email.toLowerCase()
  )
}

export const updateApplicationStatus = (appId, newStatus) => {
  const applications = getApplications()
  const index = applications.findIndex((app) => app.id === appId)
  if (index !== -1) {
    applications[index].status = newStatus
    applications[index].dateUpdated = new Date().toISOString()
    localStorage.setItem('applications', JSON.stringify(applications))
    return applications[index]
  }
  return null
}

export const filterApplications = (applications, searchTerm, statusFilter, courseFilter) => {
  return applications.filter((app) => {
    const matchesSearch =
      !searchTerm ||
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toUpperCase().includes(searchTerm.toUpperCase())

    const matchesStatus = !statusFilter || app.status === statusFilter
    const matchesCourse = !courseFilter || app.course === courseFilter

    return matchesSearch && matchesStatus && matchesCourse
  })
}

export const deleteApplication = (appId) => {
  const applications = getApplications()
  const filtered = applications.filter((app) => app.id !== appId)
  localStorage.setItem('applications', JSON.stringify(filtered))
  return filtered
}

