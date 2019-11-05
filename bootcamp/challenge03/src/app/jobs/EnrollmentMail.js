import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class EnrollmentMail {
  get key() {
    return 'EnrollmenteMail';
  }

  async handle({ data }) {
    const { student, helpOrder } = data;
    await Mail.sendMail({
      to: `${student.name} <${student.email}`,
      subject: 'Matricula Concluída',
      template: 'enrollment',
      context: {
        student: student.name,
        helpOrder: helpOrder.question,
        answer: helpOrder.answer,
        answer_at: format(
          parseISO(helpOrder.answer_at),
          "'dia' dd 'de' MMMM'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new EnrollmentMail();
