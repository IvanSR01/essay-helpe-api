import { UseGuards, applyDecorators } from '@nestjs/common'
import { JwtAuthGuard } from '../guard/jwt-auth.guard'

export function Auth(authType?: 'JWT' | 'GITHUB' | 'GOOGLE') {
	const authMethods = {
		JWT: JwtAuthGuard,
	}

	return applyDecorators(
		authType ? UseGuards(authMethods[authType]) : UseGuards(JwtAuthGuard)
	)
}
