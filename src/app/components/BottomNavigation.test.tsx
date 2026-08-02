import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { BottomNavigation } from './BottomNavigation'

vi.mock('../hooks/useLanguage', () => ({
  useLanguage: () => ({ t: (key: string) => key }),
}))

// Ranks was fully removed for launch: the tab, its page, and the backend
// leaderboard routes no longer exist. This pins the four-tab shell.
describe('BottomNavigation launch tabs', () => {
  it('shows exactly Home, Plan, Shop, and Profile with no Ranks entry', () => {
    render(<BottomNavigation activeTab="home" onTabChange={vi.fn()} />)

    expect(screen.getAllByRole('button')).toHaveLength(4)
    expect(screen.getByText('home')).toBeInTheDocument()
    expect(screen.getByText('plan')).toBeInTheDocument()
    expect(screen.getByText('shop')).toBeInTheDocument()
    expect(screen.getByText('profile')).toBeInTheDocument()
    expect(screen.queryByText('Ranks')).not.toBeInTheDocument()
    expect(screen.queryByText('leaderboard')).not.toBeInTheDocument()
  })

  it('keeps the four visible tabs functional', () => {
    const onTabChange = vi.fn()
    render(<BottomNavigation activeTab="home" onTabChange={onTabChange} />)

    fireEvent.click(screen.getByText('profile'))
    expect(onTabChange).toHaveBeenCalledWith('profile')
  })
})
