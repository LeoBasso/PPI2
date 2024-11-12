import { dataSource } from './dataSource';
import { UsersRepository } from 'src/modules/user/typeorm/repositories/UsersRepository';
import { RoleTypes } from 'src/modules/user/domain/enums/RoleTypes.enum';
import bcrypt from 'bcryptjs';

async function seed() {
  try {
    await dataSource.initialize();

    console.log('Iniciando a seed de usuários...');

    const userRepository = new UsersRepository();
    const existingUsers = await userRepository.findAll();

    if (existingUsers.length > 0) {
      console.log('Usuários já existem no banco de dados!');
      return;
    }

    const password = '12345678';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userRepository.create({
      name: 'Admin',
      email: 'admin@admin.com',
      number: '00000000000',
      password: hashedPassword,
      role: RoleTypes.ADMIN,
    });

    console.log('Usuário admin criado com sucesso!', newUser);
  } catch (error) {
    console.error('Erro ao criar seed de usuários:', error);
  } finally {
    await dataSource.destroy();
  }
}
seed();
