module.exports = {
  devServer: {
    allowedHosts: 'all', // yon11b 추가
    proxy: 'http://localhost:8080/rest/',    
    port: 3000
  },
};