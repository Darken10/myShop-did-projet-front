import {CommandeStatutEnum, UniteProduitEnum} from "../models/Enums";

export const UniteProduitEnumValues = [
  UniteProduitEnum.KG,
  UniteProduitEnum.LITRE,
  UniteProduitEnum.PAQUET,
  UniteProduitEnum.SAC,
  UniteProduitEnum.UNITE ,
]

export const StatutCommandeEnumValues = [
  CommandeStatutEnum.NEW,
  CommandeStatutEnum.CANCELED,
  CommandeStatutEnum.PROCESSED,
  CommandeStatutEnum.SHIPPED,
  CommandeStatutEnum.DELIVERED,

]

