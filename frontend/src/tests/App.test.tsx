import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { App } from '../components/App'

test('renders App', () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )
    // const linkElement = screen.getByText(/learn react/i)
    // expect(linkElement).toBeInTheDocument()
})
