# vitepress-plugin-google-analytics

> Google analytics plugin

## Install
```sh
yarn add -D vitepress-plugin-google-analytics
# OR npm install -D vitepress-plugin-google-analytics
```

## Usage
```ts
// .vitepress/config.ts

export const config = {
  themeConfig: {
    googleAnalytics: {
      ga: '*********', // Your GoogleAnalytics ID
    },
  }
}
```

```ts
// .vitepress/theme/index.ts
import googleAnalytics from 'vitepress-plugin-google-analytics'

export default {
  enhanceApp: async (ctx) => {
    googleAnalytics(ctx)
  }
}
```

Then you can use `Google analytics` in `production`! 🎉