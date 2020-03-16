const path = require("path");
console.log(__dirname);
console.log(process.cwd());

const appDirectory = process.cwd();

module.exports = {
  context: appDirectory,
  module: {
    // noParse: [/moment/],
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    alias: {
      Utils: path.resolve(appDirectory, "src/utils"),
      ExactUtils$: path.resolve(appDirectory, "src/utils/index")
    },
    extensions: [".js", ".json", ".jsx"]
  }
};
