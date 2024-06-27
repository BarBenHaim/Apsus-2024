import { storageService } from '../../../services/async-storage.service.js'
import { localStorageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'
let gMails = _createMails()
// console.log(gMails)

export const mailService = {
  query,
  remove,
  get,
  createNewMail,
}
function query() {
  return storageService.query(MAIL_KEY).then()
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId).then()
}

function createNewMail(to, sub, body) {
  let mails = localStorageService.loadFromStorage(MAIL_KEY)
  let newMail = {
    id: utilService.makeId(),
    createdAt: '2024-06-27T12:00:00Z',
    subject: sub,
    body: body,
    isStar: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'fakironir@gmail.com',
    to: to,
  }
  mails.push(newMail)
  localStorageService.saveToStorage(MAIL_KEY, mails)
  return mails
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
        isStar: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'yuval@gmail.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e102',
        createdAt: '2024-06-24T12:00:00Z',
        subject: 'Udemy',
        body: 'Lets start learning and getting to know the programming language',
        isRead: false,
        isStar: false,
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
        isStar: false,
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
        isStar: false,
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
        isStar: false,
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
        isStar: false,
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
        isStar: false,
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
        isStar: false,
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
// const loggedinUser = {
//   email: 'user@appsus.com',
//   fullname: 'Mahatma Appsus',
// }
