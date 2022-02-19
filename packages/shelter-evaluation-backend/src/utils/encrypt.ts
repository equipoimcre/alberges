import { hashSync, compare } from 'bcrypt';

export class Encrypt {
  hash(password: string) {
    return hashSync(password, 10);
  }

  compare(password: string, hash: string) {
    return compare(password, hash);
  }
}
