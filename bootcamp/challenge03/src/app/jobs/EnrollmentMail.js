import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class EnrollmentMail {
  get key() {
    return 'EnrollmenteMail';
  }

  async handle({ data }) {
    const { student, plan, enrollment } = data;
    await Mail.sendMail({
      to: `${student.name} <${student.email}`,
      subject: 'Matricula Concluída',
      template: 'enrollment',
      context: {
        student: student.name,
        plan: plan.title,
        duration: plan.duration,
        price: plan.price,
        start_date: format(
          parseISO(enrollment.start_date),
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
