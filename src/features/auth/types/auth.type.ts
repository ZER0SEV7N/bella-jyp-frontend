export const documentTypes = ["DNI", "Pasaporte", "Carnet de extranjeria"] as const;

export type DocumentType = (typeof documentTypes)[number];

export type SignInCredentials = {
  documentType: DocumentType;
  documentNumber: string;
  password: string;
};
