const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');

/**
 * 指定したパス配下のjsまたはtsファイルのファイル名とファイルのパスが入ったObjectを取得
 * 例) /ts/foo.ts => { foo: "/ts/foo.ts" }
 * ※ルートディレクトリ配下にディレクトリを切り、そこにjs,tsファイルを置いた場合、そのディレクトリは無視される
 * @param {string} entryPath エントリーポイントとするjs,tsまでの相対パス
 */
function getEntries(entryPath) {
  return WebpackWatchedGlobEntries.getEntries(
    [path.resolve(__dirname, `${entryPath}/**/*.{js,ts}`)],
    {
      ignore: path.resolve(__dirname, `${entryPath}/**/_*.{js,ts}`),
    },
  )();
}

/**
 * 指定したentriesと同名のhtmlを読み込みHtmlWebpackPluginを生成する
 * ※ルートディレクトリ配下にディレクトリを切り、そこにhtmlファイルを置いた場合、そのディレクトリは無視される
 * @param {object} entries { foo: "/ts/foo.ts" }のようなentryを表すオブジェクト
 * @param {string} srcPath 指定したいhtmlファイルまでの相対パス
 */
function buildHtmlWebpackPlugins(entries, srcPath) {
  return Object.keys(entries).map(
    (key) =>
      new HtmlWebpackPlugin({
        inject: 'body',
        filename: `${key}.html`,
        template: `${srcPath}/${key}.html`,
        chunks: [key],
      }),
  );
}

// 設定するエントリーポイントを作成
const entries = getEntries('./src/ts');

module.exports = {
  mode: 'development',
  entry: entries,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './js/[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          // cssファイルとして別ファイルに出力する
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // ベンダープレフィックスを自動付与する
                plugins: [require('autoprefixer')({ grid: true })],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // Dart Sassを使えるようにする
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        generator: {
          filename: './assets/[name].[contenthash][ext]',
        },
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
    }),
    ...buildHtmlWebpackPlugins(entries, './src/pages'),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@assets': path.resolve(__dirname, './src/assets/'),
      '@scss': path.resolve(__dirname, './src/scss/'),
      '@ts': path.resolve(__dirname, './src/ts/'),
    },
  },
};
