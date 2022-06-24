/*
 * @Author: qqq
 * @Date: 2021-09-20 00:27:19
 * @LastEditors: qqqq
 * @LastEditTime: 2021-09-23 19:08:03
 * @Description: file content
 */
import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        pathRewrite: { //路径重置
          '^/api': ''
        }

      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@c': path.resolve(__dirname, 'src/components'),
      '@p': path.resolve(__dirname, 'public')
    }
  }
})