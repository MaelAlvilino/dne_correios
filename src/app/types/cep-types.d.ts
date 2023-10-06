export interface Logr {
  publicArea: string;
  neighborhoodName: string;
  prefix: string;
  postalCode: string;
}

export interface cepReturn {
  neighborhood: { neighborhoodName: string | null };
  publicArea: {
    municipality: {
      codMun: string | undefined | null;
      municipalityName: string | undefined | null;
    } | null;
    state: string | null;
    streetName: string | null;
    postalCode: string | null;
  } | null;
  prefix: string | null;
  abbreviatedStreet: string | null;
}


export interface publicArea {
   BAI_NU_INI: number | null;
   CEP: string | null;
   UFE_SG: string | null;
   LOG_NO: string | null;
   TLO_TX: string | null;
   LOG_NO_ABREV: string | null;
   LOG_LOCALIDADE: {
     MUN_NU: string | null;
      LOC_NO: string | null;
  } | null; 
}
export interface Neighborhood {
  BAI_NO: string | null;
}