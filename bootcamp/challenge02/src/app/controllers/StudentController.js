import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(1),
      email: Yup.string()
        .email()
        .required(2),
      age: Yup.number()
        .integer()
        .required(3),
      weight: Yup.number().required(4),
      height: Yup.number().required(5),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { email } = req.body;
    const studentExists = await Student.findOne({ where: { email } });
    if (studentExists) {
      return res.status(401).json({ error: 'Student already exists.' });
    }

    const { name, age, weight, height } = await Student.create(req.body);
    return res.json({ name, email, age, weight, height });
  }

  async update(req, res) {
    const { id } = req.params;
    const student = await Student.findByPk(id); // Add validation exixts user

    if (!student) {
      res.status(401).json({ erro: 'User not found.' });
    }
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number().integer(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }
    const emailNew = req.body.email;
    if (emailNew && emailNew !== student.email) {
      const studentExists = await Student.findOne({
        where: { email: emailNew },
      });
      if (studentExists) {
        return res.status(401).json({ error: 'Student already exists.' });
      }
    }
    const { name, email, age, weight, height } = await student.update(req.body);

    return res.json({ name, email, age, weight, height });
  }

  async read(req, res) {
    const students = await Student.findAll();
    return res.json(students);
  }
}
export default new StudentController();
