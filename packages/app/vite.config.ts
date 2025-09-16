import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import generouted from '@generouted/react-router/plugin'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({ plugins: [react(), generouted(), tsconfigPaths()] })
