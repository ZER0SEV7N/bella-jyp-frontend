export const documentTypes = ['DNI', 'PAS', 'CE', 'PTP'] as const

export type DocumentType = (typeof documentTypes)[number]

export type SignInCredentials = {
  documentType: DocumentType
  documentNumber: string
  password: string
}
