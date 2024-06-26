import { storageService } from '../../../services/async-storage.service'
import { utilService } from '../../../services/util.service'

const Mail_Key = 'mailDB'

export const MailService = {
  query,
  get,
  remove,
  save,
  add,
  getDefaultFilter,
}
