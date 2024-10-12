import { describe, it, expect } from 'vitest'
import { deepCopy } from '../deep-copy'

describe('deepCopy', () => {
  it('should return the same primitive value', () => {
    expect(deepCopy(42)).toBe(42)
    expect(deepCopy('test')).toBe('test')
    expect(deepCopy(true)).toBe(true)
    expect(deepCopy(null)).toBe(null)
    expect(deepCopy(undefined)).toBe(undefined)
  })

  it('should copy an object', () => {
    const obj = { a: 1, b: 2 }
    const copied = deepCopy(obj)

    expect(copied).toEqual(obj)
    expect(copied).not.toBe(obj)
  })

  it('should copy an array', () => {
    const arr = [1, 2, 3]
    const copied = deepCopy(arr)

    expect(copied).toEqual(arr)
    expect(copied).not.toBe(arr)
  })

  it('should copy a Date object', () => {
    const date = { date: new Date() }
    const copied = deepCopy(date)

    expect(copied).toEqual(date)
    expect(copied).not.toBe(date)
  })

  it('should copy a deep object', () => {
    const obj = { a: 1, b: { c: 2 } }
    const copied = deepCopy(obj)

    expect(copied).toEqual(obj)
    expect(copied).not.toBe(obj)
    expect(copied.b).toEqual(obj.b)
    expect(copied.b).not.toBe(obj.b)
  })
})
