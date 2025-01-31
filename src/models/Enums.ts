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
