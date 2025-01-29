export type LoginCredentialType = {
  matricule: string;
  password: string;
}

export type AlertType = {
  type : "success"|"error"|"warning"|"info",
  message : string,
  time? : number
}
