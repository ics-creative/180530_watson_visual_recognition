const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
const fs = require('fs');

// 資格情報を設定しVisualRecognitionオブジェクトを作成
const visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  "iam_apikey": "(APIキーを入力)",
  "url": "https://gateway.watsonplatform.net/visual-recognition/api",
});

// トレーニングAPIへ付与するパラメータを準備
const params = {
  name: 'cushion', // カスタム分類器の名称を定義
  xd_positive_examples: fs.createReadStream(__dirname + '/data/xd_positive_examples.zip'), // 正例のzipファイルを指定
  fl_positive_examples: fs.createReadStream(__dirname + '/data/fl_positive_examples.zip'), // 正例のzipファイルを指定
  ps_positive_examples: fs.createReadStream(__dirname + '/data/ps_positive_examples.zip'), // 正例のzipファイルを指定
  negative_examples: fs.createReadStream(__dirname + '/data/negative_examples.zip') // 負例のzipファイルを指定
};

// トレーニングAPIを実行する
visualRecognition.createClassifier(params, (err, response) => {
  if (err) {
    console.log(err);
    return;
  }
  // 返却されたJSONデータを出力
  console.log(JSON.stringify(response, null, 2))
});

