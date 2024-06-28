import { storageService } from '../../../services/async-storage.service.js'
import { localStorageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'
let gMails = _createMails()

export const mailService = {
  query,
  remove,
  get,
  createNewMail,
  getDefaultFilter,
  getRelativeTime,
  save,
}
function query(filterBy = {}) {
  return storageService.query(MAIL_KEY).then((mails) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      mails = mails.filter((mail) => regExp.test(mail.from))
    }
    return mails
  })
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId).then()
}

function getDefaultFilter() {
  return { txt: '' }
}

function save(mails) {
  localStorageService.saveToStorage(MAIL_KEY, mails)
}
function createNewMail(to, sub, body) {
  let mails = localStorageService.loadFromStorage(MAIL_KEY)
  let newMail = {
    id: utilService.makeId(),
    createdAt: new Date().toISOString(),
    subject: sub,
    body: body,
    isStarred: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'fakironir@gmail.com',
    to: to,
  }
  mails.push(newMail)
  localStorageService.saveToStorage(MAIL_KEY, mails)
  return Promise.resolve(mails)
}
function _createMails() {
  let mails = localStorageService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = [
      {
        id: 'e101',
        createdAt: '2024-06-27T12:00:00Z',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'fakironir@gmail.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e102',
        createdAt: '2024-06-24T12:00:00Z',
        subject: 'Udemy',
        body: 'Lets start learning and getting to know the programming language',
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'guy@gmail.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e108',
        createdAt: '2024-06-23T12:00:00Z',
        subject: 'Udemy',
        body: 'Lets start learning and getting to know the programming language',
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'shani@gmail.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e103',
        createdAt: '2024-06-23T12:00:00Z',
        subject: 'Test',
        body: 'Lets start learning and getting to know the programming language',
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'ruti@gmail.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e104',
        createdAt: '2024-06-22T12:00:00Z',
        subject: 'Work',
        body: 'Lets start learning and getting to know the programming language',
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'tal@gmail.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e105',
        createdAt: '2024-06-21T12:00:00Z',
        subject: 'weekend',
        body: 'Lets start learning and getting to know the programming language',
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'linoy@gmail.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e106',
        createdAt: '2024-06-21T12:00:00Z',
        subject: ' Hotel',
        body: 'Lets start learning and getting to know the programming language',
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'moshe@gmail.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e107',
        createdAt: '2024-06-20T12:00:00Z',
        subject: 'Alljob',
        body: 'Lets start learning and getting to know the programming language',
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'ram@gmail.com',
        to: 'user@appsus.com',
      },
    ]
    localStorageService.saveToStorage(MAIL_KEY, mails)
  }
  return mails
}

function getRelativeTime(date) {
  const now = new Date()
  const diff = now - new Date(date) // Difference in milliseconds

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 5) {
    const dateObj = new Date(date)
    const day = dateObj.getDate().toString().padStart(2, '0')
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
    const year = dateObj.getFullYear()
    return `${day}/${month}/${year}`
  }

  if (days < 1) {
    const dateObj = new Date(date)
    const hours = dateObj.getHours().toString().padStart(2, '0')
    const minutes = dateObj.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  if (seconds < 60) return `${seconds} seconds ago`
  if (minutes < 60) return `${minutes} minutes ago`
  if (hours < 24) return `${hours} hours ago`
  return `${days} days ago`
}
// const loggedinUser = {
//   email: 'user@appsus.com',
//   fullname: 'Mahatma Appsus',
// }
