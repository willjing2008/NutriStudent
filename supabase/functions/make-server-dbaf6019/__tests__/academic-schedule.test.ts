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

  it('preserves every schedule field through serialization', () => {
    const body = {
      classes: [{ id: 'class-1', name: 'Physics', dayOfWeek: 2, startTime: '09:00', endTime: '10:00' }],
      testingPeriods: [{ id: 'exam-1', name: 'Finals', startDate: '2026-08-01', endDate: '2026-08-08' }],
      mealTimeOverrides: [{ dayOfWeek: 2, mealSlot: 'lunch', time: '12:30' }],
      sleepSchedule: { bedtime: '22:30', wakeTime: '06:30' },
    }

    const reloaded = JSON.parse(JSON.stringify(buildAcademicSchedule(body, 'T')))
    expect(reloaded).toEqual({ ...body, updatedAt: 'T' })
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
