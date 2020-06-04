import Student from '../models/Student';

export default async (req, res, next) => {
  const { id } = req.params;
  const studenteExists = await Student.findByPk(id);
  if (!studenteExists) {
    return res.status(400).json({ error: 'Studente not found.' });
  }
  req.studentID = id;
  return next();
};
