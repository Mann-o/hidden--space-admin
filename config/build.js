export default {
  analyze:
    process.env.NODE_ENV === 'development'
      ? {
          analyzerMode: 'static',
          generateStatsFile: true,
          statsFilename: 'webpack-stats.json',
        }
      : false,
}
