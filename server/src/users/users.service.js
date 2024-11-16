import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema.js';

@Injectable()
export class UsersService {
  async findByEmail(email) {
    return User.findOne({ email });
  }

  async createUser(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    return newUser.save();
  }
}
