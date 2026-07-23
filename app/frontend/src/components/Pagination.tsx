interface Props {
  paginaActual: number
  totalPaginas: number
  totalItems: number
  itemsPorPagina: number
  onCambioPagina: (pagina: number) => void
}

export default function Pagination({ paginaActual, totalPaginas, totalItems, itemsPorPagina, onCambioPagina }: Props) {
  if (totalPaginas <= 1) return null

  const desde = (paginaActual - 1) * itemsPorPagina + 1
  const hasta = Math.min(paginaActual * itemsPorPagina, totalItems)

  const paginas: (number | '...')[] = []
  for (let i = 1; i <= totalPaginas; i++) {
    if (i === 1 || i === totalPaginas || (i >= paginaActual - 1 && i <= paginaActual + 1)) {
      paginas.push(i)
    } else if (paginas[paginas.length - 1] !== '...') {
      paginas.push('...')
    }
  }

  return (
    <div className="flex items-center justify-between px-5 py-3.5 border-t border-border">
      <span className="text-xs text-tertiary">
        Mostrando {desde}–{hasta} de {totalItems}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onCambioPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="w-8 h-8 rounded-lg text-xs font-semibold bg-surface-hover text-subtext hover:text-primary hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          &#8249;
        </button>
        {paginas.map((p, i) =>
          p === '...' ? (
            <span key={`e${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-tertiary">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onCambioPagina(p)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                p === paginaActual
                  ? 'bg-primary text-white'
                  : 'bg-surface-hover text-subtext hover:text-primary hover:bg-primary/10'
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onCambioPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className="w-8 h-8 rounded-lg text-xs font-semibold bg-surface-hover text-subtext hover:text-primary hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          &#8250;
        </button>
      </div>
    </div>
  )
}
