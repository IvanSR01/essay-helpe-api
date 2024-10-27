declare type JWTTokenPayload = {
	exp?: any
	username: string
	sub: number
}

declare type MessageResponse = {
	ENG: string
	RUS: string
}

declare type SocketPayload = { content: string; chatId: number; userId: number }
