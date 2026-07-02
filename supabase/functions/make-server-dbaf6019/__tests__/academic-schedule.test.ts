import { describe, it, expect } from 'vitest'
import { buildAcademicSchedule } from '../academic-schedule.ts'

describe('buildAcademicSchedule', () => {
  // Regression guard for the data-loss bug: mealTimeOverrides was dropped when
  // building the stored blob, so overrides vanished on reload.
  it('persists mealTimeOverrides through the save round-trip', () => {
    const overrides = [{ dayOfWeek: 1, mealSlot: 'lunch', time: '11:30' }]
    const blob = buildAcademicSchedule({ mealTimeOverrides: overrides }, 'T')

    // A reload reads back the serialized blob via get-academic-schedule.
    const reloaded = JSON.parse(JSON.stringify(blob))
    expect(reloaded.mealTimeOverrides).toEqual(overrides)
  })

  it('defaults every field consistently when body is empty', () => {
    const blob = buildAcademicSchedule({}, 'T')
    expect(blob.classes).toEqual([])
    expect(blob.testingPeriods).toEqual([])
    expect(blob.mealTimeOverrides).toEqual([])
    expect(blob.sleepSchedule).toMatchObject({ bedtime: '23:00', wakeTime: '07:00' })
    expect(blob.updatedAt).toBe('T')
  })
})
