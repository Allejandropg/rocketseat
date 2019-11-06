import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class EnrollmentMail {
  get key() {
    return 'HelpOrderMail';
  }

  async handle({ data }) {
    const { student, helpOrder } = data;
    await Mail.sendMail({
      to: `${student.name} <${student.email}`,
      subject: 'Sua dúvida foi respondida',
      template: 'helpOrder',
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
