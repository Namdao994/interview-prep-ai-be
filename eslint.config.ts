import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node }
  },
  tseslint.configs.recommended,
  {
    rules: {
      'comma-dangle': ['warn', 'never'],
      'object-curly-spacing': ['warn', 'always'],
      quotes: ['warn', 'single'],
      semi: ['warn', 'never'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }
      ]
    }
  },
  globalIgnores(['node_modules/*'])
])
