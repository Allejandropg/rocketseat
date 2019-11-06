import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
// Crie uma rota para a academia listar todos pedidos de auxílio sem resposta;
class HelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const student_id = req.studentID;

    const enrollments = await HelpOrder.findAll({
      where: { student_id },
      attributes: ['id', 'student_id', 'question', 'answer', 'answer_at'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email', 'age'],
        },
      ],
    });
    return res.json(enrollments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.strtring().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate fails' });
    }
    const { question } = req.body;
    const student_id = req.studentID;
    const helpOrder = await HelpOrder.create({ student_id, question });
    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
