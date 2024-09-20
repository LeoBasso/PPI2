import { inject, injectable } from "tsyringe";
import { ISchedulesRepository } from "../domain/interfaces/ISchedulesRepository";
import { BadRequestError } from "src/shared/errors/BadRequestError";

@injectable()
export class DeleteScheduleService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository) { }

  public async execute(id: number): Promise<void> {
    const schedule = await this.schedulesRepository.findById(id);

    if (!schedule) {
      throw new BadRequestError('Schedule not founded')
    }

    await this.schedulesRepository.remove(schedule);
  }
}
