export function decimalABinario(n: number): string {
  if (n === 0) return '0'
  const entero = Math.abs(Math.floor(n))
  const fraccion = Math.abs(n) - entero

  let binEntero = ''
  let temp = entero
  while (temp > 0) {
    binEntero = (temp % 2) + binEntero
    temp = Math.floor(temp / 2)
  }

  if (fraccion === 0) return binEntero || '0'

  let binFraccion = ''
  let f = fraccion
  const MAX_BITS = 8
  let count = 0
  while (f > 0 && count < MAX_BITS) {
    f *= 2
    const bit = Math.floor(f)
    binFraccion += bit
    f -= bit
    count++
  }

  return binEntero + '.' + binFraccion
}

export function binarioADecimal(bin: string): number {
  const [entero, fraccion] = bin.split('.')
  let resultado = 0

  if (entero) {
    for (let i = 0; i < entero.length; i++) {
      if (entero[i] === '1') {
        resultado += Math.pow(2, entero.length - 1 - i)
      }
    }
  }

  if (fraccion) {
    for (let i = 0; i < fraccion.length; i++) {
      if (fraccion[i] === '1') {
        resultado += Math.pow(2, -(i + 1))
      }
    }
  }

  return resultado
}

export function sumarBinarios(a: string, b: string): string {
  const decA = binarioADecimal(a)
  const decB = binarioADecimal(b)
  return decimalABinario(decA + decB)
}

export function restarBinarios(a: string, b: string): string {
  const decA = binarioADecimal(a)
  const decB = binarioADecimal(b)
  return decimalABinario(Math.max(0, decA - decB))
}

export function multiplicarBinarios(a: string, b: string): string {
  const decA = binarioADecimal(a)
  const decB = binarioADecimal(b)
  return decimalABinario(decA * decB)
}

export function formatearBinario(n: number): string {
  return decimalABinario(n)
}
