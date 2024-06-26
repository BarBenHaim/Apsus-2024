import { storageService } from '../../../services/async-storage.service.js'
import { localStorageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'
let gMails = _createMails()
// console.log(gMails)

export const mailService = {
  query,
  remove,
}
function query() {
  return storageService.query(MAIL_KEY).then()
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
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
        from: 'momo@momo.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e102',
        createdAt: 1551133930500,
        subject: 'Udemy',
        body: 'Let start',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
      },
    ]
    localStorageService.saveToStorage(MAIL_KEY, mails)
  }
  return mails
}
const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
}
