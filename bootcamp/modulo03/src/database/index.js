import Sequelize from 'sequelize'; // sequelize para conexão e manipulação do db
import User from '../app/models/User'; // classe do usuario
import File from '../app/models/File'; // classe do usuario
import databaseConfig from '../config/database'; // configuração do db

const models = [User, File]; // array para inicialização de models

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
