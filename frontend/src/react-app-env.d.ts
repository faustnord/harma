/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv {
        readonly PORT: string
        readonly REACT_APP_BACKEND_URL: string
        readonly REACT_APP_REQUEST_TIMEOUT: string
    }
}
