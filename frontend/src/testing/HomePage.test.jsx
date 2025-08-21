import { render } from '@testing-library/react'
import { useOutletContext } from 'react-router-dom'
import HomePage from '../pages/HomePage'

jest.mock('react-router-dom', () => ({
    useOutletContext: jest.fn()
}))

test('checks that dark mode is set to false by default', () => {
    useOutletContext.mockReturnValue({ darkMode: false })
    
    const { container } = render(<HomePage />)
    
    // Test the actual DOM output
    expect(container.firstChild).toHaveClass('bg-white')
})