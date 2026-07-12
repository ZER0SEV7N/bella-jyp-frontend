import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PendingActionList from '../pending-action-list'; 

// Mock de la Server Action o función asíncrona de mutación
const mockAprobarIncidencia = vi.fn();

describe('PendingActionList Component (CU-19)', () => {
  
  const mockIncidencias = [
    { id: '1', empleado: 'Juan Pérez', tipo: 'Horas Extras', estado: 'pendiente' },
  ];

  it('Debe ejecutar la UI Optimista y confirmar el estado al resolver el servidor', async () => {
    // 1. ARRANGE (Preparar)
    mockAprobarIncidencia.mockResolvedValueOnce({ success: true });
    render(
      <PendingActionList 
        initialData={mockIncidencias} 
        onApprove={mockAprobarIncidencia} 
      />
    );

    const botonAprobar = screen.getByRole('button', { name: /aprobar/i });
    expect(screen.getByText('Estado: pendiente')).toBeInTheDocument();

    // 2. ACT (Actuar)
    fireEvent.click(botonAprobar);

    // 3. ASSERT (Afirmar) - Interfaz Optimista INMEDIATA (Zero-Latency)
    expect(screen.getByText('Estado: aprobado')).toBeInTheDocument();
    
    // Verificamos que la comunicación de red ocurrió en background
    expect(mockAprobarIncidencia).toHaveBeenCalledWith('1');

    // Afirmamos que el estado se mantiene tras la resolución del servidor
    await waitFor(() => {
      expect(screen.getByText('Estado: aprobado')).toBeInTheDocument();
    });
  });

  it('Debe hacer rollback (revertir UI) si el servidor falla (RFC 7807)', async () => {
    // 1. ARRANGE (Preparar)
    // Simulamos un rechazo del servidor (ej. Problema de concurrencia)
    mockAprobarIncidencia.mockRejectedValueOnce(new Error('Conflicto transaccional'));
    
    render(
      <PendingActionList 
        initialData={mockIncidencias} 
        onApprove={mockAprobarIncidencia} 
      />
    );

    const botonAprobar = screen.getByRole('button', { name: /aprobar/i });

    // 2. ACT (Actuar)
    fireEvent.click(botonAprobar);

    // 3. ASSERT (Afirmar)
    // Estado optimista inicial temporal
    expect(screen.getByText('Estado: aprobado')).toBeInTheDocument();

    // Esperamos la falla y verificamos el ROLLBACK automático
    await waitFor(() => {
      expect(screen.getByText('Estado: pendiente')).toBeInTheDocument();
    });
    
    // Aquí también podríamos validar que un Toast de error fue llamado.
  });
});