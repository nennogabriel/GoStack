import { EntityRepository, Repository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IApointmentsRepository from '@modules/appointments/repositories/IApointmentsRepository';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>
  implements IApointmentsRepository {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({ where: { date } });
    return findAppointment;
  }
}

export default AppointmentsRepository;
