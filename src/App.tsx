import { Component, lazy, Suspense, type ErrorInfo, type ReactNode } from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const NotFound = lazy(() => import('./pages/NotFound'))

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-[#F5F3EE] px-6 py-20 text-[#171a17]">
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="mt-3 max-w-xl text-sm text-black/60">{this.state.error.message}</p>
          <button
            type="button"
            className="mt-6 rounded-full bg-[#173c2a] px-4 py-2 text-sm font-semibold text-[#F5F3EE]"
            onClick={() => window.location.assign('/')}
          >
            Reload home
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

function Fallback() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-[#F5F3EE] text-sm text-black/40"
      aria-label="Loading page"
      role="status"
    >
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}
