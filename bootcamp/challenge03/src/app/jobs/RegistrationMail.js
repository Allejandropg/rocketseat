import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { student, plan, registration } = data;
    await Mail.sendMail({
      to: `${student.name} <${student.email}`,
      subject: 'Matricula Concluída',
      template: 'registration',
      context: {
        student: student.name,
        plan: plan.title,
        duration: plan.duration,
        price: plan.price,
        start_date: format(
          parseISO(registration.start_date),
          "'dia' dd 'de' MMMM'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new RegistrationMail();
