import '@testing-library/jest-dom';
import {cleanup } from '@testing-library/react';
import { afterEach } from "vitest";

// Limpieza automatica del DOM despues de cada prueba para evitar fugas de memoria
afterEach(() => {
    cleanup();
});