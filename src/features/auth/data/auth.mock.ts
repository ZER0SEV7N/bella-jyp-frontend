import type {
  LoginDTO,
  SolicitudRecuperacionDTO,
} from "@jyp/shared-contracts";

export const documentTypes = [
  "DNI",
  "CE",
  "PASAPORTE",
  "PTP",
] as const satisfies readonly LoginDTO["tipo_documento"][];

export const signInDefaultValues: LoginDTO = {
  tipo_documento: "DNI",
  nro_documento: "",
  password: "",
};

export const forgotPasswordDefaultValues: SolicitudRecuperacionDTO = {
  nro_documento: "",
};
