module.exports =  {
  folder: {
    dev: './development',
    src: './src/assets',
    dist: './dist',
    tasks: './tasks'
  },
  namespaceCSS: 'toolkit',
  compatibility: ['> 1%', 'last 3 versions', 'Firefox ESR', 'Opera 12.1'],
  loadTask: function(task) {
    return require(this.folder.tasks + '/' + task);
  }
};
