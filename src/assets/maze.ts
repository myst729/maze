export const SIZE = 10 // 迷宫每边房间数
export const CELL = 36 // 迷宫房间边长，px
export const WALL = 2 // 迷宫墙壁厚度，px
export const THRESHOLD = 0.5 // 迷宫路径生成概率

export type Direction = 'up' | 'right' | 'down' | 'left'
export type DirectionValue = 1 | 2 | 4 | 8
export type Cell = {
  index: number
  up: number
  down: number
  left: number
  right: number
  booked: boolean
  scanned: boolean
  from: number
  to: number[]
  in?: Direction
  out: Direction[]
  value: number
}

const directions: Direction[] = ['up', 'right', 'down', 'left']
const directionsReversed: Record<Direction, Direction> = { up: 'down', right: 'left', down: 'up', left: 'right' }
const directionsValue: Record<Direction, DirectionValue> = { up: 1, right: 2, down: 4, left: 8 }

const generateCells = (): Cell[] => {
  const total = SIZE * SIZE
  const cells: Cell[] = []

  for (let i = 0; i < total; i++) {
    cells.push({
      index: i,
      up: i >= SIZE ? i - SIZE : -1,
      down: i < total - SIZE ? i + SIZE : -1,
      left: i % SIZE ? i - 1 : -1,
      right: (i + 1) % SIZE ? i + 1 : -1,
      booked: false,
      scanned: false,
      from: -1,
      to: [],
      in: undefined,
      out: [],
      value: 0,
    })
  }
  return cells
}

const generatePaths = (cells: Cell[]) => {
  let current = 0
  cells[current].booked = true

  while (current < cells.length) {
    if (cells[current].scanned) {
      current++
    } else {
      const cell = cells[current]
      directions.forEach((dir) => {
        const nextIndex = cell[dir]
        const nextCell = cells[nextIndex]
        if (nextIndex !== -1 && !(nextCell.booked || nextCell.scanned)) {
          if (Math.random() > THRESHOLD) {
            cell.to.push(nextIndex)
            cell.out.push(dir)
            nextCell.booked = true
            nextCell.from = current
            nextCell.in = directionsReversed[dir]
          }
        }
      })
      cell.scanned = true
      current++
    }
  }
  return cells
}

const generateWalls = (cells: Cell[]) => {
  cells.forEach((cell: Cell) => {
    cell.value = [cell.in, ...cell.out].reduce((state, dir) => {
      if (dir) {
        state = state | directionsValue[dir]
      }
      return state
    }, 0)
  })
  return cells
}

export const generateMaze = () => {
  const cells = generateCells()
  generatePaths(cells)
  generateWalls(cells)
  return cells
}

export const checkMaze = (cells: Cell[]) => {
  let current = SIZE * SIZE - 1
  while (cells[current].from !== -1) {
    current = cells[current].from
  }
  return current === 0
}
