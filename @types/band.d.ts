export default interface IBand {
  id: mongoose.Types.ObjectId
  name: string
  formedAt?: string
  country?: string;
  city?: string;
  image?: any
  soloArtist?: boolean
  info?: string
}
