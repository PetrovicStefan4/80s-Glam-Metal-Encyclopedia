import { IAlbum } from './album'

export interface IArtist {
  firstName: string
  lastName: string
  nickName: string
  dateOfBirth: string
  dateOfDeath: string
  additionalInfo: any
  albums: IAlbum[]
}
