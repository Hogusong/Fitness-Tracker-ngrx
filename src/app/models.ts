export interface User {
  id?: string,
  username: string,
  email: string,
}

export interface Exercise {
  id?: string,
  name: string,
  duration: number,
  calories: number,
  date?: string,
  state?: 'completed' | 'cancelled' | null,
  userID?: string
}
