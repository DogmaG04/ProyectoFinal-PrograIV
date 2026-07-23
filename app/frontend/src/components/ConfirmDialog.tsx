import Modal from './Modal'

interface ConfirmDialogProps {
  abierto: boolean
  titulo: string
  mensaje: string
  onConfirmar: () => void
  onCancelar: () => void
}

export default function ConfirmDialog({ abierto, titulo, mensaje, onConfirmar, onCancelar }: ConfirmDialogProps) {
  if (!abierto) return null

  return (
    <Modal abierto={abierto} titulo={titulo} onClose={onCancelar}>
      <p className="text-sm text-subtext mb-6">{mensaje}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancelar}
          className="px-4 py-2.5 rounded-xl text-sm font-medium bg-surface-hover border border-border text-subtext hover:text-text transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirmar}
          className="px-4 py-2.5 rounded-xl text-sm font-medium bg-danger text-white hover:opacity-90 transition-opacity"
        >
          Eliminar
        </button>
      </div>
    </Modal>
  )
}
