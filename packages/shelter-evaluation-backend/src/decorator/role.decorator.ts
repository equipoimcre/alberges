import { SetMetadata } from '@nestjs/common';

export const Roles = (...roleS: string[]) => SetMetadata('roles', roleS);