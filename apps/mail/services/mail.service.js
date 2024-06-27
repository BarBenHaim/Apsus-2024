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
    createdAt: 1551133930500,
    subject: sub,
    body: body,
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
        createdAt: 1551133930500,
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'yuval@gmail.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e102',
        createdAt: 1551133930500,
        subject: 'Udemy',
        body: 'Lets start learning and getting to know the programming language',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'guy@gmail.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e108',
        createdAt: 1551133930500,
        subject: 'Udemy',
        body: 'Lets start learning and getting to know the programming language',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'shani@gmail.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e103',
        createdAt: 1551133930500,
        subject: 'Test',
        body: 'Lets start learning and getting to know the programming language',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'ruti@gmail.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e104',
        createdAt: 1551133930500,
        subject: 'Work',
        body: 'Lets start learning and getting to know the programming language',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'tal@gmail.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e105',
        createdAt: 1551133930500,
        subject: 'weekend',
        body: 'Lets start learning and getting to know the programming language',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'linoy@gmail.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e106',
        createdAt: 1551133930500,
        subject: ' Hotel',
        body: 'Lets start learning and getting to know the programming language',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'moshe@gmail.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e107',
        createdAt: 1551133930500,
        subject: 'Alljob',
        body: 'Lets start learning and getting to know the programming language',
        isRead: false,
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
