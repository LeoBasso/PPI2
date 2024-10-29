import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateProfileService } from '../../services/UpdateProfileService';
import { UpdateProfileDTO } from '../../domain/dtos/UpdateProfile.dto';

export default class UpdateProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const showProfile = container.resolve(UpdateProfileService);
        const user_id = request.user.id;

        const user = await showProfile.execute(user_id);
        return response.json(user);
    }

    public async update(request: Request, response: Response): Promise<Response> {

        const user_id = request.user.id;
        const { name, email, number } = request.body;
        const updateProfileDTO: UpdateProfileDTO = {
            id: user_id,
            name,
            email,
            number
        };

        const updateProfile = container.resolve(UpdateProfileService);

        const user = await updateProfile.execute(
            updateProfileDTO
        );

        return response.json(user);
    }
}