export enum Genre {
    MALE = "MALE",
    FEMALE = "FEMALE",

}
export enum UserStatusEnum{
  EN_ATTENTE = "EN_ATTENTE",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
  DELETE = "DELETE"
}

export enum UniteProduitEnum{
  KG = "KG",
  LITRE = "LITRE",
  PAQUET = "PAQUET",
  SAC = "SAC",
  UNITE = "UNITE"
}

export enum RavitaillementStatusEnum{
  NEW = "NEW",
  DELIVERED = "DELIVERED",
  PROCESSED = "PROCESSED",
  SHIPPED = "SHIPPED",
  CANCELED = "CANCELED",
}

export enum MethodePaiementEnum{
  CARTE = "CARTE",
  ESPECE = "ESPECE",
  MOBILE_MONEY = 'MOBILE_MONEY'
}

export enum StatusPaiementEnum {
  PAYER= "PAYER",
  EN_ATTENTE = "EN_ATTENTE",
  CANCELED = "CANCELED"
}

export enum CommandeStatutEnum{
  NEW = "NEW",              // Nouveau
  DELIVERED = "DELIVERED", // Livre
  PROCESSED = "PROCESSED", // Traite
  SHIPPED = "SHIPPED",     // Expédier
  CANCELED = "CANCELED",   // Annuler
}


export enum Role{
  Admin = "Admin",
  Caissier = "Caissier",
  Gestionnaire = "Gestionnaire"
}
