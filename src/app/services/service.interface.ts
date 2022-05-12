export interface IAuth {
  username: string,
  pinOTP: string
}

export interface ISuggPost {
  title: string,
  description: string
}

export interface ISuggest {
  id: number,
  title: string,
  description: string,
  status: string,
  comment: string,
  dateLogged: string,
  dateTreated: string
}
