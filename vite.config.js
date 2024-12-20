import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
    plugins: [Inspect(), glsl()]
})