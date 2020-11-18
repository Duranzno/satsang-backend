export type IdParams = {
  id: string
}

export interface AttendanceParams extends IdParams {
  eventId: string
}

export interface UserLoginBody {
  email: string
  password: string
}
export interface UserSignupBody extends UserLoginBody {
  name: string
}