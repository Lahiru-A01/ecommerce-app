// src/store/themeStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: true,
      toggleTheme: () => set((s) => {
        const next = !s.isDark
        document.documentElement.setAttribute(
          'data-theme',
          next ? 'dark' : 'light'
        )
        return { isDark: next }
      }),
    }),
    { name: 'zyra-theme' }
  )
)