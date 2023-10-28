require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  devServer: {
    allowedHosts: 'all', // yon11b 추가
    proxy: 'https://www.fndr.tech/rest/',    
    port: 3000
  }
};
