import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
// Crie uma rota para a academia listar todos pedidos de auxílio sem resposta;
class HelpOrderController {
  async index(req, res) {
    const { page = 1, order = ' desc' } = req.query;
    const student_id = req.studentID;

    const enrollments = await HelpOrder.findAll({
      where: { student_id },
      order: [`answer ${order}`],
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
    const { question } = req.query;
    const student_id = req.studentID;
    const helpOrder = await HelpOrder.create({ student_id, question });
    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
