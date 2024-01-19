import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	preview: {
		host: true,
		port: parseInt(process.env.VITE_PORT) || null
	}
});
