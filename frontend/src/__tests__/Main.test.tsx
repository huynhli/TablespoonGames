import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { vi } from 'vitest'
import HomePage from '../pages/HomePage'
import Header from '../components/Header'

// Mock validator
vi.mock('validator', () => ({
    default: {
        isEmail: vi.fn(() => true)
    }
}))

// Mock useChangeTitle
vi.mock('../components/useChangeTitle', () => ({
    default: vi.fn()
}))

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false }
    }
})

function TestWrapper({ children, darkMode = false }: { children: React.ReactNode, darkMode?: boolean }) {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Outlet context={{ darkMode }} />}>
                        <Route index element={children} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

describe('HomePage rendering', () => {
    it('renders the page', () => {
        render(
        <TestWrapper>
            <HomePage />
        </TestWrapper>
        )
    
        expect(screen.getByText(/bite-sized adventures/i)).toBeInTheDocument()
    })

    it('renders the about section', () => {
        render(
        <TestWrapper>
            <HomePage />
        </TestWrapper>
        )
    
        expect(screen.getByText(/Founded in 2025/i)).toBeInTheDocument()
    })

})

describe('darkMode rendering', () => {
    it('renders in dark mode', () => {
        render(
        <TestWrapper darkMode={true}>
            <HomePage />
        </TestWrapper>
        )
    
        const container = screen.getByText(/bite-sized adventures/i).closest('div')
        expect(container).toHaveClass('bg-zinc-900')
        expect(container).not.toHaveClass('bg-white')
    })

    it('renders in light mode', () => {
        render(
        <TestWrapper darkMode={false}>
            <HomePage />
        </TestWrapper>
        )
    
        const container = screen.getByText(/bite-sized adventures/i).closest('div')
        expect(container).toHaveClass('bg-white')
        expect(container).not.toHaveClass('bg-zinc-900')
    })
})

describe('Header', () => {
  it('calls onToggleTheme when dark mode button is clicked', async () => {
    const user = userEvent.setup()
    const mockToggle = vi.fn()
    
    render(<Header onToggleTheme={mockToggle} darkMode={false} />)
    
    const button = screen.getByRole('button', { name: /dark mode/i })
    await user.click(button)
    
    expect(mockToggle).toHaveBeenCalledTimes(1)
  })

  it('displays "Dark mode" button text in light mode', () => {
    const mockToggle = vi.fn()
    
    render(<Header onToggleTheme={mockToggle} darkMode={false} />)
    
    expect(screen.getByRole('button', { name: /dark mode/i })).toBeInTheDocument()
  })

  it('displays "Light mode" button text in dark mode', () => {
    const mockToggle = vi.fn()
    
    render(<Header onToggleTheme={mockToggle} darkMode={true} />)
    
    expect(screen.getByRole('button', { name: /light mode/i })).toBeInTheDocument()
  })

  it('applies correct styling in dark mode', () => {
    const mockToggle = vi.fn()
    
    render(<Header onToggleTheme={mockToggle} darkMode={true} />)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('bg-purple-800')
  })

  it('applies correct styling in light mode', () => {
    const mockToggle = vi.fn()
    
    render(<Header onToggleTheme={mockToggle} darkMode={false} />)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('bg-purple-400')
  })
})

function TestApp() {
  const [darkMode, setDarkMode] = useState(false)
  
  const toggleTheme = () => {
    setDarkMode(prev => !prev)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header onToggleTheme={toggleTheme} darkMode={darkMode} />
        <Routes>
          <Route path="/" element={<Outlet context={{ darkMode }} />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

describe('Header and HomePage Integration', () => {
  it('toggles dark mode when button is clicked', async () => {
    const user = userEvent.setup()
    
    render(<TestApp />)
    
    const homeContainer = screen.getByText(/bite-sized adventures/i).closest('div')
    expect(homeContainer).toHaveClass('bg-white')
    expect(screen.getByRole('button', { name: /dark mode/i })).toBeInTheDocument()
    
    await user.click(screen.getByRole('button', { name: /dark mode/i }))
    
    expect(homeContainer).toHaveClass('bg-zinc-900')
    expect(screen.getByRole('button', { name: /light mode/i })).toBeInTheDocument()
    
    await user.click(screen.getByRole('button', { name: /light mode/i }))
    
    expect(homeContainer).toHaveClass('bg-white')
    expect(screen.getByRole('button', { name: /dark mode/i })).toBeInTheDocument()
  })
})