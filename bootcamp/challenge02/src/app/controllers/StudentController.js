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
    return res.json({ name, age, weight, height });
  }

  async update(req, res) {
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

    const { email } = req.body;
    const studentExists = await Student.findOne({ where: { email } });
    if (studentExists) {
      return res.status(401).json({ error: 'Student already exists.' });
    }

    const { name, age, weight, height } = await Student.create(req.body);
    return res.json({ name, age, weight, height });
  }
}
export default new StudentController();
